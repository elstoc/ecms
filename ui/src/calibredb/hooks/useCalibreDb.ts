import { createContext, useCallback, useContext, useReducer, useRef } from 'react';

import { KeyValueOfType } from '@/utils';

export type BookFilters = {
  author?: number;
  format?: number;
};

type CalibreDbState = {
  apiPath: string;
  title: string;
  pages: number;
  uiFilters: BookFilters;
  apiFilters: BookFilters;
};

type StateAction =
  | { type: 'setPages'; payload: number }
  | { type: 'syncFilters' }
  | { type: 'setUiFilter'; payload: KeyValueOfType<BookFilters> };

const reducer: (state: CalibreDbState, action: StateAction) => CalibreDbState = (state, action) => {
  if (action.type === 'setPages') {
    return { ...state, pages: action.payload };
  }
  if (action.type === 'setUiFilter') {
    const { key, value } = action.payload;
    return {
      ...state,
      uiFilters: {
        ...state.uiFilters,
        [key]: value,
      },
    };
  }
  if (action.type === 'syncFilters') {
    return {
      ...state,
      apiFilters: state.uiFilters,
    };
  }
  return state;
};

type CalibreDbContextProps = {
  state: CalibreDbState;
  dispatch: React.Dispatch<StateAction>;
  updateUiFilter: (payload: KeyValueOfType<BookFilters>, debounceTimeout?: number) => void;
};

export const CalibreDbContext = createContext({} as CalibreDbContextProps);

export const useCalibreDbReducer = (apiPath: string, title: string) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialState = { apiPath, title, pages: 1, uiFilters: {}, apiFilters: {} };
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateUiFilter = useCallback(
    (payload: KeyValueOfType<BookFilters>, debounceTimeout?: number) => {
      dispatch({ type: 'setUiFilter', payload });

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      timeoutRef.current = setTimeout(() => {
        dispatch({ type: 'syncFilters' });
      }, debounceTimeout ?? 0);
    },
    [dispatch],
  );
  return { state, dispatch, updateUiFilter };
};

export const useCalibreDb = () => useContext(CalibreDbContext);
