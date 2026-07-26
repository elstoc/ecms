import { Dispatch, ReactNode, SetStateAction, createContext } from 'react';

import { CalibreDbMetadata } from '@/contracts/site';
import { KeyValueOfType } from '@/utils';

import { BookFilters, CalibreDbState } from '../hooks/useCalibreDb';
import { useCalibreDbState } from '../hooks/useCalibreDbState';

export type CalibreDbProviderValue = {
  state: CalibreDbState;
  toggleMode: () => void;
  updateApiFilter: (payload: KeyValueOfType<BookFilters>) => void;
  resetFilters: () => void;
  setPages: Dispatch<SetStateAction<number>>;
};

export const CalibreDbContext = createContext({} as CalibreDbProviderValue);

type CalibreDbProviderProps = Pick<CalibreDbMetadata, 'title' | 'apiPath'> & {
  children: ReactNode;
};

export const CalibreDbProvider = ({ title, apiPath, children }: CalibreDbProviderProps) => {
  const { state, toggleMode, updateApiFilter, resetFilters, setPages } = useCalibreDbState({
    title,
    apiPath,
  });

  return (
    <CalibreDbContext value={{ state, toggleMode, updateApiFilter, resetFilters, setPages }}>
      {children}
    </CalibreDbContext>
  );
};
