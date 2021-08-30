// Async// actions
import { GET_COMPANY_LEDGERS, GET_COMPANY_LEDGER_DETAILS, VIEW_LEDGER_DOCS, VIEW_LEDGER_BALANCE, VIEW_LEDGER_BILLWISE } from "../../../store/actions";
import { dataToForm } from "../../../utils";

// project imports
import instance from "../../../utils/axios";
import sendNotification from "../../../utils/sendNotification";

export const getCompanyLedgersAsync = async (id, dispatch) => {
  if (!id) return;

  const response = await instance.get(`/company/get-ledger-master/${id}`);

  dispatch({
    type: GET_COMPANY_LEDGERS,
    payload: response.data.data,
  });
};

export const getCompanyLedgerDetailsAsync = async (id, dispatch) => {
    if (!id) return;
  
    const response = await instance.get(
      `/company/get-detail-ledger-master/${id}`
    );
  
    dispatch({
      type: GET_COMPANY_LEDGER_DETAILS,
      payload: response.data.data,
    });
  };

export const addCompanyLedgerAsync = async (data, dispatch) => {
  delete data.id;
  console.log(data);
  const response = await instance.post(
    "/company/add-ledger-master",
    dataToForm(data)
  );

  sendNotification({
    dispatch,
    response,
  });
  return response.data
};

export const updateCompanyLedgerAsync = async (data, dispatch) => {
  const response = await instance.put(
    `/company/edit-ledger-master/${data.id}`,
    dataToForm(data)
  );

  sendNotification({
    dispatch,
    response,
  });
};

export const deleteCompanyLedgerAsync = async (id, dispatch) => {
  const response = await instance.delete(`/company/delete-ledger-master/${id}`);

  sendNotification({
    dispatch,
    response,
  });
};

export const getLedgerDocsAsync = async (id, dispatch) => {
  const response = await instance.get(`/company/get-ledger-document/${id}`);

  if (response.data.success) {
    dispatch({
      type: VIEW_LEDGER_DOCS,
      payload: response.data.data,
    });
  }
};

export const createLedgerDocAsync = async (data, dispatch) => {
  const form = dataToForm(data);
  const response = await instance.post("/company/add-ledger-document", form);

  sendNotification({
    dispatch,
    response,
  });
};

export const deleteLedgerDocAsync = async (id, dispatch) => {
  const response = await instance.delete(
    `/company/delete-ledger-document/${id}`
  );

  sendNotification({
    dispatch,
    response,
  });
};

export const addLedgerBalanceAsync = async (data, dispatch) => {
  console.log(data);
  const response = await instance.post(
    "/ledger-balance/add-ledger-balance",
    dataToForm(data)
  );

  sendNotification({
    dispatch,
    response,
  });
  // return response.data
  console.log(response.data)
};

export const addLedgerBillwiseAsync = async (data, dispatch) => {
  console.log(data);
  const response = await instance.post(
    "/ledger-balance/add-all-ledger-bal-billwise",data
  );
  sendNotification({
    dispatch,
    response,
  });
  // return response.data
  console.log(response.data)
};

export const getLedgerBalanceAsync = async (id, dispatch) => {
  const response = await instance.get(`/ledger-balance/get-ledger-balance/${id}`);

  if (response.data.success) {
    dispatch({
      type: VIEW_LEDGER_BALANCE,
      payload: response.data.data,
    });
  }
  console.log(response.data)
};

export const getLedgerBillwiseAsync = async (id, dispatch) => {
  const response = await instance.get(`/ledger-balance/get-ledger-bal-billwise/${id}`);

  if (response.data.success) {
    dispatch({
      type: VIEW_LEDGER_BILLWISE,
      payload: response.data.data,
    });
  }
};

export const updateLedgerBalanceAsync = async (data, dispatch) => {
  const response = await instance.put(
    `/ledger-balance/edit-ledger-balance/${data.id}`,
    dataToForm(data)
  );

  sendNotification({
    dispatch,
    response,
  });
};

export const updateLedgerBillwiseAsync = async (data, dispatch) => {
  const response = await instance.post(
    `/ledger-balance/add-existing-ledger-bal-billwise`,
    data
  );

  sendNotification({
    dispatch,
    response,
  });
};

export const deleteLedgerBillAsync = async (id,dispatch) => {
   const response = await instance.delete(
      `/ledger-balance/delete-ledger-bal-billwise/${id}`
    );
  
    sendNotification({
      dispatch,
      response,
    });  
}