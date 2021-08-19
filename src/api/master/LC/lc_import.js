// Async// actions
import { GET_LC } from "../../../store/actions";
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
