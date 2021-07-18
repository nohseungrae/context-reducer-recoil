import React, { createContext, useReducer, useContext } from "react";
import { initialState, reducer } from "./reducer";

export const ToDosContext = createContext<any>(null);

const ToDosProvider: React.FC = ({ children }): any => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ToDosContext.Provider value={{ state, dispatch }}>
      {children}
    </ToDosContext.Provider>
  );
};

export const useDispatch = () => {
  const { dispatch } = useContext(ToDosContext);
  return dispatch;
};

export default ToDosProvider;
