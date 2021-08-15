// actions
import { GET_CURRENCY } from "../store/actions";
import { dataToForm } from "../utils";

// project imports
import instance from "../utils/axios";
import sendNotification from "../utils/sendNotification";

const addCurrencyAsync = async (data, dispatch, onSuccess) => {
  try {
    const response = await instance.post("/company/add-currency", data);

    if (response.data.success) {
      onSuccess();
    }

    sendNotification({
      dispatch,
      response,
    });
  } catch (error) {
    console.log("Error in adding currency.");
  }
};

const getCurrencyAsync = async (dispatch) => {
  try {
    const response = await instance.get("/company/get-currency");

    dispatch({
      type: GET_CURRENCY,
      payload: response.data.data,
    });
  } catch (error) {
    console.log("Error in get currency.");
  }
};

const updateCurrencyAsync = async (data, dispatch) => {
  try {
    const form = dataToForm(data);
    const response = await instance.put(
      `/company/edit-currency/${data.id}`,
      form
    );

    dispatch({
      type: GET_CURRENCY,
      payload: response.data.data,
    });
  } catch (error) {
    console.log("Error in updating currency.");
  }
};

const deleteCurrencyAsync = async (id, dispatch) => {
  try {
    const response = await instance.delete(`/company/delete-currency/${id}`);

    sendNotification({
      dispatch,
      response,
    });
  } catch (error) {
    console.log("Error in deleting currency.");
  }
};

export {
  getCurrencyAsync,
  addCurrencyAsync,
  updateCurrencyAsync,
  deleteCurrencyAsync,
};
