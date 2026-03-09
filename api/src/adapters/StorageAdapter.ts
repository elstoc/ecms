import { BSQLiteDatabaseAdapter } from './BSQLiteDatabaseAdapter';

export interface StorageAdapter {
  listContentChildren(
    contentDirPath: string,
    fileMatcher: (fileName: string) => boolean,
  ): Promise<string[]>;
  getContentFullPath(contentPath: string): string;
  contentFileExists(contentPath: string): boolean;
  contentDirectoryExists(contentPath: string): boolean;
  getContentFile(apiPath: string): Promise<Buffer>;
  getContentDbv2(contentPath: string, readOnly?: boolean): Promise<BSQLiteDatabaseAdapter>;
  getAdminFile(adminPath: string): Promise<Buffer>;
  getGeneratedFile(apiPath: string, tag: string): Promise<Buffer>;
  storeContentFile(apiPath: string, fileBuffer: Buffer): Promise<void>;
  storeGeneratedFile(apiPath: string, tag: string, fileBuffer: Buffer): Promise<void>;
  storeAdminFile(adminPath: string, fileBuffer: Buffer): Promise<void>;
  deleteContentFile(apiPath: string): Promise<void>;
  generatedFileIsOlder(apiPath: string, tag: string): boolean;
  getContentFileModifiedTime(apiPath: string): number;
  getAdminFileModifiedTime(adminPath: string): number;
}
