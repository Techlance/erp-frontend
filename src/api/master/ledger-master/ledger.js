// Async// actions
import { GET_COMPANY_LEDGERS } from "../../../store/actions";
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

export const addCompanyLedgerAsync = async (data, dispatch) => {
  delete data.id;
  const response = await instance.post(
    "/company/add-ledger-master",
    dataToForm(data)
  );

  sendNotification({
    dispatch,
    response,
  });
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
