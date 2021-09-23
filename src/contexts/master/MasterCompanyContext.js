import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import {
  // EXIT_COMPANY,
  SELECT_COMPANY,
} from "../../store/actions";

// project imports
// import Loader from "../../ui-component/Loader";

export const MasterCompanyContext = createContext();

export const MasterCompanyProvider = ({ children }) => {
  const dispatch = useDispatch();

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
    <MasterCompanyContext.Provider value={{ setMasterCompany }}>
      {children}
    </MasterCompanyContext.Provider>
  );
};
