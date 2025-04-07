import { createContext, useContext, useReducer } from 'react';

import { getRandomSeed } from '@/utils';

type SetPages = { type: 'setPages'; value: number };
type ResetPages = { type: 'resetPages' };
type SetSortOrder = { type: 'setSortOrder'; value: 'asc' | 'shuffle' };

type StateAction = SetPages | ResetPages | SetSortOrder;

type VideoDbState = {
  apiPath: string;
  title: string;
  pages: number;
  sortOrder?: 'asc' | 'shuffle';
  shuffleSeed?: number;
};

type VideoDbContextProps = {
  state: VideoDbState;
  dispatch: React.Dispatch<StateAction>;
};

const reducer: (state: VideoDbState, action: StateAction) => VideoDbState = (state, action) => {
  if (action.type === 'setPages') {
    return { ...state, pages: action.value };
  } else if (action.type === 'resetPages') {
    return { ...state, pages: 1 };
  } else if (action.type === 'setSortOrder') {
    return {
      ...state,
      pages: action.value === 'shuffle' || action.value !== state.sortOrder ? 1 : state.pages,
      sortOrder: action.value,
      shuffleSeed: action.value === 'shuffle' ? getRandomSeed() : undefined,
    };
  }
  return state;
};

export const VideoDbContext = createContext({} as VideoDbContextProps);

export const useVideoDbReducer = (title: string, apiPath: string) => {
  const initialState: VideoDbState = {
    title,
    apiPath,
    pages: 1,
    sortOrder: 'asc',
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
};

export const useVideoDb = () => useContext(VideoDbContext);
