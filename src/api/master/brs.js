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
