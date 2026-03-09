import Database from 'better-sqlite3';

import { SQLiteDatabaseAdapter } from './SQLiteDatabaseAdapter';

jest.mock('better-sqlite3');
const mockedDatabase = jest.mocked(Database);

const dbFullPath = '/path/to/file';

describe('SQLiteDatabaseAdapter', () => {
  let adapter: SQLiteDatabaseAdapter;

  beforeEach(() => {
    adapter = new SQLiteDatabaseAdapter(dbFullPath);
    mockedDatabase.mockClear();
  });

  describe('initialise', () => {
    it('initialises with correct options/pragmas if read-only requested', () => {
      adapter.initialise(true);

      expect(mockedDatabase).toHaveBeenCalledWith(dbFullPath, { readonly: true });

      const mockDbInstance = mockedDatabase.mock.instances[0];

      expect(mockDbInstance.pragma).toHaveBeenCalledTimes(1);
      expect(mockDbInstance.pragma).toHaveBeenCalledWith('foreign_keys = ON');
    });

    it('initialises with correct options/pragmas if read-only not requested', () => {
      adapter.initialise();

      expect(mockedDatabase).toHaveBeenCalledWith(dbFullPath, undefined);

      const mockDbInstance = mockedDatabase.mock.instances[0];

      expect(mockDbInstance.pragma).toHaveBeenCalledTimes(2);
      expect(mockDbInstance.pragma).toHaveBeenCalledWith('foreign_keys = ON');
      expect(mockDbInstance.pragma).toHaveBeenCalledWith('journal_mode = WAL');
    });
  });

  describe('close', () => {
    it('closes the database', () => {
      adapter.initialise();
      const mockDbInstance = mockedDatabase.mock.instances[0];

      adapter.close();

      expect(mockDbInstance.close).toHaveBeenCalledTimes(1);
    });
  });

  describe('run', () => {
    it('prepares statement and runs with params if they are provided', () => {
      adapter.initialise();
      const mockDbInstance = mockedDatabase.mock.instances[0];
      const stmtRun = jest.fn();
      (mockDbInstance.prepare as jest.Mock).mockReturnValue({ run: stmtRun });

      adapter.run('some-sql', { param1: 'value1' });

      expect(mockDbInstance.prepare).toHaveBeenCalledWith('some-sql');
      expect(stmtRun).toHaveBeenCalledWith({ param1: 'value1' });
    });

    it('prepares statement and runs without params if none are provided', () => {
      adapter.initialise();
      const mockDbInstance = mockedDatabase.mock.instances[0];
      const stmtRun = jest.fn();
      (mockDbInstance.prepare as jest.Mock).mockReturnValue({ run: stmtRun });

      adapter.run('some-sql', undefined);

      expect(mockDbInstance.prepare).toHaveBeenCalledWith('some-sql');
      expect(stmtRun).toHaveBeenCalledWith();
    });
  });

  describe('get', () => {
    it('prepares statement and gets with params if they are provided (returns output)', () => {
      adapter.initialise();
      const mockDbInstance = mockedDatabase.mock.instances[0];
      const stmtGet = jest.fn();
      (mockDbInstance.prepare as jest.Mock).mockReturnValue({ get: stmtGet });
      stmtGet.mockReturnValue('some result');

      const result = adapter.get('some-sql', { param1: 'value1' });

      expect(mockDbInstance.prepare).toHaveBeenCalledWith('some-sql');
      expect(stmtGet).toHaveBeenCalledWith({ param1: 'value1' });
      expect(result).toBe('some result');
    });

    it('prepares statement and gets without params if none are provided (returns output)', () => {
      adapter.initialise();
      const mockDbInstance = mockedDatabase.mock.instances[0];
      const stmtGet = jest.fn();
      (mockDbInstance.prepare as jest.Mock).mockReturnValue({ get: stmtGet });
      stmtGet.mockReturnValue('some result');

      const result = adapter.get('some-sql', undefined);

      expect(mockDbInstance.prepare).toHaveBeenCalledWith('some-sql');
      expect(stmtGet).toHaveBeenCalledWith();
      expect(result).toBe('some result');
    });
  });

  describe('getAll', () => {
    it('prepares statement and gets all with params if they are provided (returns output)', () => {
      adapter.initialise();
      const mockDbInstance = mockedDatabase.mock.instances[0];
      const stmtAll = jest.fn();
      (mockDbInstance.prepare as jest.Mock).mockReturnValue({ all: stmtAll });
      stmtAll.mockReturnValue('some result');

      const result = adapter.getAll('some-sql', { param1: 'value1' });

      expect(mockDbInstance.prepare).toHaveBeenCalledWith('some-sql');
      expect(stmtAll).toHaveBeenCalledWith({ param1: 'value1' });
      expect(result).toBe('some result');
    });

    it('prepares statement and gets all without params if none are provided (returns output)', () => {
      adapter.initialise();
      const mockDbInstance = mockedDatabase.mock.instances[0];
      const stmtAll = jest.fn();
      (mockDbInstance.prepare as jest.Mock).mockReturnValue({ all: stmtAll });
      stmtAll.mockReturnValue('some result');

      const result = adapter.getAll('some-sql', undefined);

      expect(mockDbInstance.prepare).toHaveBeenCalledWith('some-sql');
      expect(stmtAll).toHaveBeenCalledWith();
      expect(result).toBe('some result');
    });
  });
});
