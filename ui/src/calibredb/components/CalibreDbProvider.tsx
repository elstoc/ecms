import { ReactNode, createContext } from 'react';

import { CalibreDbMetadata } from '@/contracts/site';

import { UseSearchParamMapperReturn, useSearchParamMapper } from '../hooks/useSearchParamMapper';

export const CalibreDbContext = createContext({} as UseSearchParamMapperReturn);

type CalibreDbProviderProps = Pick<CalibreDbMetadata, 'title' | 'apiPath'> & {
  children: ReactNode;
};

export const CalibreDbProvider = ({ title, apiPath, children }: CalibreDbProviderProps) => {
  const { state, toggleMode, updateApiFilter, resetFilters, setPages } = useSearchParamMapper({
    title,
    apiPath,
  });

  return (
    <CalibreDbContext value={{ state, toggleMode, updateApiFilter, resetFilters, setPages }}>
      {children}
    </CalibreDbContext>
  );
};
