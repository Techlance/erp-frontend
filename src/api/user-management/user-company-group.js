// actions
import { VIEW_USER_COMPANY_GROUP } from "../../store/actions";
import { dataToForm } from "../../utils";

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
  const form = dataToForm(data);

  const response = await instance.post("/company/add-user-company", form);

  sendNotification({
    dispatch,
    response,
  });
};

const updateUserCompanyGroupAsync = async (data, dispatch) => {
  const form = dataToForm(data);
  const response = await instance.put(
    `/company/edit-user-company/${data.id}`,
    form
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
