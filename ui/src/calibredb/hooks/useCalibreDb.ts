import { createContext, useContext, useReducer } from 'react';

type CalibreDbState = {
  apiPath: string;
  title: string;
  pages: number;
};

type StateAction = { type: 'setPages'; payload: number };

const reducer: (state: CalibreDbState, action: StateAction) => CalibreDbState = (state, action) => {
  if (action.type === 'setPages') {
    return { ...state, pages: action.payload };
  }
  return state;
};

type CalibreDbContextProps = {
  state: CalibreDbState;
  dispatch: React.Dispatch<StateAction>;
};

export const CalibreDbContext = createContext({} as CalibreDbContextProps);

export const useCalibreDbReducer = (apiPath: string, title: string) => {
  const initialState = { apiPath, title, pages: 1 };
  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
};

export const useCalibreDb = () => useContext(CalibreDbContext);
