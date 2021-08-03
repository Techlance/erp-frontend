import React, { createContext, useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";

// reducer - state management
import {
  COMPANIES_INITIALIZE,
  CREATE_COMPANY,
  DELETE_COMPANY,
  GET_USER_COMPANIES,
  UPDATE_FORM,
  VIEW_COMPANY,
} from "../store/actions";
import companyReducer from "../store/companyReducer";

// project imports
import axios from "../utils/axios";
import Loader from "../ui-component/Loader";
import useAuth from "../hooks/useAuth";
import sendNotification from "../utils/sendNotification";

// constant
const initialState = {
  isInitialized: false,
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
    cr_no: "",
    registration_no: "",
    tax_id_no: "",
    vat_id_no: "",
    year_start_date: "",
    year_end_date: "",
    created_by: "",
  },
};

export const CompanyContext = createContext({
  ...initialState,
});

export const CompanyProvider = ({ children }) => {
  const globalDispatch = useDispatch();
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
        payload: {
          isInitialized: false,
          companies: [],
          current_company: {},
        },
      });
    }
  };

  const getSelectedCompany = async (id) => {
    if (!id) {
      dispatch({
        type: VIEW_COMPANY,
        payload: initialState.current_company,
      });
    } else {
      const response = await axios.get(`/company/view-company/${id}`);

      dispatch({
        type: VIEW_COMPANY,
        payload: response.data.data,
      });
    }
  };

  const createCompany = async (data) => {
    const response = await axios.post("/company/create-company", data);

    dispatch({
      type: CREATE_COMPANY,
    });

    sendNotification({
      globalDispatch,
      success: response.data.success,
      message: response.data.message,
    });
  };

  const updateCompany = async (id, data) => {
    // data.base_currency = data.base_currency.id
    data.created_by = "chirayu";
    // console.log(data)
    if (id === 0) {
      createCompany(data);
    } else {
      delete data["logo"];
      console.log(data);
      const response = await axios.put(`/company/edit-company/${id}`, data);

      sendNotification({
        globalDispatch,
        success: response.data.success,
        message: response.data.message,
      });
    }
  };

  const deleteCompany = async (id) => {
    const response = await axios.delete(`/company/delete-company/${id}`);

    if (response.data.success) {
      dispatch({
        type: DELETE_COMPANY,
        payload: {
          data: initialState.currentCompany,
        },
      });
    }

    sendNotification({
      globalDispatch,
      success: response.data.success,
      message: response.data.message,
    });
  };

  const updateForm = async (data) => {
    dispatch({
      type: UPDATE_FORM,
      payload: {
        data: data,
      },
    });
  };

  const addCurrency = async (data, next) => {
    const response = await axios.post("/company/add-currency", data);

    sendNotification({
      globalDispatch,
      success: response.data.success,
      message: response.data.message,
    });

    next();
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
        addCurrency,
        updateForm,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};
