// Async// actions
import { GET_COMPANY_ACCOUNT_HEADS } from "../../../store/actions";
import { dataToForm } from "../../../utils";

// project imports
import instance from "../../../utils/axios";
import sendNotification from "../../../utils/sendNotification";

export const getCompanyAccountHeadsAsync = async (id, dispatch) => {
  if (!id) return;

  const response = await instance.get(`/company/get-account-head/${id}`);

  dispatch({
    type: GET_COMPANY_ACCOUNT_HEADS,
    payload: response.data.data,
  });
};

export const addCompanyAccountHeadAsync = async (data, dispatch) => {
  delete data.id;
  const response = await instance.post("/company/add-account-head", dataToForm(data));

  sendNotification({
    dispatch,
    response,
  });
};

export const updateCompanyAccountHeadAsync = async (data, dispatch) => {
  const response = await instance.put(
    `/company/edit-account-head/${data.id}`,
    data
  );

  sendNotification({
    dispatch,
    response,
  });
};

export const deleteCompanyAccountHeadAsync = async (id, dispatch) => {
  const response = await instance.delete(`/company/delete-account-head/${id}`);

  sendNotification({
    dispatch,
    response,
  });
};
