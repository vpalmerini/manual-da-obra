import * as React from "react";
import { createContext, useReducer } from "react";
import reducer from "./reducer";

interface Context {
  isLoggedIn: boolean;
}

const initialState: Context = {
  isLoggedIn: true,
};

const context = createContext<{
  state: Context;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

const Store: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { Provider } = context;
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { context, Store };
