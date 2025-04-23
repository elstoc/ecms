/* eslint-disable @typescript-eslint/no-explicit-any */
import { OPEN_FULLMUTEX, OPEN_READONLY } from 'sqlite3';

import { stripWhiteSpace } from '@/utils';

import { CalibreDb, lookupTableSql } from './CalibreDb';

jest.mock('@/adapters');

const mockStorage = {
  contentFileExists: jest.fn() as jest.Mock,
  getContentDb: jest.fn() as jest.Mock,
};

const apiPath = 'books';
const apiDbPath = 'books/metadata.db';
const config = {
  calibreDbPageSize: 3,
} as any;

const mockLogger = {
  debug: jest.fn(),
  info: jest.fn(),
  error: jest.fn(),
} as any;

describe('CalibreDb', () => {
  let calibreDb: CalibreDb;
  const mockInit = jest.fn();
  const mockGetAll = jest.fn();
  const mockGetAllWithParams = jest.fn();
  const mockClose = jest.fn();

  const mockDb = {
    initialise: mockInit,
    getAll: mockGetAll,
    getAllWithParams: mockGetAllWithParams,
    close: mockClose,
  };

  beforeEach(() => {
    mockStorage.getContentDb.mockResolvedValue(mockDb);
    calibreDb = new CalibreDb(apiPath, config, mockLogger, mockStorage as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('initialise', () => {
    it('throws an error if database does not exist', async () => {
      mockStorage.contentFileExists.mockReturnValue(false);

      await expect(calibreDb.initialise()).rejects.toThrow(
        new Error('No database found at books/metadata.db'),
      );
    });

    it('gets the database with the correct path and params', async () => {
      mockStorage.contentFileExists.mockReturnValue(true);

      await calibreDb.initialise();

      expect(mockStorage.getContentDb).toHaveBeenCalledTimes(1);
      expect(mockStorage.contentFileExists).toHaveBeenCalledTimes(1);
      expect(mockStorage.getContentDb).toHaveBeenCalledWith(
        apiDbPath,
        OPEN_READONLY | OPEN_FULLMUTEX,
      );
    });

    it('does not re-initialise an already-initialised database', async () => {
      mockStorage.contentFileExists.mockReturnValue(true);

      await calibreDb.initialise();
      await calibreDb.initialise();

      expect(mockStorage.getContentDb).toHaveBeenCalledTimes(1);
      expect(mockStorage.contentFileExists).toHaveBeenCalledTimes(1);
    });
  });

  describe('getBooks', () => {
    const baseSql = `
    SELECT books.id, title, authors.authors, ratings.rating, formats.format, paths.path, collections.collections,
           kobo_statuses.kobo_status, kindle_statuses.kindle_status, tablet_statuses.tablet_status,
           IFNULL(read.read, 0) AS read, IFNULL(fixed.fixed, 0) AS fixed
    FROM books
    LEFT JOIN (SELECT book, ratings.rating / 2 as rating
               FROM books_ratings_link ratings_link
               JOIN ratings ON ratings_link.rating = ratings.id) ratings ON books.id = ratings.book
    LEFT JOIN (SELECT book, GROUP_CONCAT(author, '|') AS authors
               FROM books_authors_link bal
               GROUP BY book) authors ON books.id = authors.book
    LEFT JOIN (SELECT book, MIN(value) AS format
               FROM books_custom_column_7_link format_link
               GROUP BY book) formats ON books.id = formats.book
    LEFT JOIN (SELECT book, MIN(value) AS path
               FROM books_custom_column_39_link path_link
               GROUP BY book) paths ON books.id = paths.book
    LEFT JOIN (SELECT book, GROUP_CONCAT(value, '|') AS collections
               FROM books_custom_column_14_link collection_link
               GROUP BY book) collections ON books.id = collections.book
    LEFT JOIN (SELECT book, MIN(value) AS kobo_status
               FROM books_custom_column_21_link collection_link
               GROUP BY book) kobo_statuses ON books.id = kobo_statuses.book
    LEFT JOIN (SELECT book, MIN(value) AS kindle_status
               FROM books_custom_column_22_link collection_link
               GROUP BY book) kindle_statuses ON books.id = kindle_statuses.book
    LEFT JOIN (SELECT book, MIN(value) AS tablet_status
               FROM books_custom_column_23_link collection_link
               GROUP BY book) tablet_statuses ON books.id = tablet_statuses.book
    LEFT JOIN (SELECT book, MIN(read.value) as read
               FROM custom_column_42 read
               GROUP BY book) read ON books.id = read.book
    LEFT JOIN (SELECT book, MIN(fixed.value) as fixed
               FROM custom_column_25 fixed
               GROUP BY book) fixed ON books.id = fixed.book`;

    const orderBySql = ' ORDER BY title';

    const mockManyBooks = [
      { id: 1, title: 'Book 1', fixed: false, read: false },
      { id: 2, title: 'Book 2', fixed: false, read: false },
      { id: 3, title: 'Book 3', fixed: false, read: false },
      { id: 4, title: 'Book 4', fixed: false, read: false },
      { id: 5, title: 'Book 5', fixed: false, read: false },
      { id: 6, title: 'Book 6', fixed: false, read: false },
      { id: 7, title: 'Book 7', fixed: false, read: false },
      { id: 8, title: 'Book 8', fixed: false, read: false },
      { id: 9, title: 'Book 9', fixed: false, read: false },
      { id: 10, title: 'Book 10', fixed: false, read: false },
    ];

    it('runs correct SQL and params with no filters and returns an array of books', async () => {
      mockGetAllWithParams.mockResolvedValue(mockManyBooks);
      mockStorage.contentFileExists.mockReturnValue(true);
      await calibreDb.initialise();

      const books = await calibreDb.getBooks({}, 10);

      const expectedSql = baseSql + orderBySql;
      expect(mockGetAllWithParams).toHaveBeenCalledTimes(1);
      const [sql, params] = mockGetAllWithParams.mock.calls[0];
      expect(stripWhiteSpace(sql)).toBe(stripWhiteSpace(expectedSql));
      expect(params).toEqual({});
      expect(books.books).toEqual(mockManyBooks);
    });

    it('runs correct SQL and params with author filter and returns an array of books', async () => {
      mockGetAllWithParams.mockResolvedValue(mockManyBooks);
      mockStorage.contentFileExists.mockReturnValue(true);
      await calibreDb.initialise();

      const expectedSql =
        baseSql +
        ' WHERE (EXISTS (SELECT 1 FROM books_authors_link WHERE book = books.id AND author = $author))' +
        orderBySql;

      const books = await calibreDb.getBooks({ author: 1234 }, 10);

      expect(mockGetAllWithParams).toHaveBeenCalledTimes(1);
      const [sql, params] = mockGetAllWithParams.mock.calls[0];
      expect(stripWhiteSpace(sql)).toBe(stripWhiteSpace(expectedSql));
      expect(params).toEqual({ $author: 1234 });
      expect(books.books).toEqual(mockManyBooks);
    });

    it('runs correct SQL and params with format filter and returns an array of books', async () => {
      mockGetAllWithParams.mockResolvedValue(mockManyBooks);
      mockStorage.contentFileExists.mockReturnValue(true);
      await calibreDb.initialise();

      const expectedSql =
        baseSql +
        ' WHERE (EXISTS (SELECT 1 FROM books_custom_column_7_link WHERE book = books.id AND value = $format))' +
        orderBySql;

      const books = await calibreDb.getBooks({ format: 1234 }, 10);

      expect(mockGetAllWithParams).toHaveBeenCalledTimes(1);
      const [sql, params] = mockGetAllWithParams.mock.calls[0];
      expect(stripWhiteSpace(sql)).toBe(stripWhiteSpace(expectedSql));
      expect(params).toEqual({ $format: 1234 });
      expect(books.books).toEqual(mockManyBooks);
    });

    it('runs correct SQL and params with all filters and returns an array of books', async () => {
      mockGetAllWithParams.mockResolvedValue(mockManyBooks);
      mockStorage.contentFileExists.mockReturnValue(true);
      await calibreDb.initialise();

      const expectedSql =
        baseSql +
        ' WHERE (EXISTS (SELECT 1 FROM books_authors_link WHERE book = books.id AND author = $author))' +
        ' AND (EXISTS (SELECT 1 FROM books_custom_column_7_link WHERE book = books.id AND value = $format))' +
        orderBySql;

      const books = await calibreDb.getBooks({ author: 2345, format: 1234 }, 10);

      expect(mockGetAllWithParams).toHaveBeenCalledTimes(1);
      const [sql, params] = mockGetAllWithParams.mock.calls[0];
      expect(stripWhiteSpace(sql)).toBe(stripWhiteSpace(expectedSql));
      expect(params).toEqual({ $author: 2345, $format: 1234 });
      expect(books.books).toEqual(mockManyBooks);
    });

    it.each([
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4],
      [5, 4],
    ])(
      'paginates results correctly (requested pages: %s, returned pages: %s)',
      async (requestedPages: number, expectedPagesReturned: number) => {
        mockGetAllWithParams.mockResolvedValue(mockManyBooks);
        mockStorage.contentFileExists.mockReturnValue(true);
        await calibreDb.initialise();

        const { books, totalPages, currentPage } = await calibreDb.getBooks({}, requestedPages);

        expect(totalPages).toBe(4);
        expect(currentPage).toBe(expectedPagesReturned);
        expect(books.length).toBe(Math.min(currentPage * 3, 10));
      },
    );
  });

  describe('getLookupValues', () => {
    const lookupTables = Object.keys(lookupTableSql);

    const mockResultRows = [
      { code: 1, description: 'description 1' },
      { code: 2, description: 'description 2' },
      { code: 3, description: 'description 3' },
    ];

    const expectedReturnVal = {
      '1': 'description 1',
      '2': 'description 2',
      '3': 'description 3',
    };

    beforeEach(async () => {
      mockStorage.contentFileExists.mockReturnValue(true);
      await calibreDb.initialise();
    });

    it('throws an error if passed an invalid table name', async () => {
      await expect(calibreDb.getLookupValues('invalid-table')).rejects.toThrow(
        'invalid table name invalid-table',
      );
    });

    it.each(lookupTables)('throws an error if no rows are returned (%s)', async (table: string) => {
      mockGetAllWithParams.mockResolvedValue(undefined);

      await expect(calibreDb.getLookupValues(table)).rejects.toThrow(`No ${table} records found`);
    });

    it.each(lookupTables)('runs %s SQL and returns mapped results', async (table: string) => {
      const sql = lookupTableSql[table];
      mockGetAll.mockResolvedValue(mockResultRows);

      const actualReturnVal = await calibreDb.getLookupValues(table);

      expect(mockGetAll).toHaveBeenCalledWith(sql);
      expect(actualReturnVal).toEqual(expectedReturnVal);
    });
  });

  describe('shutdown', () => {
    it('closes the database', async () => {
      mockStorage.contentFileExists.mockReturnValue(true);
      await calibreDb.initialise();

      await calibreDb.shutdown();

      expect(mockClose).toHaveBeenCalledTimes(1);
    });
  });
});
