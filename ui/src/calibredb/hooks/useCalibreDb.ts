import { use } from 'react';

import { CalibreDbContext } from '../components/CalibreDbProvider';

export type CalibreDbState = {
  apiPath: string;
  title: string;
  pages: number;
  shuffleSeed?: number;
  mode: string;
  titleContains?: string;
  author?: number;
  format?: number;
  bookPath?: string;
  readStatus?: boolean;
  sortOrder: string;
  devices?: string[];
};

export const useCalibreDb = () => use(CalibreDbContext);
