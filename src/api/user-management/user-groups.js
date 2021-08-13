// actions
import { VIEW_USER_GROUP } from "../../store/actions";

// project imports
import instance from "../../utils/axios";
import sendNotification from "../../utils/sendNotification";

const getUserGroupsAsync = async (dispatch) => {
  const response = await instance.get("/user/get-user-group");

  dispatch({
    type: VIEW_USER_GROUP,
    payload: response.data.data,
  });
};

const createUserGroupAsync = async (data, dispatch) => {
  const response = await instance.post("/user/add-user-group", data);

  sendNotification({
    dispatch,
    response,
  });
};

const updateUserGroupAsync = async (id, data, dispatch) => {
  const response = await instance.put(`/user/edit-user-group/${id}`, data);

  sendNotification({
    dispatch,
    response,
  });
};

const deleteUserGroupAsync = async (id, dispatch) => {
  const response = await instance.delete(`/user/delete-user-group/${id}`);

  sendNotification({
    dispatch,
    response,
  });
};

export {
  getUserGroupsAsync,
  createUserGroupAsync,
  updateUserGroupAsync,
  deleteUserGroupAsync,
};
