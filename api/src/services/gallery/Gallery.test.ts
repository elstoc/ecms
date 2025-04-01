/* eslint-disable  @typescript-eslint/no-explicit-any */
import { ImageSize } from '@/contracts/gallery';

import { Gallery } from './Gallery';
import { GalleryImage } from './GalleryImage';

const mockStorage = {
  listContentChildren: jest.fn() as jest.Mock,
} as any;

const mockLogger = {
  debug: jest.fn(),
  info: jest.fn(),
  error: jest.fn(),
} as any;

jest.mock('./GalleryImage');

const config = { galleryPageSize: 3 } as any;
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
  'notimage.txt',
];

const GalleryImageMock = GalleryImage as jest.Mock;

describe('Gallery', () => {
  let gallery: Gallery;

  describe('getContents', () => {
    beforeEach(() => {
      gallery = new Gallery('gallery', config, mockStorage, mockLogger);
      mockStorage.listContentChildren.mockImplementation(async (_: any, fileMatcher: any) => {
        return imageFiles.filter(fileMatcher as any);
      });
      GalleryImageMock.mockImplementation((_, inputFilePath) => ({
        getImageMetadata: () => ({ filePath: inputFilePath }),
      }));
    });

    it('only creates GalleryImage instances for files it has not seen before', async () => {
      await gallery.getContents(1);
      await gallery.getContents(1);
      expect(GalleryImageMock).toHaveBeenCalledTimes(3);
      await gallery.getContents(2);
      expect(GalleryImageMock).toHaveBeenCalledTimes(6);
      await gallery.getContents(3);
      expect(GalleryImageMock).toHaveBeenCalledTimes(9);
    });

    it('(sort ascending) returns metadata for each file in ascending order (within defined page limit), plus page info', async () => {
      const expectedReturnData = {
        images: [
          { filePath: 'gallery/image01.jpg' },
          { filePath: 'gallery/image02.jpg' },
          { filePath: 'gallery/image03.jpg' },
        ],
        currentPage: 1,
        totalPages: 4,
      };
      const returnData = await gallery.getContents(1, undefined, 'asc');
      expect(returnData).toStrictEqual(expectedReturnData);
    });

    it('(default) returns metadata for each file in descending order (within defined page limit), plus page info', async () => {
      const expectedReturnData = {
        images: [
          { filePath: 'gallery/image12.jpg' },
          { filePath: 'gallery/image11.jpg' },
          { filePath: 'gallery/image10.jpg' },
        ],
        currentPage: 1,
        totalPages: 4,
      };
      const returnData = await gallery.getContents(1);
      expect(returnData).toStrictEqual(expectedReturnData);
    });

    it('(sort desc) returns metadata for each file in descending order (within defined page limit), plus page info', async () => {
      const expectedReturnData = {
        images: [
          { filePath: 'gallery/image12.jpg' },
          { filePath: 'gallery/image11.jpg' },
          { filePath: 'gallery/image10.jpg' },
        ],
        currentPage: 1,
        totalPages: 4,
      };
      const returnData = await gallery.getContents(1, undefined, 'desc');
      expect(returnData).toStrictEqual(expectedReturnData);
    });

    it('(shuffle with no seed) returns metadata for each file in descending order (within defined page limit), plus page info', async () => {
      const expectedReturnData = {
        images: [
          { filePath: 'gallery/image12.jpg' },
          { filePath: 'gallery/image11.jpg' },
          { filePath: 'gallery/image10.jpg' },
        ],
        currentPage: 1,
        totalPages: 4,
      };
      const returnData = await gallery.getContents(1, undefined, 'shuffle');
      expect(returnData).toStrictEqual(expectedReturnData);
    });

    it('(shuffle with fixed seed) returns metadata for each file in shuffled order (within defined page limit), plus page info', async () => {
      const expectedReturnData = {
        images: [
          { filePath: 'gallery/image06.jpg' },
          { filePath: 'gallery/image04.jpg' },
          { filePath: 'gallery/image02.jpg' },
        ],
        currentPage: 1,
        totalPages: 4,
      };
      const returnData = await gallery.getContents(1, undefined, 'shuffle', 12345678);
      expect(returnData).toStrictEqual(expectedReturnData);
    });

    it('returns metadata for each file in reverse order (with too-large page count), plus page info', async () => {
      const expectedReturnData = {
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
        ],
        currentPage: 4,
        totalPages: 4,
      };
      const returnData = await gallery.getContents(99);
      expect(returnData).toStrictEqual(expectedReturnData);
    });

    it('returns more pages if a requested image falls outside of the requested pages', async () => {
      const expectedReturnData = {
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
        ],
        currentPage: 3,
        totalPages: 4,
      };
      const returnData = await gallery.getContents(1, 'image06.jpg');
      expect(returnData).toStrictEqual(expectedReturnData);
    });
  });

  describe('sendImageFile', () => {
    beforeEach(() => {
      gallery = new Gallery('gallery', config, mockStorage, mockLogger);
    });

    it('creates a new image object and calls image.getFile the first time it is called', async () => {
      const getFile = jest.fn();
      GalleryImageMock.mockImplementation(() => ({
        getFile,
      }));

      await gallery.getImageFile('gallery/image1.jpg', ImageSize.thumb, '1234');

      expect(GalleryImageMock).toHaveBeenCalledTimes(1);
      expect(getFile).toHaveBeenCalledWith('thumb', '1234');
    });

    it('calls image.sendFile on the existing object the second time it is called', async () => {
      const getFile = jest.fn();
      GalleryImageMock.mockImplementation(() => ({
        getFile,
      }));

      await gallery.getImageFile('gallery/image1.jpg', ImageSize.thumb, '1234');
      await gallery.getImageFile('gallery/image1.jpg', ImageSize.fhd, '1234');

      expect(GalleryImageMock).toHaveBeenCalledTimes(1);
      expect(getFile).toHaveBeenCalledTimes(2);
      const path1Parms = getFile.mock.calls[0];
      const path2Parms = getFile.mock.calls[1];
      expect(path1Parms).toEqual(['thumb', '1234']);
      expect(path2Parms).toEqual(['fhd', '1234']);
    });
  });
});
