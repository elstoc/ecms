import { createContext, useContext, useReducer } from 'react';

import { getRandomSeed } from '@/utils';

type SortOrder = 'asc' | 'desc' | 'shuffle';

type GalleryState = {
  title: string;
  apiPath: string;
  pages: number;
  initialImage?: string;
  sortOrder: SortOrder;
  shuffleSeed?: number;
};

type ReducerAction =
  | { type: 'setPages'; payload: number }
  | { type: 'setSortOrder'; payload: SortOrder };

const reducer: (state: GalleryState, action: ReducerAction) => GalleryState = (state, action) => {
  const { type, payload } = action;

  if (type === 'setPages') {
    return { ...state, pages: payload };
  } else if (type === 'setSortOrder') {
    return {
      ...state,
      pages: 1,
      sortOrder: payload,
      shuffleSeed: payload === 'shuffle' ? getRandomSeed() : undefined,
    };
  }
  return state;
};

type ContextProps = {
  state: GalleryState;
  dispatch: React.Dispatch<ReducerAction>;
};

export const useGalleryReducer: (initialState: GalleryState) => ContextProps = (initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
};

export const GalleryContext = createContext({} as ContextProps);

export const useGallery = () => useContext(GalleryContext);
