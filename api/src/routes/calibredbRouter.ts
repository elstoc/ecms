import { NextFunction, Response, Router } from 'express';

import { RequestWithUser } from '@/middleware';
import { Site } from '@/services';

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
      if (fn === 'getBooks') {
        const query = req.query as Record<string, string>;
        const filters = {
          author: query.author ? parseInt(query.author) : undefined,
          format: query.format ? parseInt(query.format) : undefined,
          bookPath: query.bookPath ? parseInt(query.bookPath) : undefined,
          pathPrefix: query.pathPrefix,
        };
        const books = await calibreDb.getBooks(filters, parseInt(query.pages));
        res.json(books);
      }
      if (fn === 'getLookup') {
        const values = await calibreDb.getLookupValues(req.query.table as string);
        res.json(values);
      }
    } catch (err: unknown) {
      next?.(err);
    }
  };

  const router = Router();
  router.get('/books', async (req, res, next) => calibreDbHandler(req, res, next, 'getBooks'));
  router.get('/lookup', async (req, res, next) => calibreDbHandler(req, res, next, 'getLookup'));
  return router;
};
