// actions
import { userManagementUserActions } from "../../store/actions";
import { dataToForm } from "../../utils";

// project imports
import instance from "../../utils/axios";
import sendNotification from "../../utils/sendNotification";

const getUserAccountByIDAsync = async (id, dispatch) => {
  if (!id) {
    return;
  }
  const response = await instance.get(`/user/get-users/${id}`);

  dispatch({
    type: userManagementUserActions.VIEW_USER_BY_ID,
    payload: {
      data: response.data.data,
    },
  });
};

const getUserAccountsAsync = async (dispatch) => {
  const response = await instance.get("/user/get-users");

  dispatch({
    type: userManagementUserActions.VIEW_USER,
    payload: response.data.data,
  });
};

const createUserAccountAsync = async (data, dispatch) => {
  delete data.id;
  const response = await instance.post("/user/add-user", dataToForm(data));

  sendNotification({
    dispatch,
    response,
  });
};

const updateUserAccountAsync = async (data, dispatch) => {
  const response = await instance.put(
    `/user/edit-user/${data.id}`,
    dataToForm(data)
  );

  sendNotification({
    dispatch,
    response,
  });
};

const deleteUserAccountAsync = async (id, dispatch) => {
  const response = await instance.delete(`/user/delete-user/${id}`);

  sendNotification({
    dispatch,
    response,
  });
};

export {
  getUserAccountByIDAsync,
  getUserAccountsAsync,
  createUserAccountAsync,
  updateUserAccountAsync,
  deleteUserAccountAsync,
};
