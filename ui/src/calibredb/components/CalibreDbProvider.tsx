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
  const initialState = {
    apiPath,
    title,
    pages: 1,
    apiFilters: { ...initialFilters },
    mode: 'browse',
  } as CalibreDbState;
  const [state, dispatch] = useReducer(calibreDbReducer, initialState);
  const [searchParams, setSearchParams] = useSearchParams();

  const updateApiFilter = useCallback(
    (payload: KeyValueOfType<BookFilters>) => {
      if (payload.key === 'bookPath') {
        setSearchParams(
          (params) => {
            if (payload.value === undefined) {
              params.delete(payload.key);
            } else {
              params.set(payload.key, payload.value.toString());
            }
            return params;
          },
          { replace: state.mode === 'search' },
        );
      } else {
        dispatch({ type: 'setApiFilter', payload });
      }
    },
    [state, dispatch, setSearchParams],
  );

  const combinedState = {
    ...state,
    apiFilters: {
      ...state.apiFilters,
      bookPath: searchParams.get('bookPath') || undefined,
    },
  };

  return (
    <CalibreDbContext value={{ state: combinedState, dispatch, updateApiFilter }}>
      {children}
    </CalibreDbContext>
  );
};
