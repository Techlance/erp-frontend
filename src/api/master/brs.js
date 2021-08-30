// async actions
import { brsActions } from "../../store/actions";
import { dataToForm } from "../../utils";

// project imports
import instance from "../../utils/axios";
import sendNotification from "../../utils/sendNotification";

export const getBanksAsync = async (cid, dispatch) => {
  try {
    const response = await instance(`/company/get-ledger-cash-bank/${cid}`);

    dispatch({
      type: brsActions.GET_BRS_BANKS,
      payload: response.data.data,
    });
  } catch (error) {
    console.log("Error while fetching Bank List.");
  }
};

export const setBankAsync = async (bank, dispatch) => {
  try {
    dispatch({
      type: brsActions.SET_BRS_BANK,
      payload: bank,
    });
  } catch (error) {
    console.log("Error setting bank.");
  }
};

export const getOpeningBalBRSAsync = async (id, dispatch) => {
  try {
    const response = await instance(`/ledger-balance/get-op-bal-brs/${id}`);

    dispatch({
      type: brsActions.GET_BRS,
      payload: response.data.data,
    });
  } catch (error) {
    console.log("Error getting opening balance brs.");
  }
};

export const getBrsDetailsAsync = async (brs_id, dispatch) => {
  try {
    const response = await instance.get(
      `/ledger-balance/get-detail-op-bal-brs/${brs_id}`
    );

    dispatch({
      type: brsActions.GET_BRS_DETAIL,
      payload: response.data.data,
    });
  } catch (error) {
    console.log("Error getting Opening Balance BRS Details");
  }
};

export const createBrsAsync = async (data, dispatch) => {
  try {
    data.bank_ledger_id = data.bank_ledger_id.id;
    data.acc_code = data.acc_code.id;

    const response = await instance.put(
      `/ledger-balance/add-op-bal-brs`,
      dataToForm(data)
    );

    sendNotification({
      dispatch,
      response,
    });
  } catch (error) {
    console.log("Error in creating Opening Balance BRS Details.");
  }
};

export const updateBrsAsync = async (data, dispatch) => {
  try {
    data.bank_ledger_id = data.bank_ledger_id.id;
    data.acc_code = data.acc_code.id;

    const response = await instance.put(
      `/ledger-balance/edit-op-bal-brs/${data.id}`,
      dataToForm(data)
    );

    sendNotification({
      dispatch,
      response,
    });
  } catch (error) {
    console.log("Error in updating Opening Balance BRS Details.");
  }
};

export const deleteBrsAsync = async (id, dispatch) => {
  try {
    const response = await instance.delete(
      `/ledger-balance/delete-op-bal-brs/${id}`
    );

    sendNotification({
      dispatch,
      response,
    });
  } catch (error) {
    console.log("Error while deleting Opening Balance BRS Details.");
  }
};
