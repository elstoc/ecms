import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';
import { Logger } from 'winston';

import { EndpointValidator, OASParser } from './api';
import {
  createAddUserInfoMiddleware,
  createErrorHandlerMiddleware,
  createValidateRequestMiddleware,
} from './middleware';
import {
  createAuthRouter,
  createCalibreDbRouter,
  createGalleryRouter,
  createMarkdownRouter,
  createSiteRouter,
  createVideoDbRouter,
} from './routes';
import { Auth, Site } from './services';
import { Config } from './utils';

export const createApp = async (
  config: Config,
  site: Site,
  auth: Auth,
  logger: Logger,
): Promise<express.Express> => {
  const corsConfig = {
    origin: [config.uiUrl],
    credentials: true,
  };

  const oasParser = new OASParser(path.join(__dirname, './api/api.spec.yaml'));
  const endpointValidationSchemas = await oasParser.parseOAS();
  const endpointValidator = new EndpointValidator(endpointValidationSchemas);

  const app = express();

  app.use(cors(corsConfig));
  app.use(express.json());
  app.use(cookieParser());
  app.use(createValidateRequestMiddleware(endpointValidator));
  app.use(createAddUserInfoMiddleware(auth));

  app.use('/auth', createAuthRouter(auth));
  app.use('/site', createSiteRouter(site));
  app.use('/gallery', createGalleryRouter(site));
  app.use('/markdown', createMarkdownRouter(site));
  app.use('/videodb', createVideoDbRouter(site));
  app.use('/calibredb', createCalibreDbRouter(site));

  app.use(createErrorHandlerMiddleware(logger));

  return app;
};
