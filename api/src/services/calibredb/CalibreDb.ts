import { Logger } from 'winston';

import { StorageAdapter } from '@/adapters';
import { Config } from '@/utils';

export class CalibreDb {
  private apiPath: string;

  public constructor(
    apiPath: string,
    private config: Config,
    private logger: Logger,
    private storage: StorageAdapter,
  ) {
    this.apiPath = apiPath.replace(/^\//, '');
  }

  public async getBooks() {
    return {
      books: [],
    };
  }
}
