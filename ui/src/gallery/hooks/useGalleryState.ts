import { createContext, useReducer } from 'react';

export type GalleryState = {
  title: string;
  apiPath: string;
  pages: number;
  initialImage?: string;
};

type GalleryStateContextProps = {
  galleryState: GalleryState;
  galleryStateReducer: React.Dispatch<GalleryReducerActions>;
};

type GalleryReducerActions = {
  action: 'setPages';
  value: number;
};

const stateReducer: (state: GalleryState, actions: GalleryReducerActions) => GalleryState = (
  state,
  actions,
) => {
  if (actions.action === 'setPages') {
    return { ...state, pages: actions.value };
  }
  return state;
};

export const GalleryStateContext = createContext<GalleryStateContextProps>(
  {} as GalleryStateContextProps,
);

export const useGalleryStateReducer: (initialState: GalleryState) => GalleryStateContextProps = (
  initialState,
) => {
  const [galleryState, galleryStateReducer] = useReducer(stateReducer, initialState);
  return { galleryState, galleryStateReducer };
};
