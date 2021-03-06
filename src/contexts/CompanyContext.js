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

import {
  addCurrencyAsync,
  deleteCurrencyAsync,
  getCurrencyAsync,
  updateCurrencyAsync,
} from "../api";

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

export const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.company);
  const [loading] = useState(false);

  const { user } = useAuth();

  const getUserCompanies = async () => {
    try {
      if (user) {
        await getUserCompaniesAsync(dispatch);
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
      });
    }
  };

  const getSelectedCompany = async (id) => {
    await getSelectedCompanyAsync(id, dispatch);
  };

  const createCompany = async (data, onSuccess) => {
    await createCompanyAsync(data, onSuccess, dispatch);

    await getUserCompaniesAsync(dispatch);
  };

  const updateCompany = async (data) => {
    if (data.id === 0) {
      await createCompanyAsync(data, dispatch);
    } else {
      await updateCompanyAsync(data, dispatch);
    }

    await getUserCompaniesAsync(dispatch);
    await getSelectedCompanyAsync(data.id, dispatch);
  };

  const deleteCompany = async (id) => {
    await deleteCompanyAsync(id, dispatch, initialState.current_company);
  };

  const getCurrency = async () => {
    await getCurrencyAsync(dispatch);
  };

  const addCurrency = async (data, onSuccess) => {
    await addCurrencyAsync(data, onSuccess, dispatch);

    await getCurrencyAsync(dispatch);
  };

  const updateCurrency = async (data) => {
    await updateCurrencyAsync(data, dispatch);

    await getCurrencyAsync(dispatch);
  };

  const deleteCurrency = async (id) => {
    await deleteCurrencyAsync(id, dispatch);

    await getCurrencyAsync(dispatch);
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
        getUserCompanies,
        getSelectedCompany,
        createCompany,
        updateCompany,
        deleteCompany,
        addCurrency,
        updateCurrency,
        deleteCurrency,
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
