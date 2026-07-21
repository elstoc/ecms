import { ReactNode, createContext, useCallback, useReducer } from 'react';
import { useSearchParams } from 'react-router';

import { CalibreDbMetadata } from '@/contracts/site';
import { KeyValueOfType } from '@/utils';

import { BookFilters, CalibreDbState, StateAction, initialFilters } from '../hooks/useCalibreDb';
import { calibreDbReducer } from '../utils/calibreDbReducer';

type CalibreDbContextProps = {
  state: CalibreDbState;
  dispatch: React.Dispatch<StateAction>;
  updateApiFilter: (payload: KeyValueOfType<BookFilters>) => void;
};

export const CalibreDbContext = createContext({} as CalibreDbContextProps);

type CalibreDbProviderProps = Pick<CalibreDbMetadata, 'title' | 'apiPath'> & {
  children: ReactNode;
};

export const CalibreDbProvider = ({ title, apiPath, children }: CalibreDbProviderProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = useCallback(
    (payload: KeyValueOfType<BookFilters>): void => {
      if (payload.value === undefined) {
        setSearchParams((params) => {
          params.delete(payload.key);
          return params;
        });
      } else {
        setSearchParams((params) => {
          params.set(payload.key, payload.value!.toString());
          return params;
        });
      }
    },
    [setSearchParams],
  );

  const initialState = {
    apiPath,
    title,
    pages: 1,
    apiFilters: { ...initialFilters },
    mode: 'browse',
  } as CalibreDbState;
  const [state, dispatch] = useReducer(calibreDbReducer, initialState);

  const updateApiFilter = useCallback(
    (payload: KeyValueOfType<BookFilters>) => {
      if (payload.key === 'sortOrder') {
        updateSearchParams(payload);
      }

      dispatch({ type: 'setApiFilter', payload });
    },
    [dispatch, updateSearchParams],
  );

  const combinedState = {
    ...state,
    apiFilters: {
      ...state.apiFilters,
      sortOrder: searchParams.get('sortOrder') ?? 'title',
    },
  };

  return (
    <CalibreDbContext value={{ state: combinedState, dispatch, updateApiFilter }}>
      {children}
    </CalibreDbContext>
  );
};
