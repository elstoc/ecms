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
  bookPath?: number;
};

type BookDao = {
  id: number;
  title: string;
  authors: string;
  rating: number | null;
  format: number | null;
  path: number | null;
  collections: string | null;
  kobo_status: number | null;
  kindle_status: number | null;
  tablet_status: number | null;
  read: number;
  fixed: number;
};

export const baseBooksSql = `
    SELECT books.id, title, authors.authors, ratings.rating, formats.format, paths.path, collections.collections,
           kobo_statuses.kobo_status, kindle_statuses.kindle_status, tablet_statuses.tablet_status,
           IFNULL(read.read, 0) AS read, IFNULL(fixed.fixed, 0) AS fixed
    FROM books
    LEFT JOIN (SELECT book, ratings.rating / 2 as rating
               FROM books_ratings_link ratings_link
               JOIN ratings ON ratings_link.rating = ratings.id) ratings ON books.id = ratings.book
    LEFT JOIN (SELECT book, GROUP_CONCAT(author, '|') AS authors
               FROM books_authors_link bal
               GROUP BY book) authors ON books.id = authors.book
    LEFT JOIN (SELECT book, MIN(value) AS format
               FROM books_custom_column_7_link format_link
               GROUP BY book) formats ON books.id = formats.book
    LEFT JOIN (SELECT book, MIN(value) AS path
               FROM books_custom_column_39_link path_link
               GROUP BY book) paths ON books.id = paths.book
    LEFT JOIN (SELECT book, GROUP_CONCAT(value, '|') AS collections
               FROM books_custom_column_14_link collection_link
               GROUP BY book) collections ON books.id = collections.book
    LEFT JOIN (SELECT book, MIN(value) AS kobo_status
               FROM books_custom_column_21_link collection_link
               GROUP BY book) kobo_statuses ON books.id = kobo_statuses.book
    LEFT JOIN (SELECT book, MIN(value) AS kindle_status
               FROM books_custom_column_22_link collection_link
               GROUP BY book) kindle_statuses ON books.id = kindle_statuses.book
    LEFT JOIN (SELECT book, MIN(value) AS tablet_status
               FROM books_custom_column_23_link collection_link
               GROUP BY book) tablet_statuses ON books.id = tablet_statuses.book
    LEFT JOIN (SELECT book, MIN(read.value) as read
               FROM custom_column_42 read
               GROUP BY book) read ON books.id = read.book
    LEFT JOIN (SELECT book, MIN(fixed.value) as fixed
               FROM custom_column_25 fixed
               GROUP BY book) fixed ON books.id = fixed.book
    `;

export const lookupTableSql: Record<string, string> = {
  authors: 'SELECT id as code, name as description FROM authors',
  formats: 'SELECT id as code, value as description FROM custom_column_7',
  paths: 'SELECT id as code, value as description FROM custom_column_39',
  collections: 'SELECT id as code, value as description FROM custom_column_14',
  koboStatuses: 'SELECT id as code, value as description FROM custom_column_21',
  kindleStatuses: 'SELECT id as code, value as description FROM custom_column_22',
  tabletStatuses: 'SELECT id as code, value as description FROM custom_column_23',
};

export const filterSql = {
  author: '(EXISTS (SELECT 1 FROM books_authors_link WHERE book = books.id AND author = $author))',
  format:
    '(EXISTS (SELECT 1 FROM books_custom_column_7_link WHERE book = books.id AND value = $format))',
  bookPath:
    '(EXISTS (SELECT 1 FROM books_custom_column_39_link WHERE book = books.id AND value = $bookPath))',
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
      rating: book.rating ?? undefined,
      format: book.format ?? undefined,
      path: book.path ?? undefined,
      collections: book.collections?.split('|').map(Number) || undefined,
      koboStatus: book.kobo_status ?? undefined,
      kindleStatus: book.kindle_status ?? undefined,
      tabletStatus: book.tablet_status ?? undefined,
      read: book.read === 1,
      fixed: book.fixed === 1,
    };
  }

  private buildBookQuery(filters: Filters): {
    sql: string;
    params: Record<string, unknown>;
  } {
    const params: Record<string, unknown> = {};
    const whereClauses: string[] = [];

    const { author, format, bookPath } = filters;

    if (author) {
      whereClauses.push(filterSql.author);
      params['$author'] = author;
    }
    if (format) {
      whereClauses.push(filterSql.format);
      params['$format'] = format;
    }
    if (bookPath) {
      whereClauses.push(filterSql.bookPath);
      params['$bookPath'] = bookPath;
    }

    let sql = baseBooksSql;

    if (whereClauses.length > 0) {
      sql += ` WHERE ${whereClauses.join(' AND ')}`;
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
