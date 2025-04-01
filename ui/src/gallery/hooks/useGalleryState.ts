import { createContext, useReducer } from 'react';

export type GalleryState = {
  title: string;
  apiPath: string;
  pages: number;
  initialImage?: string;
  sortOrder: 'asc' | 'desc' | 'shuffle';
  shuffleSeed?: number;
};

type GalleryStateContextProps = {
  galleryState: GalleryState;
  galleryStateReducer: React.Dispatch<GalleryReducerActions>;
};

type GalleryReducerActions =
  | {
      action: 'setPages';
      value: number;
    }
  | {
      action: 'setSortOrder';
      value: 'asc' | 'desc' | 'shuffle';
    };

const stateReducer: (state: GalleryState, actions: GalleryReducerActions) => GalleryState = (
  state,
  actions,
) => {
  if (actions.action === 'setPages') {
    return { ...state, pages: actions.value };
  } else if (actions.action === 'setSortOrder') {
    return {
      ...state,
      pages: 1,
      sortOrder: actions.value,
      shuffleSeed: actions.value === 'shuffle' ? (Math.random() * 2 ** 32) >>> 0 : undefined,
    };
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
