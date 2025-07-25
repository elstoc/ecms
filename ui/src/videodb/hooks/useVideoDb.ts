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
  hasProgressNotes?: boolean;
  primaryMediaType?: string;
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
  showOnlyExpandedIds: boolean;
};

type StateAction =
  | { type: 'setUiFilter'; payload: KeyValueOfType<Filters> }
  | { type: 'resetFilters' }
  | { type: 'syncFilters' }
  | { type: 'setPages'; payload: number }
  | { type: 'setSortOrder'; payload: 'asc' | 'shuffle' }
  | { type: 'setVideoExpanded'; payload: { videoId: number; expanded: boolean } }
  | { type: 'resetVideoExpanded' }
  | { type: 'toggleShowOnlyExpanded' };

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
      showOnlyExpandedIds: false,
    };
  }
  if (action.type === 'syncFilters') {
    return {
      ...state,
      apiFilters: state.uiFilters,
      pages: 1,
    };
  }
  if (action.type === 'setVideoExpanded') {
    const { expanded, videoId } = action.payload;

    let expandedVideoIds = [...state.expandedVideoIds];
    if (expanded && !expandedVideoIds.includes(videoId)) {
      expandedVideoIds.push(videoId);
    }
    if (!expanded) {
      expandedVideoIds = expandedVideoIds.filter((id) => id !== videoId);
    }

    return {
      ...state,
      expandedVideoIds,
      showOnlyExpandedIds: expandedVideoIds.length === 0 ? false : state.showOnlyExpandedIds,
    };
  }
  if (action.type === 'resetVideoExpanded') {
    return {
      ...state,
      expandedVideoIds: [],
      showOnlyExpandedIds: false,
    };
  }
  if (action.type === 'toggleShowOnlyExpanded') {
    return {
      ...state,
      showOnlyExpandedIds: state.expandedVideoIds.length === 0 ? false : !state.showOnlyExpandedIds,
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
    showOnlyExpandedIds: false,
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
