import { createContext, useContext, useReducer } from 'react';

import { MarkdownPage } from '../api';

type MarkdownState = {
  rootUiPath: string;
  rootApiPath: string;
  pageApiPath: string;
  currentPage?: MarkdownPage;
  editedMarkdown: string;
  singlePage: boolean;
};

type StateActions =
  | { type: 'setPageApiPath'; payload: string }
  | { type: 'setEditedMarkdown'; payload: string }
  | {
      type: 'setCurrentPageDetails';
      payload: { currentPage: MarkdownPage; pageApiPath: string; editedMarkdown: string };
    };

const reducer: (state: MarkdownState, action: StateActions) => MarkdownState = (state, action) => {
  if (action.type === 'setPageApiPath') {
    return { ...state, pageApiPath: action.payload };
  } else if (action.type === 'setEditedMarkdown') {
    return { ...state, editedMarkdown: action.payload };
  } else if (action.type === 'setCurrentPageDetails') {
    return { ...state, ...action.payload };
  }
  return state;
};

type MarkdownStateContextProps = {
  state: MarkdownState;
  dispatch: React.Dispatch<StateActions>;
};

export const MarkdownContext = createContext({} as MarkdownStateContextProps);

export const useMarkdownReducer = (
  rootUiPath: string,
  rootApiPath: string,
  singlePage: boolean,
) => {
  const [state, dispatch] = useReducer(reducer, {
    rootUiPath,
    rootApiPath,
    singlePage,
    pageApiPath: '',
    editedMarkdown: '',
  });
  return { state, dispatch };
};

export const useMarkdown = () => useContext(MarkdownContext);
