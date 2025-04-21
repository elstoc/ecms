/* eslint-disable @typescript-eslint/no-explicit-any */
import { OPEN_READONLY } from 'sqlite3';

import { CalibreDb } from '@/services/calibredb/CalibreDb';

jest.mock('@/adapters');

const mockStorage = {
  contentFileExists: jest.fn() as jest.Mock,
  getContentDb: jest.fn() as jest.Mock,
};

const apiPath = 'books';
const apiDbPath = 'books/metadata.db';
const config = {} as any;

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
      expect(mockStorage.getContentDb).toHaveBeenCalledWith(apiDbPath, OPEN_READONLY);
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
    it('returns an empty array of books', async () => {
      const mockBooks = ['book1', 'book2'];
      mockGetAll.mockResolvedValue(mockBooks);
      mockStorage.contentFileExists.mockReturnValue(true);
      await calibreDb.initialise();

      const books = await calibreDb.getBooks();

      expect(books).toEqual({ books: mockBooks });
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
