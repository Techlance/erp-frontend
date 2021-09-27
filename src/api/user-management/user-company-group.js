// actions
import { userManagementUserCompanyGroupActions } from "../../store/actions";
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
    type: userManagementUserCompanyGroupActions.VIEW_USER_COMPANY_GROUP,
    payload: response.data.data,
  });
};

const createUserCompanyGroupAsync = async (data, dispatch) => {
  let newData = { ...data };
  newData.company_master_id = newData.company_master_id.company_id;
  newData.user_group_id = newData.user_group_id.id;

  const response = await instance.post(
    "/company/add-user-company",
    dataToForm(newData)
  );

  sendNotification({
    dispatch,
    response,
  });
};

const updateUserCompanyGroupAsync = async (data, dispatch) => {
  try {
    const response = await instance.put(
      `/company/edit-user-company/${data.id}`,
      dataToForm(data)
    );

    sendNotification({
      dispatch,
      response,
    });
  } catch (error) {
    console.log("Error while editing User Group.");

    sendNotification({
      dispatch,
      response: {
        data: {
          success: false,
          message: "Error while editing User Group",
        },
      },
    });
  }
};

export {
  getUserCompanyGroupByID,
  createUserCompanyGroupAsync,
  updateUserCompanyGroupAsync,
};
