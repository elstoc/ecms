import { createContext, useCallback, useContext, useReducer, useRef } from 'react';

import { KeyValue, getRandomSeed } from '@/utils';

const INITIAL_FILTERS = {
  maxLength: null,
  categories: null,
  tags: null,
  titleContains: null,
  watched: '',
  mediaWatched: '',
  minResolution: '',
  flaggedOnly: null,
};

type Filters = {
  maxLength: number | null;
  categories: string | null;
  tags: string | null;
  titleContains: string | null;
  watched: string | null;
  mediaWatched: string | null;
  minResolution: string | null;
  flaggedOnly: 0 | 1 | null;
};

type VideoDbState = {
  apiPath: string;
  title: string;
  pages: number;
  sortOrder?: 'asc' | 'shuffle';
  shuffleSeed?: number;
  uiFilters: Filters;
  apiFilters: Filters;
};

type SetFilterAction = { type: 'setUiFilter'; payload: KeyValue<Filters> };
type ResetFiltersAction = { type: 'resetFilters' };
type SyncFiltersAction = { type: 'syncFilters' };
type SetPagesAction = { type: 'setPages'; payload: number };
type SetSortOrderAction = { type: 'setSortOrder'; payload: 'asc' | 'shuffle' };

type StateAction =
  | SetPagesAction
  | SetSortOrderAction
  | SetFilterAction
  | ResetFiltersAction
  | SyncFiltersAction;

const reducer: (state: VideoDbState, action: StateAction) => VideoDbState = (state, action) => {
  if (action.type === 'setPages') {
    return { ...state, pages: action.payload };
  } else if (action.type === 'setSortOrder') {
    return {
      ...state,
      pages: action.payload === 'shuffle' || action.payload !== state.sortOrder ? 1 : state.pages,
      sortOrder: action.payload,
      shuffleSeed: action.payload === 'shuffle' ? getRandomSeed() : undefined,
    };
  } else if (action.type === 'setUiFilter') {
    const { key, value } = action.payload;
    return {
      ...state,
      uiFilters: {
        ...state.uiFilters,
        [key]: value,
      },
    };
  } else if (action.type === 'resetFilters') {
    return {
      ...state,
      uiFilters: INITIAL_FILTERS,
      apiFilters: INITIAL_FILTERS,
      pages: 1,
    };
  } else if (action.type === 'syncFilters') {
    return {
      ...state,
      apiFilters: state.uiFilters,
      pages: 1,
    };
  }

  return state;
};

type VideoDbContextProps = {
  state: VideoDbState;
  dispatch: React.Dispatch<StateAction>;
  updateUiFilter: (payload: KeyValue<Filters>, debounceTimeout?: number) => void;
};

export const VideoDbContext = createContext({} as VideoDbContextProps);

export const useVideoDbReducer = (title: string, apiPath: string) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialState: VideoDbState = {
    title,
    apiPath,
    pages: 1,
    sortOrder: 'asc',
    uiFilters: INITIAL_FILTERS,
    apiFilters: INITIAL_FILTERS,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateUiFilter = useCallback(
    (payload: KeyValue<Filters>, debounceTimeout?: number) => {
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

export const useVideoDb = () => useContext(VideoDbContext);
