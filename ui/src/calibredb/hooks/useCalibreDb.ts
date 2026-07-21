import { use } from 'react';

import { KeyValueOfType } from '@/utils';

import { CalibreDbContext } from '../components/CalibreDbProvider';

export type BookFilters = {
  titleContains?: string;
  author?: number;
  format?: number;
  bookPath?: string;
  exactPath?: boolean;
  readStatus?: boolean;
  sortOrder: string;
  shuffleSeed?: number;
  devices?: string[];
};

export type CalibreDbState = {
  apiPath: string;
  title: string;
  pages: number;
  mode: 'browse' | 'search';
  apiFilters: BookFilters;
};

export type StateAction =
  | { type: 'setPages'; payload: number }
  | { type: 'resetFilters' }
  | { type: 'setApiFilter'; payload: KeyValueOfType<BookFilters> }
  | { type: 'toggleMode' };

export const initialFilters = {
  exactPath: true,
  sortOrder: 'title',
  devices: ['kobo', 'tablet', 'physical'],
};

export const useCalibreDb = () => use(CalibreDbContext);
