import { createContext, useCallback, useContext, useReducer, useRef } from 'react';

import { KeyValueOfType, getRandomSeed } from '@/utils';

type Filters = {
  maxLength?: number;
  categories?: string;
  tags?: string[];
  titleContains?: string;
  watched?: string;
  mediaWatched?: string;
  minResolution?: string;
  flaggedOnly?: boolean;
};

type VideoDbState = {
  apiPath: string;
  title: string;
  pages: number;
  sortOrder?: 'asc' | 'shuffle';
  shuffleSeed?: number;
  uiFilters: Filters;
  apiFilters: Filters;
  expandedVideoIds: number[];
};

type StateAction =
  | { type: 'setUiFilter'; payload: KeyValueOfType<Filters> }
  | { type: 'resetFilters' }
  | { type: 'syncFilters' }
  | { type: 'setPages'; payload: number }
  | { type: 'setSortOrder'; payload: 'asc' | 'shuffle' }
  | { type: 'toggleVideoExpanded'; payload: number };

const reducer: (state: VideoDbState, action: StateAction) => VideoDbState = (state, action) => {
  if (action.type === 'setPages') {
    return { ...state, pages: action.payload };
  }
  if (action.type === 'setSortOrder') {
    return {
      ...state,
      pages: action.payload === 'shuffle' || action.payload !== state.sortOrder ? 1 : state.pages,
      sortOrder: action.payload,
      shuffleSeed: action.payload === 'shuffle' ? getRandomSeed() : undefined,
    };
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
  if (action.type === 'resetFilters') {
    return {
      ...state,
      uiFilters: {},
      apiFilters: {},
      pages: 1,
    };
  }
  if (action.type === 'syncFilters') {
    return {
      ...state,
      apiFilters: state.uiFilters,
      pages: 1,
    };
  }
  if (action.type === 'toggleVideoExpanded') {
    const expandedVideoIds = state.expandedVideoIds;
    if (expandedVideoIds.includes(action.payload)) {
      expandedVideoIds.filter((videoId) => videoId !== action.payload);
    } else {
      expandedVideoIds.push(action.payload);
    }
    return {
      ...state,
      expandedVideoIds,
    };
  }
  return state;
};

type VideoDbContextProps = {
  state: VideoDbState;
  dispatch: React.Dispatch<StateAction>;
  updateUiFilter: (payload: KeyValueOfType<Filters>, debounceTimeout?: number) => void;
};

export const VideoDbContext = createContext({} as VideoDbContextProps);

export const useVideoDbReducer = (title: string, apiPath: string) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const initialState: VideoDbState = {
    title,
    apiPath,
    pages: 1,
    sortOrder: 'asc',
    uiFilters: {},
    apiFilters: {},
    expandedVideoIds: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const updateUiFilter = useCallback(
    (payload: KeyValueOfType<Filters>, debounceTimeout?: number) => {
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
