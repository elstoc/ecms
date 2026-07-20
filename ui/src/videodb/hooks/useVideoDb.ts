import { createContext, use, useCallback, useReducer } from 'react';

import { KeyValueOfType, getRandomSeed } from '@/utils';

type Filters = {
  maxLength?: number;
  minLength?: number;
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
  apiFilters: Filters;
  expandedVideoIds: number[];
  showOnlyExpandedIds: boolean;
};

type StateAction =
  | { type: 'setApiFilter'; payload: KeyValueOfType<Filters> }
  | { type: 'resetFilters' }
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
  if (action.type === 'setApiFilter') {
    const { key, value } = action.payload;
    return {
      ...state,
      apiFilters: {
        ...state.apiFilters,
        [key]: value,
      },
      pages: 1,
    };
  }
  if (action.type === 'resetFilters') {
    return {
      ...state,
      apiFilters: { minResolution: 'HD' },
      pages: 1,
      showOnlyExpandedIds: false,
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
  updateApiFilter: (payload: KeyValueOfType<Filters>) => void;
};

export const VideoDbContext = createContext({} as VideoDbContextProps);

export const useVideoDbReducer = (title: string, apiPath: string) => {
  const initialState: VideoDbState = {
    title,
    apiPath,
    pages: 1,
    sortOrder: 'asc',
    apiFilters: { minResolution: 'HD' },
    expandedVideoIds: [],
    showOnlyExpandedIds: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const updateApiFilter = useCallback(
    (payload: KeyValueOfType<Filters>) => {
      dispatch({ type: 'setApiFilter', payload });
    },
    [dispatch],
  );

  return { state, dispatch, updateApiFilter };
};

export const useVideoDb = () => use(VideoDbContext);
