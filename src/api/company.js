// actions
import {
  DELETE_COMPANY,
  GET_USER_COMPANIES,
  VIEW_COMPANY,
  VIEW_COMPANY_DOCS,
} from "../store/actions";

// project imports
import { dataToForm } from "../utils";
import instance from "../utils/axios";
import sendNotification from "../utils/sendNotification";

const getUserCompaniesAsync = async (dispatch) => {
  try {
    const response = await instance.get("/company/get-user-company");

    dispatch({
      type: GET_USER_COMPANIES,
      payload: {
        isInitialized: true,
        companies: response.data.data.companies,
      },
    });
  } catch (error) {
    console.log(`Error in Getting User Company: ${error}`);
  }
};

const createCompanyAsync = async (values, onSuccess, dispatch) => {
  try {
    const data = { ...values };
    data.base_currency = data.base_currency.id;
    const response = await instance.post(
      "/company/create-company",
      dataToForm(data)
    );

    sendNotification({
      dispatch,
      response,
    });

    if (response.data.success) {
      onSuccess();
    }
  } catch (error) {
    sendNotification({
      dispatch,
      response: {
        data: {
          success: false,
          message: "Error in Creating Company.",
        },
      },
    });

    console.log(`Error in Creating Company: ${error}`);
  }
};

const updateCompanyAsync = async (data, dispatch) => {
  try {
    data.base_currency = data.base_currency.id;
    const form = dataToForm(data);

    const response = await instance.put(
      `/company/edit-company/${data.id}`,
      form
    );

    sendNotification({
      dispatch,
      response,
    });
  } catch (error) {
    console.log(`Error in Updating Company: ${error}`);

    sendNotification({
      dispatch,
      response: {
        data: {
          success: false,
          message: "Error in Updating Company.",
        },
      },
    });
  }
};

const getSelectedCompanyAsync = async (id, dispatch) => {
  try {
    if (!id) return;

    const response = await instance.get(`/company/view-company/${id}`);

    dispatch({
      type: VIEW_COMPANY,
      payload: response.data.data,
    });
  } catch (error) {
    console.log(`Error in Getting Selected Company: ${error}.`);
  }
};

const deleteCompanyAsync = async (id, dispatch, current_company) => {
  const response = await instance.delete(`/company/delete-company/${id}`);

  if (response.data.success) {
    dispatch({
      type: DELETE_COMPANY,
      payload: current_company,
    });

    await getUserCompaniesAsync();
  }

  sendNotification({
    dispatch,
    response,
  });
};

const getSelectedCompanyDocsAsync = async (id, dispatch) => {
  const response = await instance.get(`/company/get-company-document/${id}`);

  if (response.data.success) {
    dispatch({
      type: VIEW_COMPANY_DOCS,
      payload: response.data.data,
    });
  }
};

const createCompanyDocAsync = async (data, dispatch) => {
  const form = dataToForm(data);
  const response = await instance.post("/company/add-company-document", form);

  sendNotification({
    dispatch,
    response,
  });
};

const deleteCompanyDocAsync = async (id, dispatch) => {
  const response = await instance.delete(
    `/company/delete-company-document/${id}`
  );

  sendNotification({
    dispatch,
    response,
  });
};

export {
  getUserCompaniesAsync,
  getSelectedCompanyAsync,
  createCompanyAsync,
  updateCompanyAsync,
  deleteCompanyAsync,
  getSelectedCompanyDocsAsync,
  createCompanyDocAsync,
  deleteCompanyDocAsync,
};
