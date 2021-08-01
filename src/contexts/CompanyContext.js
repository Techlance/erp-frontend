import React, { createContext, useEffect, useReducer } from "react";
import useAuth from "../hooks/useAuth";
import {
  COMPANIES_INITIALIZE,
  CREATE_COMPANY,
  DELETE_COMPANY,
  GET_CURRENCY,
  GET_USER_COMPANIES,
  UPDATE_FORM,
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
    company_name: "",
    address: "",
    country: "",
    state: "",
    email: "",
    website: "",
    contact_no: "",
    base_currency: 2,
    cr_no: "",
    registration_no: "",
    tax_id_no: "",
    vat_id_no: "",
    year_start_date: "",
    year_end_date: "",
    created_by: "",
  },
  currency: [],
};

export const CompanyContext = createContext({
  ...initialState,
});

export const CompanyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(companyReducer, initialState);

  const { user } = useAuth();

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

  const getSelectedCompany = async (id) => {
    if (!id) {
      dispatch({
        type: VIEW_COMPANY,
        payload: {
          data: initialState.currentCompany,
        },
      });
    } else {
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
    }
  };

  const createCompany = async (data) => {
    await axios.post("/company/create-company", data);

    dispatch({
      type: CREATE_COMPANY,
    });
  };

  const updateCompany = async (id, data) => {
    // data.base_currency = data.base_currency.id
    data.created_by = "chirayu";
    // console.log(data)
    if (data.id === -1) {
      createCompany(data);
    } else {
      delete data["logo"];
      console.log(data);
      await axios.put(`/company/edit-company/${id}`, data);
    }
  };

  const deleteCompany = async (id) => {
    const response = await axios.delete(`/company/delete-company/${id}`);

    if (response.data.success === true) {
      dispatch({
        type: DELETE_COMPANY,
        payload: {
          data: initialState.currentCompany,
        },
      });
    }
  };

  const updateForm = async (data) => {
    console.log(data);
    dispatch({
      type: UPDATE_FORM,
      payload: {
        data: data,
      },
    });
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!state.isInitialized) {
    return <Loader />;
  }

  return (
    <CompanyContext.Provider
      value={{
        ...state,
        init,
        getSelectedCompany,
        createCompany,
        updateCompany,
        deleteCompany,
        updateForm,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};
