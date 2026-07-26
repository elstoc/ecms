import { use } from 'react';

import { CalibreDbContext } from '../components/CalibreDbProvider';

export type BookFilters = {
  titleContains?: string;
  author?: number;
  format?: number;
  bookPath?: string;
  exactPath?: boolean;
  readStatus?: boolean;
  sortOrder: string;
  devices?: string[];
};

export type CalibreDbState = {
  apiPath: string;
  title: string;
  pages: number;
  shuffleSeed?: number;
  mode: 'browse' | 'search';
  apiFilters: BookFilters;
};

export const useCalibreDb = () => use(CalibreDbContext);
