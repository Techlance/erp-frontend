import React, { createContext, useEffect, useReducer, useState } from "react";
import { useDispatch } from "react-redux";

// reducer - state management
import {
  COMPANIES_INITIALIZE,
  // CREATE_COMPANY,
  DELETE_COMPANY,
  GET_CURRENCY,
  GET_USER_COMPANIES,
  VIEW_COMPANY,
  VIEW_COMPANY_DOCS,
} from "../store/actions";
import companyReducer from "../store/companyReducer";

// project imports
import instance from "../utils/axios";
import Loader from "../ui-component/Loader";
import useAuth from "../hooks/useAuth";
import sendNotification from "../utils/sendNotification";
import { dataToForm } from "../utils";
import { createCompanyAsync } from "../api/company";

// constant
const initialState = {
  companies: [],
  current_company: {
    id: 0,
    company_name: "",
    address: "",
    country: "",
    state: "",
    email: "",
    website: "",
    contact_no: "",
    base_currency: { id: 0 },
    logo: null,
    cr_no: "",
    registration_no: "",
    tax_id_no: "",
    vat_id_no: "",
    year_start_date: "",
    year_end_date: "",
    created_by: "",
  },
  current_company_docs: [],
  currencies: [],
};

export const CompanyContext = createContext({
  ...initialState,
});

export const CompanyProvider = ({ children }) => {
  const globalDispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(companyReducer, initialState);

  const { user } = useAuth();

  const getUserCompanies = async () => {
    try {
      if (user) {
        const response = await instance.get("/company/get-user-company");

        dispatch({
          type: GET_USER_COMPANIES,
          payload: {
            isInitialized: true,
            companies: response.data.data.companies,
          },
        });

        if (!response.data.success) {
          sendNotification({
            globalDispatch,
            success: response.data.success,
            message: response.data.message,
          });
        }
      } else {
        dispatch({
          type: COMPANIES_INITIALIZE,
          payload: {
            isInitialized: true,
            companies: [],
            current_company: {},
          },
        });
      }
    } catch (err) {
      console.error(err);
      dispatch({
        type: COMPANIES_INITIALIZE,
        payload: { ...initialState },
      });
    }
  };

  const getSelectedCompany = async (id) => {
    if (!id) return;

    const response = await instance.get(`/company/view-company/${id}`);

    dispatch({
      type: VIEW_COMPANY,
      payload: response.data.data,
    });
  };

  const createCompany = async (data) => {
    data.base_currency = data.base_currency.id;

    setLoading(true);
    const response = await createCompanyAsync(instance, data);
    setLoading(false);

    sendNotification({
      globalDispatch,
      success: response.success,
      message: response.message,
    });

    getUserCompanies();
  };

  const updateCompany = async (data) => {
    data.base_currency = data.base_currency.id;
    console.log(data);

    const form = dataToForm(data);

    if (data.id === 0) {
      createCompany(data);
    } else {
      const response = await instance.put(
        `/company/edit-company/${data.id}`,
        form
      );

      sendNotification({
        globalDispatch,
        success: response.data.success,
        message: response.data.message,
      });

      getUserCompanies();
      getSelectedCompany(data.id);
    }
  };

  const deleteCompany = async (id) => {
    setLoading(true);
    const response = await instance.delete(`/company/delete-company/${id}`);
    setLoading(false);

    if (response.data.success) {
      dispatch({
        type: DELETE_COMPANY,
        payload: initialState.current_company,
      });

      getUserCompanies();
    }

    sendNotification({
      globalDispatch,
      success: response.data.success,
      message: response.data.message,
    });
  };

  const addCurrency = async (data) => {
    const response = await instance.post("/company/add-currency", data);

    if (response.data.success) {
      getCurrency();
    }

    sendNotification({
      globalDispatch,
      success: response.data.success,
      message: response.data.message,
    });
  };

  const getCurrency = async () => {
    const response = await instance.get("/company/get-currency");

    dispatch({
      type: GET_CURRENCY,
      payload: response.data.data,
    });
  };

  const getSelectedCompanyDocs = async (id) => {
    const response = await instance.get(`/company/get-company-document/${id}`);

    if (response.data.success) {
      dispatch({
        type: VIEW_COMPANY_DOCS,
        payload: response.data.data,
      });
    }
  };

  const createCompanyDoc = async (data) => {
    const form = dataToForm(data);
    const response = await instance.post("/company/add-company-document", form);

    sendNotification({
      globalDispatch,
      success: response.data.success,
      message: response.data.message,
    });

    getSelectedCompanyDocs(state.current_company.id);
  };

  const deleteCompanyDoc = async (id, cid) => {
    const response = await instance.delete(
      `/company/delete-company-document/${id}`
    );

    sendNotification({
      globalDispatch,
      success: response.data.success,
      message: response.data.message,
    });

    getSelectedCompanyDocs(cid);
  };

  useEffect(() => {
    getUserCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  return (
    <CompanyContext.Provider
      value={{
        ...state,
        init: getUserCompanies,
        getSelectedCompany,
        createCompany,
        updateCompany,
        deleteCompany,
        addCurrency,
        getCurrency,
        getSelectedCompanyDocs,
        createCompanyDoc,
        deleteCompanyDoc,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};
