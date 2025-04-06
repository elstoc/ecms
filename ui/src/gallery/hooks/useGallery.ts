import { createContext, useContext, useReducer } from 'react';

import { getRandomSeed } from '@/utils';

type GalleryState = {
  title: string;
  apiPath: string;
  pages: number;
  initialImage?: string;
  sortOrder: 'asc' | 'desc' | 'shuffle';
  shuffleSeed?: number;
};

type SortOrder = 'asc' | 'desc' | 'shuffle';
type SetPagesAction = { type: 'setPages'; value: number };
type SetSortOrderAction = { type: 'setSortOrder'; value: SortOrder };
type ReducerAction = SetPagesAction | SetSortOrderAction;

const reducer: (state: GalleryState, action: ReducerAction) => GalleryState = (state, action) => {
  const { type, value } = action;

  if (type === 'setPages') {
    return { ...state, pages: value };
  } else if (type === 'setSortOrder') {
    return {
      ...state,
      pages: 1,
      sortOrder: value,
      shuffleSeed: value === 'shuffle' ? getRandomSeed() : undefined,
    };
  }
  return state;
};

type ContextProps = {
  state: GalleryState;
  dispatch: React.Dispatch<ReducerAction>;
};

export const GalleryContext = createContext({} as ContextProps);

export const useGallery = () => useContext(GalleryContext);

export const useGalleryReducer: (initialState: GalleryState) => ContextProps = (initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
};
