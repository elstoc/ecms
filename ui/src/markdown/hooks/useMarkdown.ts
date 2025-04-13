import { createContext, useReducer } from 'react';

import { MarkdownPage } from '../api';

type MarkdownState = {
  rootUiPath: string;
  rootApiPath: string;
  pageApiPath: string;
  currentPage?: MarkdownPage;
  editedMarkdown: string;
  singlePage: boolean;
};

type SetStringValue = { key: 'pageApiPath' | 'editedMarkdown'; value: string };
type SetCurrentPageDetails = {
  key: 'currentPageDetails';
  value: { currentPage: MarkdownPage; pageApiPath: string; editedMarkdown: string };
};

type StateActions = SetStringValue | SetCurrentPageDetails;

type MarkdownStateContextProps = {
  state: MarkdownState;
  dispatch: React.Dispatch<StateActions>;
};

const reducer: (state: MarkdownState, action: StateActions) => MarkdownState = (
  state,
  operation,
) => {
  if (operation.key === 'pageApiPath') {
    return { ...state, pageApiPath: operation.value };
  } else if (operation.key === 'editedMarkdown') {
    return { ...state, editedMarkdown: operation.value };
  } else if (operation.key === 'currentPageDetails') {
    return { ...state, ...operation.value };
  }
  return state;
};

export const MarkdownStateContext = createContext({} as MarkdownStateContextProps);

export const useMarkdownReducer: (
  rootUiPath: string,
  rootApiPath: string,
  singlePage: boolean,
) => MarkdownStateContextProps = (rootUiPath, rootApiPath, singlePage) => {
  const initialState = {
    rootUiPath,
    rootApiPath,
    pageApiPath: '',
    singlePage,
    editedMarkdown: '',
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
};
