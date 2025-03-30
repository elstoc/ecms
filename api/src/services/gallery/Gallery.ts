import { Logger } from 'winston';

import { StorageAdapter } from '@/adapters/StorageAdapter';
import { ImageMetadata } from '@/contracts/gallery';
import { ImageSize } from '@/contracts/gallery';
import { GalleryContents } from '@/contracts/gallery';
import { Config } from '@/utils';

import { GalleryImage } from './GalleryImage';

export class Gallery {
  private apiPath: string;
  private imageCache: { [key: string]: GalleryImage } = {};

  public constructor(
    apiPath: string,
    private config: Config,
    private storage: StorageAdapter,
    private logger: Logger,
  ) {
    this.apiPath = apiPath.replace(/^\//, '');
  }

  public async getContents(requestedPages = 1, includeFile?: string): Promise<GalleryContents> {
    this.logger.debug(
      `getting contents of ${this.apiPath} (requestedPages ${requestedPages}, includeFile: ${includeFile})`,
    );

    const { galleryPageSize } = this.config;
    const allFileNames = (await this.getJpegFileNames()).sort().reverse();
    const totalPages = Math.ceil(allFileNames.length / galleryPageSize);

    let currentPage = Math.min(totalPages, requestedPages);
    if (includeFile && currentPage < totalPages) {
      const includeFileIndex = allFileNames.indexOf(includeFile);
      const pageContainingFile = Math.ceil((includeFileIndex + 1) / galleryPageSize);
      currentPage = Math.max(pageContainingFile, currentPage);
    }

    const images = await Promise.all(
      allFileNames
        .slice(0, currentPage * galleryPageSize)
        .map((fileName) => this.getImageMetadata(`${this.apiPath}/${fileName}`)),
    );

    return {
      images,
      currentPage,
      totalPages,
    };
  }

  private async getImageMetadata(apiPath: string): Promise<ImageMetadata> {
    const image = this.getGalleryImage(apiPath);
    return await image.getImageMetadata();
  }

  public async getImageFile(apiPath: string, size: ImageSize, timestamp: string): Promise<Buffer> {
    const image = this.getGalleryImage(apiPath);
    return image.getFile(size, timestamp);
  }

  private getGalleryImage(apiPath: string): GalleryImage {
    let image = this.imageCache[apiPath];
    if (!image) {
      image = new GalleryImage(this.config, apiPath, this.storage, this.logger);
      this.imageCache[apiPath] = image;
    }
    return image;
  }

  private async getJpegFileNames(): Promise<string[]> {
    return this.storage.listContentChildren(this.apiPath, (file) => file.endsWith('jpg'));
  }
}
