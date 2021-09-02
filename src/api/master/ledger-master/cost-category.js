// Async// actions
import { GET_COST_CATEGORY } from "../../../store/actions";
import { dataToForm } from "../../../utils";

// project imports
import instance from "../../../utils/axios";
import sendNotification from "../../../utils/sendNotification";

export const getCostCategoryAsync = async (id, dispatch) => {
  if (!id) {
    return;
  }
  const response = await instance.get(`/company/get-cost-category/${id}`);

  console.log(response.data.data);
  dispatch({
    type: GET_COST_CATEGORY,
    payload: response.data.data,
  });
};

export const addCostCategoryAsync = async (data, dispatch) => {
  delete data.id;
  const form = dataToForm(data);
  const response = await instance.post("/company/add-cost-category", form);

  sendNotification({
    dispatch,
    response,
  });
};

export const updateCostCategoryAsync = async (data, dispatch) => {
  const form = dataToForm(data);

  const response = await instance.put(
    `company/edit-cost-category/${data.id}`,
    form
  );

  sendNotification({
    dispatch,
    response,
  });
};

export const deleteCostCategoryAsync = async (id, dispatch) => {
  const response = await instance.delete(`/company/delete-cost-category/${id}`);

  sendNotification({
    dispatch,
    response,
  });
};
