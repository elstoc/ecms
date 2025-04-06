import { createContext, useContext, useReducer } from 'react';

import { getRandomSeed } from '@/utils';

const BATCH_SIZE = 40;

type IncreaseLimit = { type: 'increaseLimit'; currentlyLoaded: number };
type ResetLimit = { type: 'resetLimit' };
type SetSortOrder = { type: 'setSortOrder'; value: 'asc' | 'shuffle' };

type StateOperations = IncreaseLimit | ResetLimit | SetSortOrder;

type VideoDbState = {
  apiPath: string;
  title: string;
  limit: number;
  sortOrder?: 'asc' | 'shuffle';
  shuffleSeed?: number;
};

type VideoDbContextProps = {
  state: VideoDbState;
  dispatch: React.Dispatch<StateOperations>;
};

const reducer: (state: VideoDbState, action: StateOperations) => VideoDbState = (state, action) => {
  if (
    action.type === 'increaseLimit' &&
    action.currentlyLoaded + BATCH_SIZE >= state.limit + BATCH_SIZE
  ) {
    return { ...state, limit: state.limit + BATCH_SIZE };
  } else if (action.type === 'resetLimit') {
    return { ...state, limit: BATCH_SIZE };
  } else if (action.type === 'setSortOrder') {
    return {
      ...state,
      sortOrder: action.value,
      shuffleSeed: action.value === 'shuffle' ? getRandomSeed() : undefined,
    };
  }
  return state;
};

export const VideoDbContext = createContext({} as VideoDbContextProps);

export const useVideoDbContext: (title: string, apiPath: string) => VideoDbContextProps = (
  title,
  apiPath,
) => {
  const initialState: VideoDbState = {
    title,
    apiPath,
    limit: BATCH_SIZE,
    sortOrder: 'asc',
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
};

export const useVideoDb = () => useContext(VideoDbContext);
