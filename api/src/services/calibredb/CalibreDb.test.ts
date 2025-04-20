/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalibreDb } from '@/services/calibredb/CalibreDb';

const mockStorage = {
  contentFileExists: jest.fn() as jest.Mock,
  getContentDb: jest.fn() as jest.Mock,
};

const apiPath = 'books';
const config = {} as any;

const mockLogger = {
  debug: jest.fn(),
  info: jest.fn(),
  error: jest.fn(),
} as any;

describe('CalibreDb', () => {
  let calibreDb: CalibreDb;

  beforeEach(() => {
    calibreDb = new CalibreDb(apiPath, config, mockLogger, mockStorage as any);
  });

  describe('getBooks', () => {
    it('returns an empty array of books', async () => {
      const books = await calibreDb.getBooks();
      expect(books.books).toEqual([]);
    });
  });
});
