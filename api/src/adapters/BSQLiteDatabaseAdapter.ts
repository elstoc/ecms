import Database, { Database as DatabaseType } from 'better-sqlite3';

export type DbParams = Record<string, unknown>;

export class BSQLiteDatabaseAdapter {
  private database?: DatabaseType;

  public constructor(private dbFullPath: string) {}

  public initialise(readOnly?: boolean): void {
    const dbOptions = readOnly ? { readonly: true } : undefined;

    this.database = new Database(this.dbFullPath, dbOptions);

    if (!readOnly) {
      this.database.pragma('journal_mode = WAL');
    }
    this.database.pragma('foreign_keys = ON');
  }

  public close(): void {
    this.database?.close();
  }

  public run(sql: string, params?: DbParams): void {
    if (!this.database) {
      return;
    }

    const stmt = this.database.prepare(sql);

    if (params) {
      stmt.run(params);
    } else {
      stmt.run();
    }
  }

  public get<T>(sql: string, params?: DbParams): T | undefined {
    if (!this.database) {
      return;
    }

    const stmt = this.database.prepare(sql);

    if (params) {
      return stmt.get(params) as T | undefined;
    }

    return stmt.get() as T | undefined;
  }

  public getAll<T>(sql: string, params?: DbParams): T[] | undefined {
    if (!this.database) {
      return;
    }

    const stmt = this.database.prepare(sql);

    if (params) {
      return stmt.all(params) as T[] | undefined;
    }

    return stmt.all() as T[] | undefined;
  }
}
