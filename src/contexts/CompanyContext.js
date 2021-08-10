import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// reducer - state management
import { COMPANIES_INITIALIZE } from "../store/actions";

// project imports
import Loader from "../ui-component/Loader";
import useAuth from "../hooks/useAuth";

import {
  createCompanyAsync,
  createCompanyDocAsync,
  deleteCompanyAsync,
  deleteCompanyDocAsync,
  getSelectedCompanyAsync,
  getSelectedCompanyDocsAsync,
  getUserCompaniesAsync,
  updateCompanyAsync,
} from "../api/company";
import { addCurrencyAsync, getCurrencyAsync } from "../api";

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
  const dispatch = useDispatch();
  const state = useSelector((state) => state.company);
  const [loading] = useState(false);

  const { user } = useAuth();

  const getUserCompanies = async () => {
    try {
      if (user) {
        await getUserCompaniesAsync();
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
    await getSelectedCompanyAsync(id);
  };

  const createCompany = async (data) => {
    await createCompanyAsync(data, dispatch);
    await getUserCompaniesAsync();
  };

  const updateCompany = async (data) => {
    if (data.id === 0) {
      await createCompanyAsync(data, dispatch);
    } else {
      await updateCompanyAsync(data, dispatch);
    }

    await getUserCompaniesAsync();
    await getSelectedCompanyAsync(data.id);
  };

  const deleteCompany = async (id) => {
    await deleteCompanyAsync(id, dispatch, initialState.current_company);
  };

  const getCurrency = async () => {
    await getCurrencyAsync(dispatch);
  };

  const addCurrency = async (data) => {
    await addCurrencyAsync(data, dispatch, getCurrency);
  };

  const getSelectedCompanyDocs = async (id) => {
    await getSelectedCompanyDocsAsync(id, dispatch);
  };

  const createCompanyDoc = async (data) => {
    await createCompanyDocAsync(data, dispatch);

    await getSelectedCompanyDocsAsync(state.current_company.id, dispatch);
  };

  const deleteCompanyDoc = async (id, cid) => {
    await deleteCompanyDocAsync(id, dispatch);

    await getSelectedCompanyDocsAsync(cid, dispatch);
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
        ...initialState,
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
