import { NextFunction, Response, Router } from 'express';

import { ImageSize } from '@/contracts/gallery';
import { RequestWithUser } from '@/middleware';
import { Site } from '@/services';

export const createGalleryRouter = (site: Site): Router => {
  const galleryHandler = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
    fn: string,
  ): Promise<void> => {
    try {
      const { path, size, timestamp, pages, includeFile, sortOrder, shuffleSeed } = req.query;
      const gallery = await site.getGallery(path as string);
      if (fn === 'contents') {
        const pagesInt = pages ? parseInt(pages.toString()) : undefined;
        const images = await gallery.getContents(
          pagesInt,
          includeFile?.toString(),
          sortOrder?.toString(),
          parseInt(shuffleSeed?.toString() ?? '0'),
        );
        res.json(images);
      } else if (fn === 'image') {
        const imageFileBuf = await gallery.getImageFile(
          path as string,
          size as ImageSize,
          timestamp as string,
        );
        res.send(imageFileBuf);
      }
    } catch (err: unknown) {
      next?.(err);
    }
  };

  const router = Router();
  router.get('/contents', async (req, res, next) => galleryHandler(req, res, next, 'contents'));
  router.get('/image', async (req, res, next) => galleryHandler(req, res, next, 'image'));
  return router;
};
