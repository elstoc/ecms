import { Logger } from 'winston';

import { StorageAdapter } from '@/adapters';
import { User } from '@/contracts/auth';
import { ComponentMetadata, SiteConfig } from '@/contracts/site';
import { Gallery } from '@/services/gallery';
import { Markdown } from '@/services/markdown';
import { VideoDb } from '@/services/videodb';
import { Config } from '@/utils';

import { CalibreDb } from '../calibredb/CalibreDb';

import { ComponentGroup } from './ComponentGroup';

export class Site {
  private components: ComponentGroup;

  constructor(
    private config: Config,
    storage: StorageAdapter,
    private logger: Logger,
  ) {
    this.components = new ComponentGroup(config, storage, logger, '');
  }

  public async listComponents(user?: User): Promise<ComponentMetadata[]> {
    return await this.components.list(user);
  }

  public async getGallery(apiPath: string): Promise<Gallery> {
    return await this.components.getGallery(apiPath);
  }

  public async getMarkdown(apiPath: string): Promise<Markdown> {
    return await this.components.getMarkdown(apiPath);
  }

  public async getVideoDb(apiPath: string): Promise<VideoDb> {
    return await this.components.getVideoDb(apiPath);
  }

  public async getCalibreDb(apiPath: string): Promise<CalibreDb> {
    return await this.components.getCalibreDb(apiPath);
  }

  public getConfig(): SiteConfig {
    this.logger.debug('Site.getConfig()');
    return {
      authEnabled: this.config.enableAuthentication,
      footerText: this.config.footerText,
      siteTitle: this.config.siteTitle,
    };
  }

  public async shutdown(): Promise<void> {
    this.logger.debug('Site.shutdown()');
    return await this.components.shutdown();
  }
}
