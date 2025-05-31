/* eslint-disable @typescript-eslint/no-explicit-any */
import { OPEN_FULLMUTEX, OPEN_READONLY } from 'sqlite3';

import { NotFoundError } from '@/errors';
import { stripWhiteSpace } from '@/utils';

import {
  CalibreDb,
  baseBookPathSql,
  baseBooksSql,
  filterSql,
  lookupTableSql,
  pathSql,
  sortOrderSql,
} from './CalibreDb';

jest.mock('@/adapters');

const mockStorage = {
  contentFileExists: jest.fn() as jest.Mock,
  contentDirectoryExists: jest.fn() as jest.Mock,
  getContentFileModifiedTime: jest.fn() as jest.Mock,
  getContentFile: jest.fn() as jest.Mock,
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
  const mockGetWithParams = jest.fn();
  const mockGetAllWithParams = jest.fn();
  const mockClose = jest.fn();

  const mockDb = {
    initialise: mockInit,
    getAll: mockGetAll,
    getWithParams: mockGetWithParams,
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
      mockStorage.getContentFileModifiedTime.mockReturnValue(123);

      await calibreDb.initialise();

      expect(mockStorage.getContentDb).toHaveBeenCalledTimes(1);
      expect(mockStorage.contentFileExists).toHaveBeenCalledTimes(1);
      expect(mockStorage.getContentFileModifiedTime).toHaveBeenCalledTimes(1);
      expect(mockStorage.getContentDb).toHaveBeenCalledWith(
        apiDbPath,
        OPEN_READONLY | OPEN_FULLMUTEX,
      );
    });

    it('does not re-initialise an already-initialised database', async () => {
      mockStorage.contentFileExists.mockReturnValue(true);
      mockStorage.getContentFileModifiedTime.mockReturnValue(123);

      await calibreDb.initialise();
      await calibreDb.initialise();

      expect(mockStorage.getContentDb).toHaveBeenCalledTimes(1);
      expect(mockStorage.contentFileExists).toHaveBeenCalledTimes(2);
      expect(mockStorage.getContentFileModifiedTime).toHaveBeenCalledTimes(2);
    });

    it('does re-initialise if the database has been changed since first init', async () => {
      mockStorage.contentFileExists.mockReturnValue(true);
      mockStorage.getContentFileModifiedTime.mockReturnValue(123);

      await calibreDb.initialise();

      mockStorage.getContentFileModifiedTime.mockReturnValue(124);
      await calibreDb.initialise();

      expect(mockStorage.getContentDb).toHaveBeenCalledTimes(2);
      expect(mockStorage.contentFileExists).toHaveBeenCalledTimes(2);
      expect(mockStorage.getContentFileModifiedTime).toHaveBeenCalledTimes(2);
    });
  });

  describe('getBooks', () => {
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

    beforeEach(async () => {
      mockGetAllWithParams.mockResolvedValue(structuredClone(mockManyBooks));
      mockStorage.contentFileExists.mockReturnValue(true);
      await calibreDb.initialise();
    });

    it('runs correct SQL and params with no filters and returns an array of books', async () => {
      const books = await calibreDb.getBooks({}, 10);

      const expectedSql = baseBooksSql + sortOrderSql.title;
      expect(mockGetAllWithParams).toHaveBeenCalledTimes(1);
      const [sql, params] = mockGetAllWithParams.mock.calls[0];
      expect(stripWhiteSpace(sql)).toBe(stripWhiteSpace(expectedSql));
      expect(params).toEqual({});
      expect(books.books).toEqual(mockManyBooks);
    });

    it('runs correct SQL and params with titleContains filter and returns an array of books', async () => {
      const expectedSql = baseBooksSql + 'WHERE ' + filterSql.titleContains + sortOrderSql.title;

      const books = await calibreDb.getBooks({ titleContains: 'Some-Text' }, 10);

      expect(mockGetAllWithParams).toHaveBeenCalledTimes(1);
      const [sql, params] = mockGetAllWithParams.mock.calls[0];
      expect(stripWhiteSpace(sql)).toBe(stripWhiteSpace(expectedSql));
      expect(params).toEqual({ $titleContains: '%some-text%' });
      expect(books.books).toEqual(mockManyBooks);
    });

    it('runs correct SQL and params with author filter and returns an array of books', async () => {
      const expectedSql = baseBooksSql + 'WHERE ' + filterSql.author + sortOrderSql.title;

      const books = await calibreDb.getBooks({ author: 1234 }, 10);

      expect(mockGetAllWithParams).toHaveBeenCalledTimes(1);
      const [sql, params] = mockGetAllWithParams.mock.calls[0];
      expect(stripWhiteSpace(sql)).toBe(stripWhiteSpace(expectedSql));
      expect(params).toEqual({ $author: 1234 });
      expect(books.books).toEqual(mockManyBooks);
    });

    it('runs correct SQL and params with format filter and returns an array of books', async () => {
      const expectedSql = baseBooksSql + 'WHERE ' + filterSql.format + sortOrderSql.title;

      const books = await calibreDb.getBooks({ format: 1234 }, 10);

      expect(mockGetAllWithParams).toHaveBeenCalledTimes(1);
      const [sql, params] = mockGetAllWithParams.mock.calls[0];
      expect(stripWhiteSpace(sql)).toBe(stripWhiteSpace(expectedSql));
      expect(params).toEqual({ $format: 1234 });
      expect(books.books).toEqual(mockManyBooks);
    });

    it('runs correct SQL and params with bookPath filter and returns an array of books', async () => {
      const expectedSql = baseBooksSql + 'WHERE ' + filterSql.bookPathPrefix + sortOrderSql.title;

      const books = await calibreDb.getBooks({ bookPath: 'Fiction' }, 10);

      expect(mockGetAllWithParams).toHaveBeenCalledTimes(1);
      const [sql, params] = mockGetAllWithParams.mock.calls[0];
      expect(stripWhiteSpace(sql)).toBe(stripWhiteSpace(expectedSql));
      expect(params).toEqual({ $pathPrefixLike: 'Fiction%' });
      expect(books.books).toEqual(mockManyBooks);
    });

    it('runs correct SQL and params with readStatus filter and returns an array of books', async () => {
      const expectedSql = baseBooksSql + 'WHERE ' + filterSql.readStatus + sortOrderSql.title;

      const books = await calibreDb.getBooks({ readStatus: true }, 10);

      expect(mockGetAllWithParams).toHaveBeenCalledTimes(1);
      const [sql, params] = mockGetAllWithParams.mock.calls[0];
      expect(stripWhiteSpace(sql)).toBe(stripWhiteSpace(expectedSql));
      expect(params).toEqual({ $readStatus: 1 });
      expect(books.books).toEqual(mockManyBooks);
    });

    it('runs correct SQL and params with bookPath (exact path) filter and returns an array of books', async () => {
      const expectedSql = baseBooksSql + 'WHERE ' + filterSql.bookPath + sortOrderSql.title;

      const books = await calibreDb.getBooks({ bookPath: 'NonFiction', exactPath: true }, 10);

      expect(mockGetAllWithParams).toHaveBeenCalledTimes(1);
      const [sql, params] = mockGetAllWithParams.mock.calls[0];
      expect(stripWhiteSpace(sql)).toBe(stripWhiteSpace(expectedSql));
      expect(params).toEqual({ $bookPath: 'NonFiction' });
      expect(books.books).toEqual(mockManyBooks);
    });

    it('runs correct SQL and params with device (kobo) filter and returns an array of books', async () => {
      const expectedSql = baseBooksSql + 'WHERE (' + filterSql.kobo + ') ' + sortOrderSql.title;

      const books = await calibreDb.getBooks({ devices: ['kobo'] }, 10);

      expect(mockGetAllWithParams).toHaveBeenCalledTimes(1);
      const [sql, params] = mockGetAllWithParams.mock.calls[0];
      expect(stripWhiteSpace(sql)).toBe(stripWhiteSpace(expectedSql));
      expect(params).toEqual({});
      expect(books.books).toEqual(mockManyBooks);
    });

    it('runs correct SQL and params with device (kindle) filter and returns an array of books', async () => {
      const expectedSql = baseBooksSql + 'WHERE (' + filterSql.kindle + ') ' + sortOrderSql.title;

      const books = await calibreDb.getBooks({ devices: ['kindle'] }, 10);

      expect(mockGetAllWithParams).toHaveBeenCalledTimes(1);
      const [sql, params] = mockGetAllWithParams.mock.calls[0];
      expect(stripWhiteSpace(sql)).toBe(stripWhiteSpace(expectedSql));
      expect(params).toEqual({});
      expect(books.books).toEqual(mockManyBooks);
    });

    it('runs correct SQL and params with device (tablet) filter and returns an array of books', async () => {
      const expectedSql = baseBooksSql + 'WHERE (' + filterSql.tablet + ') ' + sortOrderSql.title;

      const books = await calibreDb.getBooks({ devices: ['tablet'] }, 10);

      expect(mockGetAllWithParams).toHaveBeenCalledTimes(1);
      const [sql, params] = mockGetAllWithParams.mock.calls[0];
      expect(stripWhiteSpace(sql)).toBe(stripWhiteSpace(expectedSql));
      expect(params).toEqual({});
      expect(books.books).toEqual(mockManyBooks);
    });

    it('runs correct SQL and params with device (physical) filter and returns an array of books', async () => {
      const expectedSql = baseBooksSql + 'WHERE (' + filterSql.physical + ') ' + sortOrderSql.title;

      const books = await calibreDb.getBooks({ devices: ['physical'] }, 10);

      expect(mockGetAllWithParams).toHaveBeenCalledTimes(1);
      const [sql, params] = mockGetAllWithParams.mock.calls[0];
      expect(stripWhiteSpace(sql)).toBe(stripWhiteSpace(expectedSql));
      expect(params).toEqual({});
      expect(books.books).toEqual(mockManyBooks);
    });

    it('runs correct SQL and params with device (all) filter and returns an array of books', async () => {
      const expectedSql =
        baseBooksSql +
        'WHERE (' +
        [filterSql.tablet, filterSql.kobo, filterSql.kindle, filterSql.physical].join(' OR ') +
        ') ' +
        sortOrderSql.title;

      const books = await calibreDb.getBooks(
        { devices: ['tablet', 'kobo', 'kindle', 'physical'] },
        10,
      );

      expect(mockGetAllWithParams).toHaveBeenCalledTimes(1);
      const [sql, params] = mockGetAllWithParams.mock.calls[0];
      expect(stripWhiteSpace(sql)).toBe(stripWhiteSpace(expectedSql));
      expect(params).toEqual({});
      expect(books.books).toEqual(mockManyBooks);
    });

    it('runs correct SQL and params with all (except device) filters and returns an array of books', async () => {
      const expectedSql =
        baseBooksSql +
        ' WHERE ' +
        filterSql.author +
        ' AND ' +
        filterSql.format +
        ' AND ' +
        filterSql.bookPathPrefix +
        ' AND ' +
        filterSql.readStatus +
        sortOrderSql.title;

      const books = await calibreDb.getBooks(
        { author: 2345, format: 1234, bookPath: 'Fiction', readStatus: true },
        10,
      );

      expect(mockGetAllWithParams).toHaveBeenCalledTimes(1);
      const [sql, params] = mockGetAllWithParams.mock.calls[0];
      expect(stripWhiteSpace(sql)).toBe(stripWhiteSpace(expectedSql));
      expect(params).toEqual({
        $author: 2345,
        $format: 1234,
        $pathPrefixLike: 'Fiction%',
        $readStatus: 1,
      });
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
        const { books, totalPages, currentPage } = await calibreDb.getBooks({}, requestedPages);

        expect(totalPages).toBe(4);
        expect(currentPage).toBe(expectedPagesReturned);
        expect(books.length).toBe(Math.min(currentPage * 3, 10));
      },
    );

    it('sorts by title when requested', async () => {
      const expectedSql = baseBooksSql + sortOrderSql.title;

      const books = await calibreDb.getBooks({ sortOrder: 'title' }, 10);

      expect(mockGetAllWithParams).toHaveBeenCalledTimes(1);
      const [sql, params] = mockGetAllWithParams.mock.calls[0];
      expect(stripWhiteSpace(sql)).toBe(stripWhiteSpace(expectedSql));
      expect(params).toEqual({});
      expect(books.books).toEqual(mockManyBooks);
    });

    it('sorts by author when requested', async () => {
      const expectedSql = baseBooksSql + sortOrderSql.author;

      const books = await calibreDb.getBooks({ sortOrder: 'author' }, 10);

      expect(mockGetAllWithParams).toHaveBeenCalledTimes(1);
      const [sql, params] = mockGetAllWithParams.mock.calls[0];
      expect(stripWhiteSpace(sql)).toBe(stripWhiteSpace(expectedSql));
      expect(params).toEqual({});
      expect(books.books).toEqual(mockManyBooks);
    });

    it('sorts by id then shuffles (with the provided seed value) when requested', async () => {
      const expectedSql = baseBooksSql + sortOrderSql.shuffle;

      const books = await calibreDb.getBooks({ sortOrder: 'shuffle', shuffleSeed: 123 }, 10);

      expect(mockGetAllWithParams).toHaveBeenCalledTimes(1);
      const [sql, params] = mockGetAllWithParams.mock.calls[0];
      expect(stripWhiteSpace(sql)).toBe(stripWhiteSpace(expectedSql));
      expect(params).toEqual({});
      expect(books.books).toEqual([
        mockManyBooks[7],
        mockManyBooks[8],
        mockManyBooks[5],
        mockManyBooks[9],
        mockManyBooks[3],
        mockManyBooks[0],
        mockManyBooks[2],
        mockManyBooks[6],
        mockManyBooks[1],
        mockManyBooks[4],
      ]);
    });
  });

  describe('getPaths', () => {
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
      mockGetAll.mockResolvedValue(mockResultRows);
    });

    it('runs correct SQL with no filters and returns an array of paths', async () => {
      const paths = await calibreDb.getPaths();

      const expectedSql = baseBookPathSql;
      expect(mockGetAll).toHaveBeenCalledTimes(1);
      const sql = mockGetAll.mock.calls[0][0];
      expect(stripWhiteSpace(sql)).toBe(stripWhiteSpace(expectedSql));
      expect(paths).toEqual(expectedReturnVal);
    });

    it('runs correct SQL with device filter (kobo) and returns an array of paths', async () => {
      const paths = await calibreDb.getPaths(['kobo']);

      const expectedSql = baseBookPathSql + ' WHERE (' + filterSql.kobo + ')';
      expect(mockGetAll).toHaveBeenCalledTimes(1);
      const sql = mockGetAll.mock.calls[0][0];
      expect(stripWhiteSpace(sql)).toBe(stripWhiteSpace(expectedSql));
      expect(paths).toEqual(expectedReturnVal);
    });

    it('runs correct SQL with device filter (tablet) and returns an array of paths', async () => {
      const paths = await calibreDb.getPaths(['tablet']);

      const expectedSql = baseBookPathSql + ' WHERE (' + filterSql.tablet + ')';
      expect(mockGetAll).toHaveBeenCalledTimes(1);
      const sql = mockGetAll.mock.calls[0][0];
      expect(stripWhiteSpace(sql)).toBe(stripWhiteSpace(expectedSql));
      expect(paths).toEqual(expectedReturnVal);
    });

    it('runs correct SQL with device filter (kindle) and returns an array of paths', async () => {
      const paths = await calibreDb.getPaths(['kindle']);

      const expectedSql = baseBookPathSql + ' WHERE (' + filterSql.kindle + ')';
      expect(mockGetAll).toHaveBeenCalledTimes(1);
      const sql = mockGetAll.mock.calls[0][0];
      expect(stripWhiteSpace(sql)).toBe(stripWhiteSpace(expectedSql));
      expect(paths).toEqual(expectedReturnVal);
    });

    it('runs correct SQL with device filter (all) and returns an array of paths', async () => {
      const paths = await calibreDb.getPaths(['tablet', 'kobo', 'kindle']);

      const expectedSql =
        baseBookPathSql +
        'WHERE (' +
        [filterSql.tablet, filterSql.kobo, filterSql.kindle].join(' OR ') +
        ')';
      expect(mockGetAll).toHaveBeenCalledTimes(1);
      const sql = mockGetAll.mock.calls[0][0];
      expect(stripWhiteSpace(sql)).toBe(stripWhiteSpace(expectedSql));
      expect(paths).toEqual(expectedReturnVal);
    });
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

  describe('getCoverImage', () => {
    beforeEach(async () => {
      mockStorage.contentFileExists.mockReturnValue(true);
      await calibreDb.initialise();
    });

    it('runs the correct SQL and returns the expected file if everything exists', async () => {
      const path = 'some/book/path';
      mockGetWithParams.mockResolvedValue({ path });
      mockStorage.contentDirectoryExists.mockReturnValue(true);
      mockStorage.contentFileExists.mockReturnValue(true);
      mockStorage.getContentFile.mockResolvedValue('image');

      const returnVal = await calibreDb.getCoverImage(123);

      expect(mockGetWithParams).toHaveBeenCalledWith(pathSql, { $id: 123 });
      expect(mockStorage.contentDirectoryExists).toHaveBeenCalledWith('books/some/book/path');
      expect(mockStorage.contentFileExists).toHaveBeenCalledWith('books/some/book/path/cover.jpg');
      expect(mockStorage.getContentFile).toHaveBeenCalledWith('books/some/book/path/cover.jpg');
      expect(returnVal).toBe('image');
    });

    it('throws an error if no rows are returned', async () => {
      mockGetWithParams.mockResolvedValue(undefined);
      mockStorage.contentDirectoryExists.mockReturnValue(true);
      mockStorage.contentFileExists.mockReturnValue(true);
      mockStorage.getContentFile.mockResolvedValue('image');

      await expect(calibreDb.getCoverImage(123)).rejects.toThrow(
        new NotFoundError('No book files found'),
      );
    });

    it('throws an error if the content directory at that path does not exist', async () => {
      mockGetWithParams.mockResolvedValue({ path: 'some-path' });
      mockStorage.contentDirectoryExists.mockReturnValue(false);
      mockStorage.contentFileExists.mockReturnValue(true);
      mockStorage.getContentFile.mockResolvedValue('image');

      await expect(calibreDb.getCoverImage(123)).rejects.toThrow(
        new NotFoundError('No book files found'),
      );
    });

    it('throws an error if the content directory exists but cover.jpg does not', async () => {
      mockGetWithParams.mockResolvedValue({ path: 'some-path' });
      mockStorage.contentDirectoryExists.mockReturnValue(true);
      mockStorage.contentFileExists.mockReturnValue(false);
      mockStorage.getContentFile.mockResolvedValue('image');

      await expect(calibreDb.getCoverImage(123)).rejects.toThrow(
        new NotFoundError('No cover found'),
      );
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
