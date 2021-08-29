// async actions
import { voucherTypeActions } from "../../store/actions";
import { dataToForm } from "../../utils";

// project imports
import instance from "../../utils/axios";
import sendNotification from "../../utils/sendNotification";

export const getVoucherTypesDetailAsync = async (id, dispatch) => {
  try {
    if (!id) return;

    const response = await instance.get(
      `/company/get-detail-vouchertype/${id}`
    );

    dispatch({
      type: voucherTypeActions.GET_VOUCHER_TYPES_DETAILS,
      payload: response.data.data,
    });
  } catch (error) {
    console.log("Error while getting");
  }
};

export const getVoucherTypesAsync = async (id, dispatch) => {
  try {
    if (!id) return;

    const response = await instance.get(`/company/get-vouchertype/${id}`);

    dispatch({
      type: voucherTypeActions.GET_VOUCHER_TYPES,
      payload: response.data.data,
    });
  } catch (error) {
    console.log("Error while getting");
  }
};

export const createVoucherTypesAsync = async (data, dispatch) => {
  try {
    delete data.id;
    const response = await instance.post(
      "/company/add-vouchertype",
      dataToForm(data)
    );

    sendNotification({
      dispatch,
      response,
    });
  } catch (error) {
    console.log("Error while creating voucher type.");
  }
};

export const updateVoucherTypesAsync = async (data, dispatch) => {
  try {
    const response = await instance.put(
      `/company/edit-vouchertype/${data.id}`,
      dataToForm(data)
    );

    sendNotification({
      dispatch,
      response,
    });
  } catch (error) {
    console.log("Error while updating voucher type.");
  }
};

export const deleteVoucherTypesAsync = async (id, dispatch) => {
  try {
    const response = await instance.delete(`/company/delete-vouchertype/${id}`);

    sendNotification({
      dispatch,
      response,
    });
  } catch (error) {
    console.log("Error while deleting voucher type.");
  }
};
