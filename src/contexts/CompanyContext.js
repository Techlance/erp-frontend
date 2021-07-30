import React, { createContext, useEffect, useReducer } from "react";
import useAuth from "../hooks/useAuth";
import { COMPANIES_INITIALIZE, GET_USER_COMPANIES } from "../store/actions";
import companyReducer from "../store/companyReducer";
import Loader from "../ui-component/Loader";
import axios from "../utils/axios";

// constant
const initialState = {
  isInitialized: false,
  companies: [],
  currentCompany: {},
};

export const CompanyContext = createContext({
  ...initialState,
});

export const CompanyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(companyReducer, initialState);

  const { user } = useAuth();

  useEffect(() => {
    const init = async () => {
      try {
        if (user) {
          const response = await axios.get("/company/get-user-company");

          console.log(response.data);

          dispatch({
            type: GET_USER_COMPANIES,
            payload: {
              isInitialized: true,
              companies: response.data.data.companies,
            },
          });
        } else {
          console.log("USER NOT PRESENT");
          dispatch({
            type: COMPANIES_INITIALIZE,
            payload: {
              isInitialized: true,
              companies: [],
              currentCompany: {},
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: COMPANIES_INITIALIZE,
          payload: {
            isInitialized: false,
            companies: [],
            currentCompany: {},
          },
        });
      }
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!state.isInitialized) {
    return <Loader />;
  }

  return (
    <CompanyContext.Provider value={{ ...state }}>
      {children}
    </CompanyContext.Provider>
  );
};
