/* eslint-disable  @typescript-eslint/no-explicit-any */
import YAML from 'yaml';
import { Gallery } from '../../../src/services/gallery/Gallery';
import { MarkdownRecurse } from '../../../src/services/markdown/MarkdownRecurse';
import { SiteComponent } from '../../../src/services';

jest.mock('yaml');
jest.mock('../../../src/services/gallery/Gallery');
jest.mock('../../../src/services/markdown/MarkdownRecurse');

const config = {
    dataDir: '/path/to/data',
} as any;

const mockStorage = {
    listContentChildren: jest.fn() as jest.Mock,
    contentFileExists: jest.fn() as jest.Mock,
    getContentFile: jest.fn() as jest.Mock,
    getGeneratedFile: jest.fn() as jest.Mock,
    storeGeneratedFile: jest.fn() as jest.Mock,
    generatedFileIsOlder: jest.fn() as jest.Mock,
    getContentFileModifiedTime: jest.fn() as jest.Mock,
    contentDirectoryExists: jest.fn() as jest.Mock,
    splitPath: jest.fn() as jest.Mock
};

const mockGallery = Gallery as jest.Mock;
const mockMarkdown = MarkdownRecurse as jest.Mock;
const contentFileBuf = Buffer.from('content-file');
const yamlParseMock = YAML.parse as jest.Mock;

