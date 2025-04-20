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
        const books = await calibreDb.getBooks();
        res.json(books);
      }
    } catch (err: unknown) {
      next?.(err);
    }
  };

  const router = Router();
  router.get('/books', async (req, res, next) => calibreDbHandler(req, res, next, 'getBooks'));
  return router;
};
