import { NextFunction, Response, Router } from 'express';

import { RequestWithUser } from '@/middleware';
import { Site } from '@/services';
import { Devices } from '@/services/calibredb/CalibreDb';

export const createCalibreDbRouter = (site: Site): Router => {
  const calibreDbHandler = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
    fn: string,
  ): Promise<void> => {
    try {
      const path = (req.query.path ?? req.body.path) as string;
      const calibreDb = await site.getCalibreDb(path);
      const query = req.query as Record<string, string>;
      if (fn === 'getBooks') {
        const filters = {
          titleContains: query.titleContains,
          author: query.author ? parseInt(query.author) : undefined,
          format: query.format ? parseInt(query.format) : undefined,
          bookPath: query.bookPath,
          exactPath: query.exactPath === '1',
          readStatus: query.readStatus == null ? undefined : query.readStatus === '1',
          sortOrder: query.sortOrder || 'title',
          shuffleSeed: parseInt(query.shuffleSeed ?? '0'),
          devices: query.devices ? (query.devices.split('|') as Devices[]) : undefined,
        };
        const books = await calibreDb.getBooks(filters, parseInt(query.pages || '1'));
        res.json(books);
      }
      if (fn === 'getLookup') {
        const values = await calibreDb.getLookupValues(req.query.table as string);
        res.json(values);
      }
      if (fn === 'getCover') {
        const id = parseInt((req.query.id as string) ?? '0');
        const coverFileBuf = await calibreDb.getCoverImage(id);
        res.send(coverFileBuf);
      }
      if (fn === 'getPaths') {
        const paths = await calibreDb.getPaths(
          query.devices ? (query.devices.split('|') as Devices[]) : undefined,
        );
        res.json(paths);
      }
    } catch (err: unknown) {
      next?.(err);
    }
  };

  const router = Router();
  router.get('/books', async (req, res, next) => calibreDbHandler(req, res, next, 'getBooks'));
  router.get('/book-paths', async (req, res, next) => calibreDbHandler(req, res, next, 'getPaths'));
  router.get('/lookup', async (req, res, next) => calibreDbHandler(req, res, next, 'getLookup'));
  router.get('/cover', async (req, res, next) => calibreDbHandler(req, res, next, 'getCover'));
  return router;
};
