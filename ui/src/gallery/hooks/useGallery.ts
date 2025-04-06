import { createContext, useContext, useReducer } from 'react';

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
  if (action.type === 'setPages') {
    return { ...state, pages: action.value };
  } else if (action.type === 'setSortOrder') {
    return {
      ...state,
      pages: 1,
      sortOrder: action.value,
      shuffleSeed: action.value === 'shuffle' ? (Math.random() * 2 ** 32) >>> 0 : undefined,
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
