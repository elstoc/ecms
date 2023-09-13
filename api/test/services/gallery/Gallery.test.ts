/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Gallery, GalleryImage, ImageSize } from '../../../src/services';

const mockStorage = {
    listContentChildren: jest.fn() as jest.Mock,
    contentFileExists: jest.fn() as jest.Mock,
    getContentFile: jest.fn() as jest.Mock,
    getGeneratedFile: jest.fn() as jest.Mock,
    storeGeneratedFile: jest.fn() as jest.Mock,
    generatedFileIsOlder: jest.fn() as jest.Mock,
    getContentFileModifiedTime: jest.fn() as jest.Mock,
    contentDirectoryExists: jest.fn() as jest.Mock,
    getAdminFile: jest.fn() as jest.Mock,
    storeAdminFile: jest.fn() as jest.Mock,
    getAdminFileModifiedTime: jest.fn() as jest.Mock,
    storeContentFile: jest.fn() as jest.Mock,
};

jest.mock('../../../src/services/gallery/GalleryImage');

const config = { } as any;
const imageFiles = [
    'image12.jpg',
    'image01.jpg',
    'image03.jpg',
    'image02.jpg',
    'image04.jpg',
    'image06.jpg',
    'image05.jpg',
    'image07.jpg',
    'image08.jpg',
    'image09.jpg',
    'image10.jpg',
    'image11.jpg',
    'notimage.txt'
];

const GalleryImageMock = GalleryImage as jest.Mock;

describe('Gallery', () => {
    let gallery: Gallery;
    
    describe('getImages', () => {
        beforeEach(() => {
            gallery = new Gallery('gallery', config, mockStorage);
            mockStorage.listContentChildren.mockImplementation(async (_, fileMatcher) => {
                return imageFiles.filter(fileMatcher);
            });
        });
    
        it('only creates GalleryImage instances for files it has not seen before', async () => {
            await gallery.getImages(3);
            await gallery.getImages(3);
            expect(GalleryImageMock).toBeCalledTimes(3);
            await gallery.getImages(6);
            expect(GalleryImageMock).toBeCalledTimes(6);
            await gallery.getImages(9);
            expect(GalleryImageMock).toBeCalledTimes(9);
        });
    
        it('returns metadata for each file in reverse order (within defined limit), plus total count', async () => {
            GalleryImageMock.mockImplementation((_, inputFilePath) => ({
                getImageData: () => ({ filePath: inputFilePath })
            }));
    
            const expectedReturnData = {
                imageCount: 12,
                images: [
                    { filePath: 'gallery/image12.jpg' },
                    { filePath: 'gallery/image11.jpg' },
                    { filePath: 'gallery/image10.jpg' },
                ]
            };
            const returnData = await gallery.getImages(3);
            expect(returnData).toStrictEqual(expectedReturnData);
        });
    
        it('returns metadata for each file in reverse order (with no limit), plus total count', async () => {
            GalleryImageMock.mockImplementation((_, inputFilePath) => ({
                getImageData: () => ({ filePath: inputFilePath })
            }));
    
            const expectedReturnData = {
                imageCount: 12,
                images: [
                    { filePath: 'gallery/image12.jpg' },
                    { filePath: 'gallery/image11.jpg' },
                    { filePath: 'gallery/image10.jpg' },
                    { filePath: 'gallery/image09.jpg' },
                    { filePath: 'gallery/image08.jpg' },
                    { filePath: 'gallery/image07.jpg' },
                    { filePath: 'gallery/image06.jpg' },
                    { filePath: 'gallery/image05.jpg' },
                    { filePath: 'gallery/image04.jpg' },
                    { filePath: 'gallery/image03.jpg' },
                    { filePath: 'gallery/image02.jpg' },
                    { filePath: 'gallery/image01.jpg' },
                ]
            };
            const returnData = await gallery.getImages();
            expect(returnData).toStrictEqual(expectedReturnData);
        });
    
    });
    
    describe('sendImageFile', () => {
        beforeEach(() => {
            gallery = new Gallery('gallery', config, mockStorage);
        });
    
        it('creates a new image object and calls image.getFile the first time it is called', async () => {
            const getFile = jest.fn();
            GalleryImageMock.mockImplementation(() => ({
                getFile
            }));
    
            await gallery.getImageFile('gallery/image1.jpg', ImageSize.thumb);
    
            expect(GalleryImageMock).toBeCalledTimes(1);
            expect(getFile).toBeCalledWith('thumb');
        });
    
        it('calls image.sendFile on the existing object the second time it is called', async () => {
            const getFile = jest.fn();
            GalleryImageMock.mockImplementation(() => ({
                getFile
            }));
    
            await gallery.getImageFile('gallery/image1.jpg', ImageSize.thumb);
            await gallery.getImageFile('gallery/image1.jpg', ImageSize.fhd);
    
            expect(GalleryImageMock).toBeCalledTimes(1);
            expect(getFile).toBeCalledTimes(2);
            const path1Parms = getFile.mock.calls[0];
            const path2Parms = getFile.mock.calls[1];
            expect(path1Parms).toEqual(['thumb']);
            expect(path2Parms).toEqual(['fhd']);
        });
    });
});
