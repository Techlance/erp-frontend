// Async// actions
import { GET_COST_CATEGORY } from "../../../../store/actions";
import { dataToForm } from "../../../../utils";

// project imports
import instance from "../../../../utils/axios";
import sendNotification from "../../../../utils/sendNotification";

export const getCostCategoryAsync = async (id, dispatch) => {
  if (!id) {
    return;
  }
  const response = await instance.get(`/company/get-cost-category/${id}`);

  dispatch({
    type: GET_COST_CATEGORY,
    payload: response.data.data,
  });
};

export const addCostCategoryAsync = async (data, onSuccess, dispatch) => {
  try {
    delete data.id;

    const response = await instance.post(
      "/company/add-cost-category",
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
          message: "Error while creating cost category.",
        },
      },
    });

    console.log("Error while creating cost category.");
  }
};

export const updateCostCategoryAsync = async (values, dispatch) => {
  try {
    let data = { ...values };
    data.cost_category_id = parseInt(data.cost_category_id.id);
    if (data.child_of) {
      data.child_of = parseInt(data.child_of?.id);
    } else {
      data.child_of = null;
    }

    const response = await instance.put(
      `company/edit-cost-category/${data.id}`,
      dataToForm(data)
    );

    sendNotification({
      dispatch,
      response,
    });
  } catch (error) {}
};

export const deleteCostCategoryAsync = async (id, dispatch) => {
  const response = await instance.delete(`/company/delete-cost-category/${id}`);

  sendNotification({
    dispatch,
    response,
  });
};
