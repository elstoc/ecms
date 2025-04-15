import { NextFunction, Response, Router } from 'express';

import { RequestWithUser } from '@/middleware';
import { Site } from '@/services';

export const createVideoDbRouter = (site: Site): Router => {
  const videoDbHandler = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
    fn: string,
  ): Promise<void> => {
    try {
      const path = (req.query.path ?? req.body.path) as string;
      const videoDb = await site.getVideoDb(path);
      if (fn === 'getVersion') {
        const version = await videoDb.getVersion();
        res.json({ version });
      } else if (fn === 'getOmdbKey') {
        res.send(videoDb.getOmdbApiKey(req.user));
      } else if (fn === 'getLookup') {
        const values = await videoDb.getLookupValues(req.query.table as string);
        res.json(values);
      } else if (fn === 'getTags') {
        const tags = await videoDb.getAllTags();
        res.json(tags);
      } else if (fn === 'postVideo') {
        const id = await videoDb.addVideo(req.body.video, req.user);
        res.json({ id });
      } else if (fn === 'putVideo') {
        await videoDb.updateVideo(req.body.video, req.user);
        res.sendStatus(200);
      } else if (fn === 'patchVideo') {
        await videoDb.patchVideo(req.body, req.user);
        res.sendStatus(200);
      } else if (fn === 'getVideo') {
        const video = await videoDb.getVideo(parseInt(req.query.id as string));
        res.json(video);
      } else if (fn === 'deleteVideo') {
        const video = await videoDb.deleteVideo(parseInt(req.query.id as string), req.user);
        res.json(video);
      } else if (fn === 'getVideos') {
        const query = req.query as Record<string, string>;
        const filters = {
          maxLength: parseInt(query.maxLength ?? '0') || undefined,
          categories: query.categories?.split('|'),
          tags: query.tags?.split('|'),
          titleContains: query.titleContains,
          watched: query.watched,
          mediaWatched: query.mediaWatched,
          flaggedOnly: query.flaggedOnly === '1',
          minResolution: query.minResolution,
          sortOrder: query.sortOrder || 'asc',
          shuffleSeed: parseInt(query.shuffleSeed ?? '0'),
        };
        const videos = await videoDb.queryVideos(filters, parseInt(query.pages));
        res.json(videos);
      }
    } catch (err: unknown) {
      next?.(err);
    }
  };

  const router = Router();
  router.get('/version', async (req, res, next) => videoDbHandler(req, res, next, 'getVersion'));
  router.get('/omdb-key', async (req, res, next) => videoDbHandler(req, res, next, 'getOmdbKey'));
  router.get('/lookup', async (req, res, next) => videoDbHandler(req, res, next, 'getLookup'));
  router.get('/tags', async (req, res, next) => videoDbHandler(req, res, next, 'getTags'));
  router.post('/video', async (req, res, next) => videoDbHandler(req, res, next, 'postVideo'));
  router.put('/video', async (req, res, next) => videoDbHandler(req, res, next, 'putVideo'));
  router.patch('/video', async (req, res, next) => videoDbHandler(req, res, next, 'patchVideo'));
  router.get('/video', async (req, res, next) => videoDbHandler(req, res, next, 'getVideo'));
  router.delete('/video', async (req, res, next) => videoDbHandler(req, res, next, 'deleteVideo'));
  router.get('/videos', async (req, res, next) => videoDbHandler(req, res, next, 'getVideos'));
  return router;
};
