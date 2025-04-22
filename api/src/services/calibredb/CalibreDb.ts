import path from 'path';
import { OPEN_FULLMUTEX, OPEN_READONLY } from 'sqlite3';
import { Logger } from 'winston';

import { DatabaseAdapter, StorageAdapter } from '@/adapters';
import { Book, PaginatedBooks } from '@/contracts/calibredb';
import { Config } from '@/utils';

const wait = (timeMs: number) => new Promise((resolve) => setTimeout(resolve, timeMs));

type Filters = {
  author?: number;
  format?: number;
};

type BookDao = {
  id: number;
  title: string;
  authors: string;
  format: number | null;
  shelf_path: number | null;
};

const lookupTableSql: Record<string, string> = {
  authors: 'SELECT id as code, name as description FROM authors',
  formats: 'SELECT id as code, value as description FROM custom_column_7',
  shelfPaths: 'SELECT id as code, value as description FROM custom_column_39',
};

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
      shelfPath: book.shelf_path ?? undefined,
    };
  }

  private buildBookQuery(filters: Filters): {
    sql: string;
    params: Record<string, unknown>;
  } {
    const params: Record<string, unknown> = {};
    const whereClauses: string[] = [];

    const { author, format } = filters;

    let sql = `
    SELECT id, title, authors.authors, format.format, shelf_path.shelf_path
    FROM books
    LEFT JOIN (SELECT book, GROUP_CONCAT(author, '|') authors
               FROM books_authors_link bal
               GROUP BY book) authors ON books.id = authors.book
    LEFT JOIN (SELECT book, MIN(format_link.value) as format
               FROM books_custom_column_7_link format_link
               GROUP BY book) format ON books.id = format.book
    LEFT JOIN (SELECT book, MIN(shelfpath_link.value) as shelf_path
               FROM books_custom_column_39_link shelfpath_link
               GROUP BY book) shelf_path ON books.id = shelf_path.book
    `;

    if (author) {
      whereClauses.push(
        'EXISTS (SELECT 1 FROM books_authors_link WHERE book = books.id AND author = $author)',
      );
      params['$author'] = author;
    }

    if (format) {
      whereClauses.push(
        'EXISTS (SELECT 1 FROM books_custom_column_7_link WHERE book = books.id AND value = $format)',
      );
      params['$format'] = format;
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

  public async getLookupValues(tableName: string): Promise<LookupValues> {
    if (!Object.keys(lookupTableSql).includes(tableName)) {
      throw new Error(`invalid table name ${tableName}`);
    }

    const lookupRows = await this.database?.getAll<LookupRow>(lookupTableSql[tableName]);

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
