// Async// actions
import {
  GET_LC,
  GET_COST_CENTER,
  GET_LC_DOCS,
  GET_PARTY_CODE_PAY,
  GET_PARTY_CODE_RECEIVE,
  GET_BANK_AC,
  GET_DETAIL_LC,
  GET_LC_AMEND,
} from "../../../store/actions";
import { dataToForm } from "../../../utils";

// project imports
import instance from "../../../utils/axios";
import sendNotification from "../../../utils/sendNotification";

export const getLCAsync = async (id, dispatch) => {
  if (!id) {
    return;
  }
  const response = await instance.get(`/lc/get-lc/${id}`);

  console.log(response.data.data);
  dispatch({
    type: GET_LC,
    payload: response.data.data,
  });
};

export const getLCDetailAsync = async (id, dispatch) => {
  if (!id) {
    return;
  }
  const response = await instance.get(`/lc/get-detail-lc/${id}`);

  console.log(response.data.data);
  dispatch({
    type: GET_DETAIL_LC,
    payload: response.data.data,
  });
};

export const getCostCenterAsync = async (id, dispatch) => {
  if (!id) {
    return;
  }
  const response = await instance.get(`/company/get-cost-center/${id}`);

  console.log(response.data.data);
  dispatch({
    type: GET_COST_CENTER,
    payload: response.data.data,
  });
};

export const getPartyCodePayAsync = async (id, dispatch) => {
  if (!id) {
    return;
  }
  const response = await instance.get(`/company/get-ledger-payables/${id}`);

  console.log(response.data.data);
  dispatch({
    type: GET_PARTY_CODE_PAY,
    payload: response.data.data,
  });
};

export const getPartyCodeReceiveAsync = async (id, dispatch) => {
  if (!id) {
    return;
  }
  const response = await instance.get(`/company/get-ledger-receivables/${id}`);

  console.log(response.data.data);
  dispatch({
    type: GET_PARTY_CODE_RECEIVE,
    payload: response.data.data,
  });
};

export const getBankAcAsync = async (id, dispatch) => {
  if (!id) {
    return;
  }
  const response = await instance.get(`/company/get-ledger-cash-bank/${id}`);

  console.log(response.data.data);
  dispatch({
    type: GET_BANK_AC,
    payload: response.data.data,
  });
};

export const addLCAsync = async (data, dispatch) => {
  delete data.id;
  const form = dataToForm(data);
  const response = await instance.post("/lc/add-lc", form);

  sendNotification({
    dispatch,
    response,
  });
};

export const updateLCAsync = async (data, dispatch) => {
  const form = dataToForm(data);
  const response = await instance.put(`/lc/edit-lc/${data.id}`, form);

  sendNotification({
    dispatch,
    response,
  });
};

export const deleteLCAsync = async (id, dispatch) => {
  const response = await instance.delete(`/lc/delete-lc/${id}`);

  sendNotification({
    dispatch,
    response,
  });
};

export const createLCDocAsync = async (data, dispatch) => {
  const form = dataToForm(data);
  const response = await instance.post("/lc/add-lc-document", form);

  sendNotification({
    dispatch,
    response,
  });
};

export const getSelectedLCDocsAsync = async (id, dispatch) => {
  const response = await instance.get(`/lc/get-lc-document/${id}`);

  if (response.data.success) {
    dispatch({
      type: GET_LC_DOCS,
      payload: response.data.data,
    });
  }
};

export const deleteLCDocAsync = async (id, dispatch) => {
  const response = await instance.delete(`/lc/delete-lc-document/${id}`);

  sendNotification({
    dispatch,
    response,
  });
};

export const createLCAmendAsync = async (data, dispatch) => {
  const form = dataToForm(data);
  const response = await instance.post("lc/add-lc-amend", form);

  sendNotification({
    dispatch,
    response,
  });
};

export const getLCAmendAsync = async (id, dispatch) => {
  const response = await instance.get(`/lc/get-lc-amend/${id}`);

  if (response.data.success) {
    dispatch({
      type: GET_LC_AMEND,
      payload: response.data.data,
    });
  }
};

export const updateLCAmendAsync = async (data, dispatch) => {
  const form = dataToForm(data);
  const response = await instance.put(`/lc/edit-lc-amend/${data.id}`, form);

  sendNotification({
    dispatch,
    response,
  });
};

export const deleteLCAmendAsync = async (id, dispatch) => {
  const response = await instance.delete(`/lc/delete-lc-amend/${id}`);

  sendNotification({
    dispatch,
    response,
  });
};
