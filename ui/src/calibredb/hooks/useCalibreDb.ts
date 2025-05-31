import { createContext, useCallback, useContext, useReducer, useRef } from 'react';

import { KeyValueOfType, getRandomSeed } from '@/utils';

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

const initialFilters = {
  exactPath: false,
  sortOrder: 'title',
  devices: ['kobo', 'tablet', 'physical'],
};

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
        shuffleSeed:
          key === 'sortOrder' && value === 'shuffle'
            ? getRandomSeed()
            : state.uiFilters.shuffleSeed,
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
      mode: 'search',
      uiFilters: { ...initialFilters },
      apiFilters: { ...initialFilters },
    };
  }
  if (action.type === 'toggleMode') {
    const newMode = state.mode === 'browse' ? 'search' : 'browse';
    const { devices, bookPath, sortOrder } = state.uiFilters;
    return {
      ...state,
      mode: newMode,
      pages: 1,
      uiFilters: {
        ...initialFilters,
        devices,
        bookPath,
        sortOrder,
        exactPath: newMode === 'browse',
      },
      apiFilters: {
        ...initialFilters,
        devices,
        bookPath,
        sortOrder,
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
    uiFilters: { ...initialFilters },
    apiFilters: { ...initialFilters },
    mode: 'search',
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
