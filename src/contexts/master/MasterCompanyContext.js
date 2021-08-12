import React, { createContext, useEffect, useReducer } from "react";
import { EXIT_COMPANY, SELECT_COMPANY } from "../../store/actions";

// project imports
import { companyMasterReducer } from "../../store/reducers";
import Loader from "../../ui-component/Loader";

// constant
const initialState = {
  isInitialized: false,
  company: null,
};

export const MasterCompanyContext = createContext({
  ...initialState,
});

const toJSON = (data) => {
  return JSON.parse(data);
};

const toString = (data) => {
  return JSON.stringify(data);
};

const setCompanySession = (company) => {
  if (company) {
    localStorage.setItem("company_master", toString(company));
  } else {
    localStorage.removeItem("company_master");
  }
};

export const MasterCompanyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(companyMasterReducer, initialState);

  useEffect(() => {
    const company = toJSON(window.localStorage.getItem("company_master"));

    console.log(company);

    if (company) {
      setCompanySession(company);
      dispatch({
        type: SELECT_COMPANY,
        payload: { ...company },
      });
    } else {
      setCompanySession();
      dispatch({
        type: EXIT_COMPANY,
        payload: null,
      });
    }
  }, []);

  const setMasterCompany = (item) => {
    console.log(item);
    if (item === null) return;

    setCompanySession(item);
    dispatch({
      type: SELECT_COMPANY,
      payload: item,
    });
  };

  if (!state.isInitialized) return <Loader />;

  return (
    <MasterCompanyContext.Provider value={{ ...state, setMasterCompany }}>
      {children}
    </MasterCompanyContext.Provider>
  );
};
