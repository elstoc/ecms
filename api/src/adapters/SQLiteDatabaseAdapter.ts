import { Database, OPEN_CREATE, OPEN_FULLMUTEX, OPEN_READWRITE } from 'sqlite3';

import { DatabaseAdapter } from './DatabaseAdapter';

export class SQLiteDatabaseAdapter implements DatabaseAdapter {
  private database?: Database;

  public constructor(private dbFullPath: string) {}

  public initialise(mode = OPEN_READWRITE | OPEN_CREATE | OPEN_FULLMUTEX): Promise<void> {
    return new Promise((resolve, reject) => {
      this.database = new Database(this.dbFullPath, mode, (err: Error | null) => {
        err ? reject(err) : resolve();
      });
    });
  }

  public close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.database?.close((err: Error | null) => {
        err ? reject(err) : resolve();
      });
    });
  }

  public exec(sql: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.database?.exec(sql, (err: Error | null) => {
        err ? reject(err) : resolve();
      });
    });
  }

  public async runWithParams(sql: string, params: unknown): Promise<void> {
    return new Promise((resolve, reject) => {
      this.database?.run(sql, params, (err: Error | null) => {
        err ? reject(err) : resolve();
      });
    });
  }

  public get<T>(sql: string): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      this.database?.get<T>(sql, (err: Error | null, row: T) => {
        err ? reject(err) : resolve(row);
      });
    });
  }

  public getAll<T>(sql: string): Promise<T[] | undefined> {
    return new Promise((resolve, reject) => {
      this.database?.all(sql, (err: Error | null, rows: T[]) => {
        err ? reject(err) : resolve(rows);
      });
    });
  }

  public getWithParams<T>(sql: string, params: unknown): Promise<T> {
    return new Promise((resolve, reject) => {
      this.database?.get(sql, params, (err: Error | null, row: T) => {
        err ? reject(err) : resolve(row);
      });
    });
  }

  public getAllWithParams<T>(sql: string, params: unknown): Promise<T[] | undefined> {
    return new Promise((resolve, reject) => {
      this.database?.all(sql, params, (err: Error | null, rows: T[]) => {
        err ? reject(err) : resolve(rows);
      });
    });
  }
}
