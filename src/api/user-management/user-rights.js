// actions
// import { VIEW_USER_RIGHTS } from "../../store/actions";

// project imports
import { dataToForm } from "../../utils";
import instance from "../../utils/axios";
import sendNotification from "../../utils/sendNotification";

const getUserRightsAsync = async (dispatch) => {
  // const response = await instance.get("/user/get-user-right");
  // dispatch({
  //   type: VIEW_USER_RIGHTS,
  //   payload: response.data.data,
  // });
};

const createUserRightsAsync = async (data, dispatch) => {
  const response = await instance.post("/user/add-user-right", data);

  sendNotification({
    dispatch,
    response,
  });
};

const updateUserRightsAsync = async (data, dispatch) => {
  const form = dataToForm(data);

  const response = await instance.put(`/user/edit-user-right/${data.id}`, form);

  sendNotification({
    dispatch,
    response,
  });
};

const deleteUserRightsAsync = async (id, dispatch) => {
  const response = await instance.delete(`/user/delete-user-right/${id}`);

  sendNotification({
    dispatch,
    response,
  });
};

export {
  getUserRightsAsync,
  createUserRightsAsync,
  updateUserRightsAsync,
  deleteUserRightsAsync,
};
