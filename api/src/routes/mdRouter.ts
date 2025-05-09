import { NextFunction, Response, Router } from 'express';

import { RequestWithUser } from '@/middleware';
import { Site } from '@/services';

export const createMarkdownRouter = (site: Site): Router => {
  const markdownHandler = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
    fn: string,
  ): Promise<void> => {
    try {
      const path = (req.query.path ?? req.body.path) as string;
      const markdown = await site.getMarkdown(path);
      if (fn === 'tree') {
        const mdNavContents = await markdown.getTree(req.user);
        res.json(mdNavContents);
      } else if (fn === 'getPage') {
        const mdPage = await markdown.getPage(path, req.user);
        res.json(mdPage);
      } else if (fn === 'putPage') {
        await markdown.writePage(path, req.body.fileContents, req.user);
        res.sendStatus(200);
      } else if (fn === 'deletePage') {
        await markdown.deletePage(path, req.user);
        res.sendStatus(200);
      }
    } catch (err: unknown) {
      next?.(err);
    }
  };

  const router = Router();
  router.get('/tree', async (req, res, next) => markdownHandler(req, res, next, 'tree'));
  router.get('/page', async (req, res, next) => markdownHandler(req, res, next, 'getPage'));
  router.put('/page', async (req, res, next) => markdownHandler(req, res, next, 'putPage'));
  router.delete('/page', async (req, res, next) => markdownHandler(req, res, next, 'deletePage'));
  return router;
};
