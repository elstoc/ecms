/* eslint-disable @typescript-eslint/no-explicit-any */
import { OPEN_FULLMUTEX, OPEN_READONLY } from 'sqlite3';

import { CalibreDb } from '@/services/calibredb/CalibreDb';

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
  const mockClose = jest.fn();

  const mockDb = {
    initialise: mockInit,
    getAll: mockGetAll,
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
    const mockManyBooks = [
      { id: 1, title: 'Book 1' },
      { id: 2, title: 'Book 2' },
      { id: 3, title: 'Book 3' },
      { id: 4, title: 'Book 4' },
      { id: 5, title: 'Book 5' },
      { id: 6, title: 'Book 6' },
      { id: 7, title: 'Book 7' },
      { id: 8, title: 'Book 8' },
      { id: 9, title: 'Book 9' },
      { id: 10, title: 'Book 10' },
    ];

    it('returns an array of books', async () => {
      mockGetAll.mockResolvedValue(mockManyBooks);
      mockStorage.contentFileExists.mockReturnValue(true);
      await calibreDb.initialise();

      const books = await calibreDb.getBooks(10);

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
        mockGetAll.mockResolvedValue(mockManyBooks);
        mockStorage.contentFileExists.mockReturnValue(true);
        await calibreDb.initialise();

        const { books, totalPages, currentPage } = await calibreDb.getBooks(requestedPages);

        expect(totalPages).toBe(4);
        expect(currentPage).toBe(expectedPagesReturned);
        expect(books.length).toBe(Math.min(currentPage * 3, 10));
      },
    );
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
