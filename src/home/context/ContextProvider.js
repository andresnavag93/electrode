import React, { createContext, useReducer } from 'react';
import { initialState } from './initialState';
import { CILL } from './types';
const store = createContext(initialState);
const { Provider } = store;
const { SET_FILTERS, RESET_FILTERS } = CILL;
const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    const { type, payload } = action;
    switch (type) {
      case SET_FILTERS:
        return {
          ...state,
          filters: {
            ...initialState.filters,
            ...payload,
          },
        };
      case RESET_FILTERS:
        return {
          ...state,
          filters: {
            ...initialState.filters,
          },
        };
      default:
        return state;
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
export { store, ContextProvider };
