import { createContext, useReducer } from 'react';

const BATCH_SIZE = 40;

type IncreaseLimit = { action: 'increaseLimit'; currentlyLoaded: number };
type ResetLimit = { action: 'resetLimit' };
type SetSortOrder = { action: 'setSortOrder'; value: 'asc' | 'shuffle' };

type StateOperations = IncreaseLimit | ResetLimit | SetSortOrder;

type VideoDbState = {
  apiPath: string;
  title: string;
  limit: number;
  sortOrder?: 'asc' | 'shuffle';
  shuffleSeed?: number;
};

type VideoDbStateContextProps = {
  videoDbState: VideoDbState;
  videoDbReducer: React.Dispatch<StateOperations>;
};

const videoDbStateReducer: (state: VideoDbState, operation: StateOperations) => VideoDbState = (
  state,
  operation,
) => {
  if (
    operation.action === 'increaseLimit' &&
    operation.currentlyLoaded + BATCH_SIZE >= state.limit + BATCH_SIZE
  ) {
    return { ...state, limit: state.limit + BATCH_SIZE };
  } else if (operation.action === 'resetLimit') {
    return { ...state, limit: BATCH_SIZE };
  } else if (operation.action === 'setSortOrder') {
    return {
      ...state,
      sortOrder: operation.value,
      shuffleSeed: operation.value === 'shuffle' ? (Math.random() * 2 ** 32) >>> 0 : undefined,
    };
  }
  return state;
};

export const VideoDbStateContext = createContext({} as VideoDbStateContextProps);

export const useVideoDbState: (title: string, apiPath: string) => VideoDbStateContextProps = (
  title,
  apiPath,
) => {
  const initialState: VideoDbState = {
    title,
    apiPath,
    limit: BATCH_SIZE,
    sortOrder: 'asc',
  };
  const [videoDbState, videoDbReducer] = useReducer(videoDbStateReducer, initialState);
  return { videoDbState, videoDbReducer };
};
