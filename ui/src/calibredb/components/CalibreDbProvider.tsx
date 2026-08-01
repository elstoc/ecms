import { Dispatch, ReactNode, SetStateAction, createContext } from 'react';

import { CalibreDbMetadata } from '@/contracts/site';
import { KeyValueOfType } from '@/utils';

import { useCalibreDbState } from '../hooks/useCalibreDbState';
import { SearchParamState } from '../utils/searchParamStateMapper';

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

export type CalibreDbProviderValue = {
  state: CalibreDbState;
  toggleMode: () => void;
  updateFilter: (payload: KeyValueOfType<SearchParamState>) => void;
  resetFilters: () => void;
  setPages: Dispatch<SetStateAction<number>>;
  apiQueryParams: Record<string, string | number | undefined>;
};

export const CalibreDbContext = createContext({} as CalibreDbProviderValue);

type CalibreDbProviderProps = Pick<CalibreDbMetadata, 'title' | 'apiPath'> & {
  children: ReactNode;
};

export const CalibreDbProvider = ({ title, apiPath, children }: CalibreDbProviderProps) => {
  const value = useCalibreDbState({
    title,
    apiPath,
  });

  return <CalibreDbContext value={value}>{children}</CalibreDbContext>;
};
