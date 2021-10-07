import { purchaseActions } from "../../../store/actions";
// import { dataToForm } from "../../../utils";

// project imports
import instance from "../../../utils/axios";
// import sendNotification from "../../utils/sendNotification";

export const getVouchersAsync = async (cid, dispatch) => {
  try {
    const response = await instance(`/company/get-vouchertype/${cid}`);

    dispatch({
      type: purchaseActions.GET_VOUCHER_LIST,
      payload: response.data.data,
    });
  } catch (error) {
    console.log("Error while fetching Voucher List.");
  }
};