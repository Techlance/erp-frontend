// actions
import { GET_CURRENCY } from "../store/actions";

// project imports
import instance from "../utils/axios";
import sendNotification from "../utils/sendNotification";

const addCurrencyAsync = async (data, dispatch, onSuccess) => {
  const response = await instance.post("/company/add-currency", data);

  if (response.data.success) {
    onSuccess();
  }

  sendNotification({
    dispatch,
    response,
  });
};

const getCurrencyAsync = async (dispatch) => {
  const response = await instance.get("/company/get-currency");

  dispatch({
    type: GET_CURRENCY,
    payload: response.data.data,
  });
};

export { getCurrencyAsync, addCurrencyAsync };
