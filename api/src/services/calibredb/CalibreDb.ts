import path from 'path';
import { OPEN_FULLMUTEX, OPEN_READONLY } from 'sqlite3';
import { Logger } from 'winston';

import { DatabaseAdapter, StorageAdapter } from '@/adapters';
import { Book, PaginatedBooks } from '@/contracts/calibredb';
import { Config } from '@/utils';

const wait = (timeMs: number) => new Promise((resolve) => setTimeout(resolve, timeMs));

type Filters = {
  author?: number;
};

type BookDao = {
  id: number;
  title: string;
  authors: string;
  format: number | null;
};

export enum LookupTables {
  authors = 'authors',
  formats = 'formats',
}

export type LookupRow = {
  code: number;
  description: string;
};

export type LookupValues = {
  [key: number]: string;
};

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

  private toBookDto(book: BookDao): Book {
    return {
      id: book.id,
      title: book.title,
      authors: book.authors?.split('|').map(Number) || undefined,
      format: book.format ?? undefined,
    };
  }

  private buildBookQuery(filters: Filters): {
    sql: string;
    params: Record<string, unknown>;
  } {
    const params: Record<string, unknown> = {};
    const whereClauses: string[] = [];

    const { author } = filters;

    let sql = `
    SELECT id, title, authors.authors, format.format
    FROM books
    LEFT JOIN (SELECT book, GROUP_CONCAT(author, '|') authors
               FROM books_authors_link bal
               GROUP BY book) authors ON books.id = authors.book
    LEFT JOIN (SELECT book, MIN(format_link.value) as format
               FROM books_custom_column_7_link format_link
               GROUP BY book) format ON books.id = format.book
    `;

    if (author) {
      whereClauses.push(
        'EXISTS (SELECT 1 FROM books_authors_link WHERE book = books.id AND author = $author)',
      );
      params['$author'] = author;
    }

    if (whereClauses.length > 0) {
      sql += ` WHERE (${whereClauses.join(') AND (')})`;
    }

    sql += ' ORDER BY title';

    return { params, sql };
  }

  public async getBooks(filters: Filters, requestedPages = 1): Promise<PaginatedBooks> {
    const { sql, params } = this.buildBookQuery(filters);

    let books = await this.database?.getAllWithParams<BookDao>(sql, params);

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
      books: books.map(this.toBookDto),
      currentPage,
      totalPages,
    };
  }

  private async getAuthors(): Promise<LookupRow[] | undefined> {
    const sql = 'SELECT id as code, name as description FROM authors';
    return await this.database?.getAll<LookupRow>(sql);
  }

  private async getFormats(): Promise<LookupRow[] | undefined> {
    const sql = 'SELECT id as code, value as description FROM custom_column_7';
    return await this.database?.getAll<LookupRow>(sql);
  }

  public async getLookupValues(tableName: string): Promise<LookupValues> {
    if (!Object.values(LookupTables).includes(tableName as LookupTables)) {
      throw new Error(`invalid table name ${tableName}`);
    }

    let lookupRows: LookupRow[] | undefined;
    if (tableName === 'authors') {
      lookupRows = await this.getAuthors();
    }
    if (tableName === 'formats') {
      lookupRows = await this.getFormats();
    }

    if (!lookupRows) {
      throw new Error(`No ${tableName} records found`);
    }

    const returnVal: LookupValues = {};
    lookupRows.forEach((row) => {
      returnVal[row.code] = row.description;
    });

    return returnVal;
  }

  public async shutdown(): Promise<void> {
    this.logger.info(`shutting down database at ${this.apiPath}`);
    await this.database?.close();
  }
}
