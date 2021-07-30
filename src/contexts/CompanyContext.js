import React, { createContext, useEffect, useReducer } from "react";
import useAuth from "../hooks/useAuth";
import {
  COMPANIES_INITIALIZE,
  CREATE_COMPANY,
  GET_CURRENCY,
  GET_USER_COMPANIES,
  VIEW_COMPANY,
} from "../store/actions";
import companyReducer from "../store/companyReducer";
import Loader from "../ui-component/Loader";
import axios from "../utils/axios";

// constant
const initialState = {
  isInitialized: false,
  companies: [],
  currentCompany: {
    id: -1,
  },
  currency: [],
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
          const companyResponse = await axios.get("/company/get-user-company");

          dispatch({
            type: GET_USER_COMPANIES,
            payload: {
              isInitialized: true,
              companies: companyResponse.data.data.companies,
            },
          });

          const currencyResponse = await axios.get("/company/get-currency");

          dispatch({
            type: GET_CURRENCY,
            payload: {
              data: currencyResponse.data.data.data,
            },
          });
        } else {
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

  const getSelectedCompany = async (id) => {
    if (!id) return;

    const response = await axios.get(`/company/view-company/${id}`);

    dispatch({
      type: VIEW_COMPANY,
      payload: {
        data: response.data.data.data,
      },
    });

    const currencyResponse = await axios.get("/company/get-currency");

    dispatch({
      type: GET_CURRENCY,
      payload: {
        data: currencyResponse.data.data.data,
      },
    });
  };

  const createCompany = async (data) => {
    await axios.post("/company/create-company", data);

    dispatch({
      type: CREATE_COMPANY,
    });
  };

  const updateCompany = async (id, data) => {
    await axios.put(`/company/edit-company/${id}`, data);
  };

  const deleteCompany = async (id) => {
    await axios.delete(`/company/delete-company/${id}`);
  };

  if (!state.isInitialized) {
    return <Loader />;
  }

  return (
    <CompanyContext.Provider
      value={{
        ...state,
        getSelectedCompany,
        createCompany,
        updateCompany,
        deleteCompany,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};
