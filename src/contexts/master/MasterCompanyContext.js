import React, { createContext, useReducer } from "react";
import {
  // EXIT_COMPANY,
  SELECT_COMPANY,
} from "../../store/actions";

// project imports
import { companyMasterReducer } from "../../store/reducers";
// import Loader from "../../ui-component/Loader";

// constant
const initialState = {
  isInitialized: false,
  company: null,
};

export const MasterCompanyContext = createContext({
  ...initialState,
});

export const MasterCompanyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(companyMasterReducer, initialState);

  const setMasterCompany = (item) => {
    if (item === null) return;

    // setCompanySession(item);
    dispatch({
      type: SELECT_COMPANY,
      payload: item,
    });
  };

  // if (!state.isInitialized) return <Loader />;

  return (
    <MasterCompanyContext.Provider value={{ ...state, setMasterCompany }}>
      {children}
    </MasterCompanyContext.Provider>
  );
};
