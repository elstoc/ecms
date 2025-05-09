import path from 'path';
import { Logger } from 'winston';

import { StorageAdapter } from '@/adapters';
import { User } from '@/contracts/auth';
import { ComponentMetadata } from '@/contracts/site';
import { Gallery } from '@/services/gallery';
import { Markdown } from '@/services/markdown';
import { VideoDb } from '@/services/videodb';
import { Config, sortByWeightAndTitle } from '@/utils';

import { CalibreDb } from '../calibredb/CalibreDb';

import { Component } from './Component';

export class ComponentGroup {
  private components: { [key: string]: Component } = {};

  constructor(
    private config: Config,
    private storage: StorageAdapter,
    private logger: Logger,
    private parentPath: string,
  ) {}

  public async list(user?: User): Promise<ComponentMetadata[]> {
    this.logger.debug(`Site.listComponents(${user})`);
    const componentPromises = (await this.listComponentYamlFiles()).map(async (file) =>
      this.getComponentMetadata(path.join(this.parentPath, path.basename(file, '.yaml')), user),
    );

    const components = await Promise.all(componentPromises);

    return sortByWeightAndTitle(components as ComponentMetadata[]);
  }

  private async listComponentYamlFiles(): Promise<string[]> {
    return this.storage.listContentChildren(this.parentPath, (file: string) =>
      file.endsWith('.yaml'),
    );
  }

  private async getComponentMetadata(
    apiRootPath: string,
    user?: User,
  ): Promise<ComponentMetadata | undefined> {
    const component = this.getComponent(apiRootPath);
    return component.getMetadata(user);
  }

  private getComponent(apiPath: string): Component {
    this.components[apiPath] ??= new Component(this.config, apiPath, this.storage, this.logger);
    return this.components[apiPath];
  }

  public async getGallery(apiPath: string): Promise<Gallery> {
    this.logger.debug(`Site.getGallery(${apiPath})`);
    return await this.getComponentAtPath(apiPath).getGallery(apiPath);
  }

  private getComponentAtPath(apiPath: string): Component {
    const baseDirOfComponent = apiPath
      .replace(this.parentPath, '')
      .replace(/^\//, '')
      .split('/')[0];
    const componentPath = path.join(this.parentPath, baseDirOfComponent);
    return this.getComponent(componentPath);
  }

  public async getMarkdown(apiPath: string): Promise<Markdown> {
    this.logger.debug(`Site.getMarkdown(${apiPath})`);
    return await this.getComponentAtPath(apiPath).getMarkdown(apiPath);
  }

  public async getVideoDb(apiPath: string): Promise<VideoDb> {
    this.logger.debug(`Site.getVideoDb(${apiPath})`);
    return await this.getComponentAtPath(apiPath).getVideoDb(apiPath);
  }

  public async getCalibreDb(apiPath: string): Promise<CalibreDb> {
    this.logger.debug(`Site.getCalibreDb(${apiPath})`);
    return await this.getComponentAtPath(apiPath).getCalibreDb(apiPath);
  }

  public async shutdown(): Promise<void> {
    this.logger.debug('Site.shutdown()');
    for (const component of Object.values(this.components)) {
      await component.shutdown();
    }
  }
}
