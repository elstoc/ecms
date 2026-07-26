import { Dispatch, ReactNode, SetStateAction, createContext } from 'react';

import { CalibreDbMetadata } from '@/contracts/site';
import { KeyValueOfType } from '@/utils';

import { BookFilters, CalibreDbState } from '../hooks/useCalibreDb';
import { useCalibreDbState } from '../hooks/useCalibreDbState';

export type CalibreDbProviderValue = {
  state: CalibreDbState;
  toggleMode: () => void;
  updateFilter: (payload: KeyValueOfType<BookFilters>) => void;
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