describe('SiteComponent', () => {
    let component: SiteComponent;

    beforeEach(() => {
        component = new SiteComponent(config, 'my-component', mockStorage);
    });

    describe('getMetadata', () => {
        it('throws if no yaml file is found', async () => {
            mockStorage.contentFileExists.mockReturnValue(false);
            mockStorage.contentDirectoryExists.mockReturnValue(true);

            await expect(component.getMetadata()).rejects
                .toThrow('A yaml file does not exist for the path my-component');
            expect(mockStorage.contentFileExists).toBeCalledWith('my-component.yaml');
        });

        it('throws if no content directory is found', async () => {
            mockStorage.contentFileExists.mockReturnValue(true);
            mockStorage.contentDirectoryExists.mockReturnValue(false);

            await expect(component.getMetadata()).rejects
                .toThrow('A content directory does not exist for the path my-component');
            expect(mockStorage.contentDirectoryExists).toBeCalledWith('my-component');
        });

        it('throws if the type is not markdown or gallery', async () => {
            mockStorage.contentFileExists.mockReturnValue(true);
            mockStorage.contentDirectoryExists.mockReturnValue(true);
            mockStorage.getContentFileModifiedTime.mockReturnValue(1234);
            mockStorage.getContentFile.mockResolvedValue(contentFileBuf);
            yamlParseMock.mockReturnValue({
                uiPath: 'test',
                title: 'The Title',
                type: 'not-markdown-or-gallery'
            });

            await expect(component.getMetadata()).rejects.toThrow('Valid component type not found');
        });

        it('gets metadata by parsing the component file on the first run', async () => {
            mockStorage.contentFileExists.mockReturnValue(true);
            mockStorage.contentDirectoryExists.mockReturnValue(true);
            mockStorage.getContentFileModifiedTime.mockReturnValue(1234);
            mockStorage.getContentFile.mockResolvedValue(contentFileBuf);
            yamlParseMock.mockReturnValue({
                uiPath: 'test',
                title: 'The Title',
                type: 'gallery'
            });

            const actualMetadata = await component.getMetadata();

            const expectedMetadata = {
                uiPath: 'test',
                apiPath: 'my-component',
                title: 'The Title',
                type: 'gallery'
            };
            expect(mockStorage.contentDirectoryExists).toBeCalled();
            expect(mockStorage.contentFileExists).toBeCalled();
            expect(mockStorage.getContentFileModifiedTime).toBeCalledWith('my-component.yaml');
            expect(mockStorage.getContentFile).toBeCalledWith('my-component.yaml');
            expect(yamlParseMock).toBeCalledWith(contentFileBuf.toString('utf-8'));
            expect(expectedMetadata).toStrictEqual(actualMetadata);
        });

        it('gets identical metadata without parsing the component file on the second run (file unchanged)', async () => {
            mockStorage.contentFileExists.mockReturnValue(true);
            mockStorage.contentDirectoryExists.mockReturnValue(true);
            mockStorage.getContentFileModifiedTime.mockReturnValue(1234);
            mockStorage.getContentFile.mockResolvedValue(contentFileBuf);
            yamlParseMock.mockReturnValue({
                uiPath: 'test',
                title: 'The Title',
                type: 'gallery'
            });

            const actualMetadata1 = await component.getMetadata();
            const actualMetadata2 = await component.getMetadata();

            const expectedMetadata = {
                uiPath: 'test',
                apiPath: 'my-component',
                title: 'The Title',
                type: 'gallery'
            };
            expect(mockStorage.contentDirectoryExists).toBeCalledTimes(2);
            expect(mockStorage.contentFileExists).toBeCalledTimes(2);
            expect(mockStorage.getContentFileModifiedTime).toBeCalledTimes(2);
            expect(mockStorage.getContentFile).toBeCalledTimes(1);
            expect(yamlParseMock).toBeCalledTimes(1);
            expect(expectedMetadata).toStrictEqual(actualMetadata1);
            expect(expectedMetadata).toStrictEqual(actualMetadata2);
        });

        it('attempts to re-parse component file if a newer file is present', async () => {
            mockStorage.contentFileExists.mockReturnValue(true);
            mockStorage.contentDirectoryExists.mockReturnValue(true);
            mockStorage.getContentFileModifiedTime
                .mockReturnValueOnce(1234)
                .mockReturnValue(2345);
            mockStorage.getContentFile.mockResolvedValue(contentFileBuf);
            yamlParseMock.mockReturnValueOnce({
                uiPath: 'test',
                title: 'The Title',
                type: 'gallery'
            }).mockReturnValue({
                uiPath: 'test',
                title: 'The New Title',
                type: 'gallery'
            });

            const actualMetadata1 = await component.getMetadata();
            const actualMetadata2 = await component.getMetadata();

            const expectedMetadata1 = {
                uiPath: 'test',
                apiPath: 'my-component',
                title: 'The Title',
                type: 'gallery'
            };
            const expectedMetadata2 = { ...expectedMetadata1, title: 'The New Title' };
            expect(mockStorage.contentDirectoryExists).toBeCalledTimes(2);
            expect(mockStorage.contentFileExists).toBeCalledTimes(2);
            expect(mockStorage.getContentFileModifiedTime).toBeCalledTimes(2);
            expect(mockStorage.getContentFile).toBeCalledTimes(2);
            expect(yamlParseMock).toBeCalledTimes(2);
            expect(expectedMetadata1).toStrictEqual(actualMetadata1);
            expect(expectedMetadata2).toStrictEqual(actualMetadata2);
        });

        it('sets uiPath and title to apiPath if they do not exist', async () => {
            mockStorage.contentFileExists.mockReturnValue(true);
            mockStorage.contentDirectoryExists.mockReturnValue(true);
            mockStorage.getContentFileModifiedTime.mockReturnValue(1234);
            mockStorage.getContentFile.mockResolvedValue(contentFileBuf);
            yamlParseMock.mockReturnValue({
                type: 'gallery'
            });

            const actualMetadata = await component.getMetadata();

            const expectedMetadata = {
                uiPath: 'my-component',
                apiPath: 'my-component',
                title: 'my-component',
                type: 'gallery'
            };
            expect(expectedMetadata).toStrictEqual(actualMetadata);
        });
    });

    describe('getGallery', () => {
        it('throws if no yaml file is found', async () => {
            mockStorage.contentFileExists.mockReturnValue(false);
            mockStorage.contentDirectoryExists.mockReturnValue(true);

            await expect(component.getGallery()).rejects
                .toThrow('A yaml file does not exist for the path my-component');
            expect(mockStorage.contentFileExists).toBeCalledWith('my-component.yaml');
        });

        it('throws if no content directory is found', async () => {
            mockStorage.contentFileExists.mockReturnValue(true);
            mockStorage.contentDirectoryExists.mockReturnValue(false);

            await expect(component.getGallery()).rejects
                .toThrow('A content directory does not exist for the path my-component');
            expect(mockStorage.contentDirectoryExists).toBeCalledWith('my-component');
        });

        it('throws if the type is not markdown or gallery', async () => {
            mockStorage.contentFileExists.mockReturnValue(true);
            mockStorage.contentDirectoryExists.mockReturnValue(true);
            mockStorage.getContentFileModifiedTime.mockReturnValue(1234);
            mockStorage.getContentFile.mockResolvedValue(contentFileBuf);
            yamlParseMock.mockReturnValue({
                type: 'not-gallery-or-markdown'
            });

            await expect(component.getGallery()).rejects.toThrow('Valid component type not found');
        });

        it('returns a Gallery object if this is a gallery component', async () => {
            mockStorage.contentFileExists.mockReturnValue(true);
            mockStorage.contentDirectoryExists.mockReturnValue(true);
            mockStorage.getContentFileModifiedTime.mockReturnValue(1234);
            mockStorage.getContentFile.mockResolvedValue(contentFileBuf);
            yamlParseMock.mockReturnValue({
                type: 'gallery'
            });
            (mockGallery).mockImplementation(() => ({
                name: 'mocked gallery'
            }));

            const galleryComponent = await component.getGallery();

            expect(galleryComponent).toEqual({ name: 'mocked gallery' });
        });

        it('throws an error if this is a markdown component', async () => {
            mockStorage.contentFileExists.mockReturnValue(true);
            mockStorage.contentDirectoryExists.mockReturnValue(true);
            mockStorage.getContentFileModifiedTime.mockReturnValue(1234);
            mockStorage.getContentFile.mockResolvedValue(contentFileBuf);
            yamlParseMock.mockReturnValue({
                type: 'markdown'
            });

            await expect(component.getGallery()).rejects.toThrow('No gallery component found at the path my-component');
        });
    });

    describe('getMarkdown', () => {
        it('throws if no yaml file is found', async () => {
            mockStorage.contentFileExists.mockReturnValue(false);
            mockStorage.contentDirectoryExists.mockReturnValue(true);

            await expect(component.getMarkdown()).rejects
                .toThrow('A yaml file does not exist for the path my-component');
            expect(mockStorage.contentFileExists).toBeCalledWith('my-component.yaml');
        });

        it('throws if no content directory is found', async () => {
            mockStorage.contentFileExists.mockReturnValue(true);
            mockStorage.contentDirectoryExists.mockReturnValue(false);

            await expect(component.getMarkdown()).rejects
                .toThrow('A content directory does not exist for the path my-component');
            expect(mockStorage.contentDirectoryExists).toBeCalledWith('my-component');
        });

        it('throws if the type is not markdown or gallery', async () => {
            mockStorage.contentFileExists.mockReturnValue(true);
            mockStorage.contentDirectoryExists.mockReturnValue(true);
            mockStorage.getContentFileModifiedTime.mockReturnValue(1234);
            mockStorage.getContentFile.mockResolvedValue(contentFileBuf);
            yamlParseMock.mockReturnValue({
                type: 'not-gallery-or-markdown'
            });

            await expect(component.getMarkdown()).rejects.toThrow('Valid component type not found');
        });

        it('returns a Markdown object if this is a markdown component', async () => {
            mockStorage.contentFileExists.mockReturnValue(true);
            mockStorage.contentDirectoryExists.mockReturnValue(true);
            mockStorage.getContentFileModifiedTime.mockReturnValue(1234);
            mockStorage.getContentFile.mockResolvedValue(contentFileBuf);
            yamlParseMock.mockReturnValue({
                type: 'markdown'
            });
            mockMarkdown.mockImplementation(() => ({
                name: 'mocked markdown'
            }));

            const markdownComponent = await component.getMarkdown();

            expect(markdownComponent).toEqual({ name: 'mocked markdown' });
        });

        it('throws an error if this is a gallery component', async () => {
            mockStorage.contentFileExists.mockReturnValue(true);
            mockStorage.contentDirectoryExists.mockReturnValue(true);
            mockStorage.getContentFileModifiedTime.mockReturnValue(1234);
            mockStorage.getContentFile.mockResolvedValue(contentFileBuf);
            yamlParseMock.mockReturnValue({
                type: 'gallery'
            });

            await expect(component.getMarkdown()).rejects.toThrow('No markdown component found at the path my-component');
        });
    });
});
