import path from 'path';
import { OPEN_FULLMUTEX, OPEN_READONLY } from 'sqlite3';
import { Logger } from 'winston';

import { DatabaseAdapter, StorageAdapter } from '@/adapters';
import { Book, PaginatedBooks } from '@/contracts/calibredb';
import { Config } from '@/utils';

const wait = (timeMs: number) => new Promise((resolve) => setTimeout(resolve, timeMs));

export class CalibreDb {
  private apiPath: string;
  private initialising = false;
  private database?: DatabaseAdapter;

  public constructor(
    apiPath: string,
    private config: Config,
    private logger: Logger,
    private storage: StorageAdapter,
  ) {
    this.apiPath = apiPath.replace(/^\//, '');
  }

  public async initialise(): Promise<void> {
    while (this.initialising) {
      this.logger.info('waiting for database to initialise');
      await wait(50);
    }

    if (!this.database) {
      this.initialising = true;
      this.logger.info(`initialising database at ${this.apiPath}`);
      const dbContentPath = path.join(this.apiPath, 'metadata.db');
      if (!this.storage.contentFileExists(dbContentPath)) {
        throw new Error(`No database found at ${dbContentPath}`);
      }
      this.database = await this.storage.getContentDb(
        dbContentPath,
        OPEN_READONLY | OPEN_FULLMUTEX,
      );
      this.initialising = false;
      this.logger.info(`initialised database at ${this.apiPath}`);
    }
  }

  public async getBooks(requestedPages = 1): Promise<PaginatedBooks> {
    const sql = 'SELECT id, title FROM books ORDER BY title';
    let books = await this.database?.getAll<Book>(sql);

    if (!books) {
      throw new Error('Unexpected error querying books');
    }

    const { calibreDbPageSize } = this.config;
    const totalPages = Math.ceil(books.length / calibreDbPageSize);
    const currentPage = Math.min(totalPages, requestedPages);
    const limit = currentPage * calibreDbPageSize;

    if (limit) {
      books = books.slice(0, limit);
    }

    return {
      books,
      currentPage,
      totalPages,
    };
  }

  public async shutdown(): Promise<void> {
    this.logger.info(`shutting down database at ${this.apiPath}`);
    await this.database?.close();
  }
}
