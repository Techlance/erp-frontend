// Async// actions
import {
  GET_COST_CENTER,
  GET_COST_CENTER_DETAILS,
} from "../../../../store/actions";
import { dataToForm } from "../../../../utils";

// project imports
import instance from "../../../../utils/axios";
import sendNotification from "../../../../utils/sendNotification";

export const getCostCenterAsync = async (id, dispatch) => {
  if (!id) {
    return;
  }
  const response = await instance.get(`/company/get-cost-center/${id}`);

  dispatch({
    type: GET_COST_CENTER,
    payload: response.data.data,
  });
};

export const getCostCenterDetailsAsync = async (id, dispatch) => {
  if (!id) {
    return;
  }
  const response = await instance.get(`/company/get-detail-cost-center/${id}`);

  dispatch({
    type: GET_COST_CENTER_DETAILS,
    payload: response.data.data,
  });
};

export const addCostCenterAsync = async (values, onSuccess, dispatch) => {
  try {
    let data = { ...values };
    delete data.id;
    if (data.child_of) {
      data.child_of = parseInt(data.child_of?.id);
    } else {
      data.child_of = null;
    }
    data.cost_category_id = parseInt(data.cost_category_id.id);

    const response = await instance.post(
      "/company/add-cost-center",
      dataToForm(data)
    );

    sendNotification({
      dispatch,
      response,
    });

    if (response.data.success) {
      onSuccess();
    }
  } catch (error) {
    sendNotification({
      dispatch,
      response: {
        data: {
          success: false,
          message: "Error while creating cost center.",
        },
      },
    });

    console.log("Error while creating cost center.");
  }
};

export const updateCostCenterAsync = async (values, dispatch) => {
  try {
    let data = { ...values };
    if (data.child_of) {
      data.child_of = parseInt(data.child_of?.id);
    } else {
      data.child_of = null;
    }
    data.cost_category_id = parseInt(data.cost_category_id.id);

    const response = await instance.put(
      `company/edit-cost-center/${data.id}`,
      dataToForm(data)
    );

    sendNotification({
      dispatch,
      response,
    });
  } catch (error) {
    sendNotification({
      dispatch,
      response: {
        data: {
          success: false,
          message: "Error while updating cost center.",
        },
      },
    });

    console.log("Error while updating cost center.");
  }
};

export const deleteCostCenterAsync = async (id, dispatch) => {
  try {
    const response = await instance.delete(`/company/delete-cost-center/${id}`);

    sendNotification({
      dispatch,
      response,
    });
  } catch (error) {
    sendNotification({
      dispatch,
      response: {
        data: {
          success: false,
          message: "Error while deleting cost center.",
        },
      },
    });

    console.log("Error while deleting cost center.");
  }
};
