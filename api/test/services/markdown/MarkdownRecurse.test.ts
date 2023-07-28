/* eslint-disable  @typescript-eslint/no-explicit-any */
import fs from 'fs';
import * as fsUtils from '../../../src/utils/site/fs';

import { MarkdownRecurse } from '../../../src/services/markdown/MarkdownRecurse';
import { LocalFileStorageAdapter } from '../../../src/adapters/LocalFileStorageAdapter';

const config = {
    dataDir: '/path/to/data',
} as any;

jest.mock('fs', () => ({
    promises: {
        readFile: jest.fn(),
        readdir: jest.fn()
    }
}));

jest.mock('../../../src/utils/site/fs');

const
    pathIsDirectoryMock = fsUtils.pathIsDirectory as jest.Mock,
    pathIsFileMock = fsUtils.pathIsFile as jest.Mock,
    pathModifiedTimeMock = fsUtils.pathModifiedTime as jest.Mock,
    readFileMock = fs.promises.readFile as jest.Mock,
    readdirMock = fs.promises.readdir as jest.Mock;

const storageAdapter = new LocalFileStorageAdapter('/path/to/data');

describe('MarkdownRecurse', () => {
    describe('constructor', () => {
        it('throws an error for a root path that ends in .md', () => {
            const expectedError = 'Root path must not point to a markdown file';
            expect(() => new MarkdownRecurse('apidir.md', config, storageAdapter, true)).toThrow(expectedError);
        });

        it('throws an error for a root path that is not an existing directory', () => {
            pathIsDirectoryMock.mockReturnValue(false);
            const expectedError = 'Root path must point to an existing directory';
            expect(() => new MarkdownRecurse('apidir', config, storageAdapter, true)).toThrow(expectedError);
        });

        it('throws an error for a root path that does not have a backing file', () => {
            pathIsDirectoryMock.mockImplementation((path) => path.endsWith('apidir'));
            pathIsFileMock.mockReturnValue(false);
            const expectedError = 'The path apidir must be backed by a valid markdown file';
            expect(() => new MarkdownRecurse('apidir', config, storageAdapter, true)).toThrow(expectedError);
        });

        it('succeeds for a root path with an index.md backing file', () => {
            pathIsDirectoryMock.mockImplementation((path) => path.endsWith('apidir'));
            pathIsFileMock.mockImplementation((path) => path.endsWith('index.md'));
            expect(() => new MarkdownRecurse('apidir', config, storageAdapter, true)).not.toThrow();
        });

        it('throws an error for a non-root path with a valid file that does not end in .md', () => {
            pathIsFileMock.mockReturnValue(true);
            const expectedError = 'The path apidir.mdd must be backed by a valid markdown file';
            expect(() => new MarkdownRecurse('apidir.mdd', config, storageAdapter)).toThrow(expectedError);
        });

        it('throws an error for a non-root path that ends in .md but is not a valid file', () => {
            pathIsFileMock.mockReturnValue(false);
            const expectedError = 'The path apidir.md must be backed by a valid markdown file';
            expect(() => new MarkdownRecurse('apidir.md', config, storageAdapter)).toThrow(expectedError);
        });

        it('succeeds for a non-root path that is a valid .md file', () => {
            pathIsFileMock.mockReturnValue(true);
            expect(() => new MarkdownRecurse('apidir.md', config, storageAdapter)).not.toThrow();
        });
    });

    describe('getMetadata', () => {
        beforeEach(() => {
            pathModifiedTimeMock.mockReturnValue(1234);
            readFileMock.mockResolvedValue('---\ntitle: The Title\n---');
        });

        it('(for example) throws an error if the backing file no longer exists', async () => {
            pathIsFileMock.mockReturnValue(true);
            const page = new MarkdownRecurse('path/to/file.md', config, storageAdapter);
            pathIsFileMock.mockReturnValueOnce(false);
            await expect(page.getMetadata()).rejects.toThrow('The path path/to/file.md must be backed by a valid markdown file');
        });

        it('Attempts to parse front matter the first time it is called (check all call params)', async () => {
            pathIsFileMock.mockReturnValue(true);
            const page = new MarkdownRecurse('path/to/file.md', config, storageAdapter);
            const expectedPageMeta = {
                apiPath: 'path/to/file.md',
                title: 'The Title'
            };
            const pageMeta = await page.getMetadata();
            const readFileCallParams = readFileMock.mock.calls[0];
            expect(readFileCallParams).toEqual(['/path/to/data/content/path/to/file.md','utf-8']);
            expect(pageMeta).toStrictEqual(expectedPageMeta);
        });

        it('Does not attempt to parse front matter the second time it is called', async () => {
            pathIsFileMock.mockReturnValue(true);
            const page = new MarkdownRecurse('path/to/file.md', config, storageAdapter);
            const expectedPageMeta = {
                apiPath: 'path/to/file.md',
                title: 'The Title'
            };
            await page.getMetadata();
            const pageMeta = await page.getMetadata();
            expect(readFileMock).toBeCalledTimes(1);
            expect(pageMeta).toStrictEqual(expectedPageMeta);
        });

        it('Attempts to re-parse front matter if file becomes out of date', async () => {
            pathIsFileMock.mockReturnValue(true);

            const page = new MarkdownRecurse('path/to/file.md', config, storageAdapter);
            await page.getMetadata();

            pathIsDirectoryMock.mockReturnValue(false);
            pathModifiedTimeMock.mockReturnValue(9999);
            readFileMock.mockResolvedValue('---\ntitle: The New Title\n---');

            const expectedPageMeta = {
                apiPath: 'path/to/file.md',
                title: 'The New Title'
            };
            const pageMeta = await page.getMetadata();
            expect(readFileMock).toBeCalledTimes(2);
            expect(pageMeta).toStrictEqual(expectedPageMeta);
        });

        it('Sets the title to the file/path name (without extension) if it is not present', async () => {
            pathIsFileMock.mockReturnValue(true);

            const page = new MarkdownRecurse('path/to/file.md', config, storageAdapter);
            readFileMock.mockResolvedValue('');
            const pageMeta = await page.getMetadata();
            const expectedPageMeta = {
                apiPath: 'path/to/file.md',
                title: 'file'
            };
            expect(pageMeta).toStrictEqual(expectedPageMeta);
        });
    });

    describe('sendFile', () => {
        let response: any;

        beforeEach(() => {
            response = {
                sendFile: jest.fn(),
                sendStatus: jest.fn()
            } as any;
            pathIsDirectoryMock.mockImplementation((path) => path.endsWith('Dir'));
        });

        it('(for example) throws an error if the backing file no longer exists', () => {
            pathIsFileMock.mockReturnValue(true);
            const page = new MarkdownRecurse('path/to/file.md', config, storageAdapter);
            pathIsFileMock.mockReturnValueOnce(false);
            expect(() => page.sendFile('path/to/file.md', response)).toThrow('The path path/to/file.md must be backed by a valid markdown file');
        });

        it('sends the index file if called on a root object with the root path', () => {
            pathIsFileMock.mockReturnValue(true);
            const page = new MarkdownRecurse('rootDir', config, storageAdapter, true);
            page.sendFile('rootDir', response);
            expect(response.sendFile).toBeCalledTimes(1);
            expect(response.sendStatus).toBeCalledTimes(0);
            expect(response.sendFile).toBeCalledWith('/path/to/data/content/rootDir/index.md');
        });

        it('sends 404 if the requested file is not the root dir and does not end in .md', () => {
            pathIsFileMock.mockImplementation((path: string) => path.endsWith('somefile') || path.endsWith('index.md'));
            const page = new MarkdownRecurse('rootDir', config, storageAdapter, true);
            page.sendFile('rootDir/somefile', response);
            expect(response.sendFile).toBeCalledTimes(0);
            expect(response.sendStatus).toBeCalledTimes(1);
            expect(response.sendStatus).toBeCalledWith(404);
        });

        it('sends the requested file if it is a direct .md child of the root object', () => {
            pathIsFileMock.mockImplementation((path) => path.endsWith('somefile.md') || path.endsWith('index.md'));
            const page = new MarkdownRecurse('rootDir', config, storageAdapter, true);
            page.sendFile('rootDir/somefile.md', response);
            expect(response.sendStatus).toBeCalledTimes(0);
            expect(response.sendFile).toBeCalledTimes(1);
            expect(response.sendFile).toBeCalledWith('/path/to/data/content/rootDir/somefile.md');
        });

        it('sends the requested file if it is a child-of-a-child of the root object (where all directories are backed by files)', () => {
            pathIsFileMock.mockImplementation((path) => path.endsWith('Dir.md') || path.endsWith('someFile.md') || path.endsWith('index.md'));
            const page = new MarkdownRecurse('rootDir', config, storageAdapter, true);
            page.sendFile('rootDir/someDir/someotherDir/someFile.md', response);
            expect(response.sendStatus).toBeCalledTimes(0);
            expect(response.sendFile).toBeCalledTimes(1);
            expect(response.sendFile).toBeCalledWith('/path/to/data/content/rootDir/someDir/someotherDir/someFile.md');
        });

        it('sends 404 if one of the intermediate directories in the path has no backing file', () => {
            pathIsFileMock.mockImplementation((path) => path.endsWith('fileBackedDir.md') || path.endsWith('someFile.md') || path.endsWith('index.md'));
            const page = new MarkdownRecurse('rootDir', config, storageAdapter, true);
            page.sendFile('rootDir/fileBackedDir/someOtherDir/someFile.md', response);
            expect(response.sendStatus).toBeCalledTimes(1);
            expect(response.sendFile).toBeCalledTimes(0);
            expect(response.sendStatus).toBeCalledWith(404);
        });

        it('sends 404 if the final part of the path is a non-existing markdown file', () => {
            pathIsFileMock.mockImplementation((path) => path.endsWith('Dir.md') || path.endsWith('index.md'));
            const page = new MarkdownRecurse('rootDir', config, storageAdapter, true);
            page.sendFile('rootDir/someDir/someOtherDir/someFile.md', response);
            expect(response.sendStatus).toBeCalledTimes(1);
            expect(response.sendFile).toBeCalledTimes(0);
            expect(response.sendStatus).toBeCalledWith(404);
        });
    });

    describe('getStructure', () => {

        beforeEach(() => {
            pathModifiedTimeMock.mockReturnValue(1234);
        });

        it('returns index file metadata as a single child for a root directory with no (other) children', async () => {
            pathIsFileMock.mockReturnValue(true);
            pathIsDirectoryMock.mockReturnValue(true);
            readdirMock.mockResolvedValue(['index.md']);
            readFileMock.mockResolvedValue('');
            const page = new MarkdownRecurse('rootDir', config, storageAdapter, true);
            const expectedStructure = {
                children: [{ metadata: { title: 'rootDir', apiPath: 'rootDir' } } ]
            };
            const structure = await page.getStructure();
            expect(structure).toStrictEqual(expectedStructure);
        });

        it('returns children (including index) for a root directory with other markdown children', async () => {
            pathIsFileMock.mockImplementation((file) => file.endsWith('.md'));
            pathIsDirectoryMock.mockImplementation((file) => file.endsWith('rootDir'));
            readdirMock.mockResolvedValue(['index.md', 'firstfile.md', 'secondfile.md', 'thirdfile.txt']);
            readFileMock.mockResolvedValue('');
            const page = new MarkdownRecurse('rootDir', config, storageAdapter, true);
            const expectedStructure = {
                children: [
                    { metadata: { title: 'rootDir', apiPath: 'rootDir' } },
                    { metadata: { title: 'firstfile', apiPath: 'rootDir/firstfile.md' } },
                    { metadata: { title: 'secondfile', apiPath: 'rootDir/secondfile.md' } },
                ]
            };
            const structure = await page.getStructure();
            expect(structure).toEqual(expectedStructure);
        });

        it('returns correct data for a complex deep directory structure', async () => {
            pathIsDirectoryMock.mockImplementation((path) => path.endsWith('Dir'));
            pathIsFileMock.mockImplementation((path: string) => (
                path.includes('file') || path.endsWith('/index.md')
                || path.endsWith('SubDir.md') || path.endsWith('firstDir.md')
            ));
            readdirMock.mockImplementation( async (path) => {
                if (path.endsWith('rootDir')) {
                    return ['index.md', 'somefile.txt', 'file1.md', 'file2.md', 'firstDir.md', 'firstDir'];
                } else if (path.endsWith('firstDir')) {
                    return ['emptyDir', 'noMdFileDir', 'firstSubDir', 'firstSubDir.md', 'file3.md', 'file4.md'];
                } else if (path.endsWith('emptyDir')) {
                    return [];
                } else if (path.endsWith('noMdFileDir')) {
                    return ['image1file.jpg', 'textfile.txt', 'noextfile'];
                } else if (path.endsWith('firstSubDir')) {
                    return ['file5.md', 'file6.md', 'secondSubDir.md', 'secondSubDir'];
                } else if (path.endsWith('secondSubDir')) {
                    return ['file7.md', 'file8.md', 'file9.md'];
                }
            });
            readFileMock.mockResolvedValue('');

            const page = new MarkdownRecurse('rootDir', config, storageAdapter, true);
            const expectedStructure = {
                children: [
                    { metadata: { title: 'rootDir', apiPath: 'rootDir' } },
                    { metadata: { title: 'file1', apiPath: 'rootDir/file1.md' } },
                    { metadata: { title: 'file2', apiPath: 'rootDir/file2.md' } },
                    {
                        metadata: { title: 'firstDir', apiPath: 'rootDir/firstDir.md' },
                        children: [
                            { metadata: { title: 'file3', apiPath: 'rootDir/firstDir/file3.md' } },
                            { metadata: { title: 'file4', apiPath: 'rootDir/firstDir/file4.md' } },
                            {
                                metadata: { title: 'firstSubDir', apiPath: 'rootDir/firstDir/firstSubDir.md' },
                                children: [
                                    { metadata: { title: 'file5', apiPath: 'rootDir/firstDir/firstSubDir/file5.md' } },
                                    { metadata: { title: 'file6', apiPath: 'rootDir/firstDir/firstSubDir/file6.md' } },
                                    {
                                        metadata: { title: 'secondSubDir', apiPath: 'rootDir/firstDir/firstSubDir/secondSubDir.md' },
                                        children: [
                                            { metadata: { title: 'file7', apiPath: 'rootDir/firstDir/firstSubDir/secondSubDir/file7.md' } },
                                            { metadata: { title: 'file8', apiPath: 'rootDir/firstDir/firstSubDir/secondSubDir/file8.md' } },
                                            { metadata: { title: 'file9', apiPath: 'rootDir/firstDir/firstSubDir/secondSubDir/file9.md' } },
                                        ]
                                    },
                                ]
                            },
                        ]
                    },
                ]
            };
            const structure = await page.getStructure();
            expect(structure).toEqual(expectedStructure);
        });

        it('orders non-root children by weight (ascending) first and then by title (ascending)', async () => {
            pathIsFileMock.mockImplementation((file) => file.endsWith('.md'));
            pathIsDirectoryMock.mockImplementation((file) => file.endsWith('rootDir'));
            readdirMock.mockResolvedValue(['index.md', 'fileA.md', 'fileB.md', 'fileC.md', 'fileD.md', 'fileE.md', 'fileF.md']);
            readFileMock.mockImplementation((path) => {
                if (path.endsWith('C.md')) return '---\nweight: 10\n---';
                if (path.endsWith('B.md')) return '---\nweight: 20\n---';
                if (path.endsWith('A.md')) return '---\nweight: 30\n---';
                return '';
            });
            const page = new MarkdownRecurse('rootDir.md', config, storageAdapter, false);
            const expectedStructure = {
                metadata: { title: 'rootDir', apiPath: 'rootDir.md' },
                children: [
                    { metadata: { title: 'fileC', apiPath: 'rootDir/fileC.md', weight: 10 } },
                    { metadata: { title: 'fileB', apiPath: 'rootDir/fileB.md', weight: 20 } },
                    { metadata: { title: 'fileA', apiPath: 'rootDir/fileA.md', weight: 30 } },
                    { metadata: { title: 'fileD', apiPath: 'rootDir/fileD.md' } },
                    { metadata: { title: 'fileE', apiPath: 'rootDir/fileE.md' } },
                    { metadata: { title: 'fileF', apiPath: 'rootDir/fileF.md' } },
                    { metadata: { title: 'index', apiPath: 'rootDir/index.md' } },
                ]
            };
            const structure = await page.getStructure();
            expect(structure).toEqual(expectedStructure);
        });

        it('orders root children with index.md first, then by weight (ascending) and then by title (ascending)', async () => {
            pathIsFileMock.mockImplementation((file) => file.endsWith('.md'));
            pathIsDirectoryMock.mockImplementation((file) => file.endsWith('rootDir'));
            readdirMock.mockResolvedValue(['index.md', 'fileA.md', 'fileB.md', 'fileC.md', 'fileD.md', 'fileE.md', 'fileF.md']);
            readFileMock.mockImplementation((path) => {
                if (path.endsWith('C.md')) return '---\nweight: 10\n---';
                if (path.endsWith('B.md')) return '---\nweight: 20\n---';
                if (path.endsWith('A.md')) return '---\nweight: 30\n---';
                return '';
            });
            const page = new MarkdownRecurse('rootDir', config, storageAdapter, true);
            const expectedStructure = {
                children: [
                    { metadata: { title: 'rootDir', apiPath: 'rootDir' } },
                    { metadata: { title: 'fileC', apiPath: 'rootDir/fileC.md', weight: 10 } },
                    { metadata: { title: 'fileB', apiPath: 'rootDir/fileB.md', weight: 20 } },
                    { metadata: { title: 'fileA', apiPath: 'rootDir/fileA.md', weight: 30 } },
                    { metadata: { title: 'fileD', apiPath: 'rootDir/fileD.md' } },
                    { metadata: { title: 'fileE', apiPath: 'rootDir/fileE.md' } },
                    { metadata: { title: 'fileF', apiPath: 'rootDir/fileF.md' } },
                ]
            };
            const structure = await page.getStructure();
            expect(structure).toEqual(expectedStructure);
        });
    });
});
