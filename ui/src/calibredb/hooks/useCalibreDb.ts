import { createContext, useCallback, useContext, useReducer, useRef } from 'react';

import { KeyValueOfType } from '@/utils';

export type BookFilters = {
  author?: number;
  format?: number;
  bookPath?: string;
  exactPath?: boolean;
  readStatus?: boolean;
};

type CalibreDbState = {
  apiPath: string;
  title: string;
  pages: number;
  mode: 'browse' | 'search';
  uiFilters: BookFilters;
  apiFilters: BookFilters;
};

type StateAction =
  | { type: 'setPages'; payload: number }
  | { type: 'syncFilters' }
  | { type: 'resetFilters' }
  | { type: 'setUiFilter'; payload: KeyValueOfType<BookFilters> }
  | { type: 'toggleMode' };

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
      pages: 1,
      apiFilters: state.uiFilters,
    };
  }
  if (action.type === 'resetFilters') {
    return {
      ...state,
      pages: 1,
      uiFilters: {
        exactPath: state.mode === 'browse' || undefined,
      },
      apiFilters: {
        exactPath: state.mode === 'browse' || undefined,
      },
    };
  }
  if (action.type === 'toggleMode') {
    const newMode = state.mode === 'browse' ? 'search' : 'browse';
    return {
      ...state,
      mode: newMode,
      pages: 1,
      uiFilters: {
        ...state.uiFilters,
        exactPath: newMode === 'browse',
      },
      apiFilters: {
        ...state.apiFilters,
        exactPath: newMode === 'browse',
      },
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
  const initialState = {
    apiPath,
    title,
    pages: 1,
    uiFilters: { exactPath: true },
    apiFilters: { exactPath: true },
    mode: 'browse',
  } as CalibreDbState;
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
