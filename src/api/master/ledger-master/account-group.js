// Async// actions
import { GET_COMPANY_ACCOUNT_GROUPS, GET_COMPANY_ACCOUNT_GROUP_DETAILS } from "../../../store/actions";
import { dataToForm } from "../../../utils";

// project imports
import instance from "../../../utils/axios";
import sendNotification from "../../../utils/sendNotification";

export const getCompanyAccountGroupsAsync = async (id, dispatch) => {
  if (!id) return;

  const response = await instance.get(`/company/get-account-group/${id}`);

  dispatch({
    type: GET_COMPANY_ACCOUNT_GROUPS,
    payload: response.data.data,
  });
};

export const getCompanyAccountGroupDetailsAsync = async (id, dispatch) => {
  if (!id) return;

  const response = await instance.get(`/company/get-detail-account-group/${id}`);

  dispatch({
    type: GET_COMPANY_ACCOUNT_GROUP_DETAILS,
    payload: response.data.data,
  });
};

export const addCompanyAccountGroupAsync = async (data, dispatch) => {
  delete data.id;
  const response = await instance.post(
    "/company/add-account-group",
    dataToForm(data)
  );

  sendNotification({
    dispatch,
    response,
  });
};

export const updateCompanyAccountGroupAsync = async (data, dispatch) => {
  const response = await instance.put(
    `/company/edit-account-group/${data.id}`,
    dataToForm(data)
  );

  sendNotification({
    dispatch,
    response,
  });
};

export const deleteCompanyAccountGroupAsync = async (id, dispatch) => {
  const response = await instance.delete(`/company/delete-account-group/${id}`);

  sendNotification({
    dispatch,
    response,
  });
};
