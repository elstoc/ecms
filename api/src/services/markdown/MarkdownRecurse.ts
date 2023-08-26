import path from 'path';
import YAML from 'yaml';
import _ from 'lodash';

import { IMarkdownRecurse, MarkdownStructure } from './IMarkdownRecurse';
import { Config, sortByWeightAndTitle, splitFrontMatter, splitPath } from '../../utils';
import { IStorageAdapter } from '../../adapters/IStorageAdapter';
import { NotFoundError } from '../../errors';

export class MarkdownRecurse implements IMarkdownRecurse {
    private apiPath: string;
    private contentPath: string;
    private childrenContentDir: string;
    private metadata?: MarkdownStructure;
    private children: { [key: string]: IMarkdownRecurse } = {};
    private metadataFromSourceFileTime = 0;

    constructor(
        apiPath: string,
        private config: Config,
        private storage: IStorageAdapter,
        private isRoot = false
    ) {
        this.apiPath = apiPath.replace(/^\//, '');
        this.childrenContentDir = this.apiPath.replace(/\.md$/, '');
        this.contentPath = this.isRoot
            ? `${this.apiPath}/index.md`
            : this.apiPath;
    }

    public async getFile(targetApiPath: string): Promise<Buffer> {
        this.throwIfNoContentFile();
        if (targetApiPath === this.apiPath) {
            return this.storage.getContentFile(this.contentPath);
        } else {
            const nextChild = this.getNextChildInTargetPath(targetApiPath);
            return nextChild.getFile(targetApiPath);
        }
    }

    private throwIfNoContentFile(): void {
        if (!this.contentPath.endsWith('.md') || !this.storage.contentFileExists(this.contentPath)) {
            throw new NotFoundError(`No markdown file found matching path ${this.apiPath}`);
        }
    }

    private getNextChildInTargetPath(targetApiPath: string): IMarkdownRecurse {
        /* split the "target path" and "directory containing this instance's children"
           into path segment arrays */
        const targetApiPathSplit = splitPath(targetApiPath);
        const thisChildrenContentDirSplit = splitPath(this.childrenContentDir);

        /* if the target path has one more path segment than the children directory,
           it must be a direct child of this instance */
        if (targetApiPathSplit.length === thisChildrenContentDirSplit.length + 1) {
            return this.getChild(targetApiPath);
        }

        /* target is a deeper child
           get the api path to the next file in the chain */
        const nextChildApiDirSplit = targetApiPathSplit.slice(0, thisChildrenContentDirSplit.length + 1);
        const nextChildApiPath = path.join(...nextChildApiDirSplit) + '.md';
        return this.getChild(nextChildApiPath);
    }

    private getChild(childApiPath: string): IMarkdownRecurse {
        this.children[childApiPath] ??= new MarkdownRecurse(childApiPath, this.config, this.storage);
        return this.children[childApiPath];
    }

    public async getMetadata(): Promise<MarkdownStructure> {
        this.throwIfNoContentFile();

        const contentModifiedTime = this.storage.getContentFileModifiedTime(this.contentPath);

        if (this.metadata && contentModifiedTime === this.metadataFromSourceFileTime) {
            return this.metadata;
        }

        const frontMatter = await this.parseFrontMatter();

        const fieldList = ['apiPath', 'title', 'uiPath', 'weight'];
        const pickedFields = _.pick(frontMatter, fieldList);
        const additionalData = _.omit(frontMatter, fieldList);

        this.metadata = {
            apiPath: this.apiPath,
            title: path.basename(this.apiPath, '.md'),
            ...pickedFields,
            additionalData
        };

        this.metadataFromSourceFileTime = contentModifiedTime;
        return this.metadata;
    }

    private async parseFrontMatter(): Promise<{ [key: string]: string }> {
        const file = await this.storage.getContentFile(this.contentPath);
        const [yaml] = splitFrontMatter(file.toString('utf-8'));
        return YAML.parse(yaml);
    }
    
    public async getMdStructure(): Promise<MarkdownStructure> {
        this.throwIfNoContentFile();
        const metadata = await this.getMetadata();
        const childObjects = await this.getChildren();
        const childStructPromises = childObjects.map((child) => child.getMdStructure());
        let children = await Promise.all(childStructPromises);
        children = sortByWeightAndTitle(children);

        if (this.isRoot) {
            // metadata for the root instance is added to the top of the list
            children.unshift({ ...metadata });
            return { children };
        } else if (children.length === 0) {
            return { ...metadata };
        }

        return { ...metadata, children };
    }

    private async getChildren(): Promise<IMarkdownRecurse[]> {
        const childMdFiles = await this.storage.listContentChildren(
            this.childrenContentDir,
            (childFile) => (
                childFile.endsWith('.md') && !(childFile.endsWith('index.md'))
            )
        );

        return childMdFiles
            .map((childFileName) => {
                const childApiPath = path.join(this.childrenContentDir, childFileName);
                return this.getChild(childApiPath);
            });
    }
}
