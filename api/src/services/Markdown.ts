import path from 'path';
import fs from 'fs';
import YAML from 'yaml';

import { IMarkdown, MdFileMeta, MdNavContents } from './IMarkdown';
import { SitePaths } from './SitePaths';
import { splitFrontMatter } from '../utils/splitFrontMatter';

export class Markdown implements IMarkdown {
    public constructor (private paths: SitePaths) {}

    /* return the actual file path of a markdown file
       given the Route path in the ui */
    public getMdFilePath(uiPath: string): string {

        let mdFilePath = '';

        const fullUiPath = this.paths.getContentPath(uiPath === '/' ? '' : uiPath);
        
        if (fs.existsSync(fullUiPath)) {
            mdFilePath = path.resolve(fullUiPath, 'index.md');
        } else {
            mdFilePath = `${fullUiPath}.md`;
        }

        return mdFilePath;
    }

    /* return metadata for the given file
       currently just the paths */
    public async getMdFileMeta(uiPath: string): Promise<MdFileMeta> {
        const filePath = this.getMdFilePath(uiPath);

        let yamlTitle;

        if (fs.existsSync(filePath)) {
            const file = fs.readFileSync(filePath, 'utf-8');
            const [yaml] = splitFrontMatter(file);
            yamlTitle = YAML.parse(yaml)?.title;
        }

        const title = yamlTitle || path.basename(uiPath);

        return {
            uiPath: uiPath,
            title
        };
    }

    /* return Nav structure of md child files in a given path
       recurse until all files read */
    private async recurseDir(rootPath: string): Promise<MdNavContents[]> {
        const fullPath = this.paths.getContentPath(rootPath); 

        if (!fs.existsSync(fullPath)) {
            throw new Error(`${fullPath} not found`);
        }

        const children: MdNavContents[] = [];

        const dir = await fs.promises.readdir(fullPath);
        for (const file of dir) {
            const uiPath = `${rootPath}/${file}`.replace('.md','');
            const stats = await fs.promises.stat(path.resolve(fullPath, file));
            if (stats.isDirectory()) {
                const childChildren = await this.recurseDir(uiPath);
                const meta = await this.getMdFileMeta(uiPath);
                children.push({
                    meta,
                    children: childChildren
                });
            } else if (file.endsWith('.md') && !file.endsWith('index.md')) {
                const meta = await this.getMdFileMeta(uiPath);
                children.push({
                    meta
                });
            }
        }

        return children;
    }

    /* return Nav structure of md files in a given path */
    public async getMdNavContents(rootPath: string): Promise<MdNavContents> {

        const children = await this.recurseDir(rootPath);
        const meta = await this.getMdFileMeta(rootPath);

        return {
            meta,
            children
        };
    }
}
