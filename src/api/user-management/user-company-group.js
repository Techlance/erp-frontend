// actions
import { VIEW_USER_COMPANY_GROUP } from "../../store/actions";

// project imports
import instance from "../../utils/axios";
import sendNotification from "../../utils/sendNotification";

const getUserCompanyGroupByID = async (id, dispatch) => {
  if (!id) {
    return;
  }

  const response = await instance.get(`/company/get-user-company-group/${id}`);

  dispatch({
    type: VIEW_USER_COMPANY_GROUP,
    payload: response.data.data,
  });
};

const createUserCompanyGroupAsync = async (data, dispatch) => {
  const response = await instance.post("/company/add-user-company", data);

  sendNotification({
    dispatch,
    response,
  });
};

const updateUserCompanyGroupAsync = async (data, dispatch) => {
  const response = await instance.put(
    `/company/edit-user-company/${data.id}`,
    data
  );

  sendNotification({
    dispatch,
    response,
  });
};

export {
  getUserCompanyGroupByID,
  createUserCompanyGroupAsync,
  updateUserCompanyGroupAsync,
};
