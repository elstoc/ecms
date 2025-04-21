import { createContext, useContext, useReducer } from 'react';

type CalibreDbState = {
  apiPath: string;
  title: string;
};

type StateAction = { type: 'setNothing' };

const reducer: (state: CalibreDbState, action: StateAction) => CalibreDbState = (state, action) => {
  if (action.type === 'setNothing') {
    return state;
  }
  return state;
};

type CalibreDbContextProps = {
  state: CalibreDbState;
  dispatch: React.Dispatch<StateAction>;
};

export const CalibreDbContext = createContext({} as CalibreDbContextProps);

export const useCalibreDbReducer = (apiPath: string, title: string) => {
  const initialState = { apiPath, title };
  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
};

export const useCalibreDb = () => useContext(CalibreDbContext);
