import { createContext, use, useCallback, useReducer } from 'react';

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
  apiFilters: BookFilters;
};

type StateAction =
  | { type: 'setPages'; payload: number }
  | { type: 'resetFilters' }
  | { type: 'setApiFilter'; payload: KeyValueOfType<BookFilters> }
  | { type: 'toggleMode' };

const initialFilters = {
  exactPath: true,
  sortOrder: 'title',
  devices: ['kobo', 'tablet', 'physical'],
};

const reducer: (state: CalibreDbState, action: StateAction) => CalibreDbState = (state, action) => {
  if (action.type === 'setPages') {
    return { ...state, pages: action.payload };
  }
  if (action.type === 'setApiFilter') {
    const { key, value } = action.payload;
    return {
      ...state,
      pages: 1,
      apiFilters: {
        ...state.apiFilters,
        [key]: value,
        shuffleSeed:
          key === 'sortOrder' && value === 'shuffle'
            ? getRandomSeed()
            : state.apiFilters.shuffleSeed,
      },
    };
  }
  if (action.type === 'resetFilters') {
    return {
      ...state,
      pages: 1,
      mode: 'browse',
      apiFilters: { ...initialFilters },
    };
  }
  if (action.type === 'toggleMode') {
    const newMode = state.mode === 'browse' ? 'search' : 'browse';
    const { devices, bookPath, sortOrder } = state.apiFilters;
    return {
      ...state,
      mode: newMode,
      pages: 1,
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
  updateApiFilter: (payload: KeyValueOfType<BookFilters>) => void;
};

export const CalibreDbContext = createContext({} as CalibreDbContextProps);

export const useCalibreDbReducer = (apiPath: string, title: string) => {
  const initialState = {
    apiPath,
    title,
    pages: 1,
    apiFilters: { ...initialFilters },
    mode: 'browse',
  } as CalibreDbState;
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateApiFilter = useCallback(
    (payload: KeyValueOfType<BookFilters>) => dispatch({ type: 'setApiFilter', payload }),
    [dispatch],
  );
  return { state, dispatch, updateApiFilter };
};

export const useCalibreDb = () => use(CalibreDbContext);
