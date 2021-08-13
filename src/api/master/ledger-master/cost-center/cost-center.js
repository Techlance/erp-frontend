// Async// actions
import { GET_COST_CENTER } from "../../../store/actions";
import { dataToForm } from "../../../utils";

// project imports
import instance from "../../../utils/axios";
import sendNotification from "../../../utils/sendNotification";

export const getCostCenterAsync = async (id, dispatch) => {
  if (!id) {
    return;
  }
  const response = await instance.get(`/company/get-cost-center/${id}`);

  console.log(response.data.data);
  dispatch({
    type: GET_COST_CENTER,
    payload: response.data.data,
  });
};

export const addCostCenterAsync = async (data, dispatch) => {
  delete data.id;
  const form = dataToForm(data);
  const response = await instance.post("/company/add-cost-center", form);

  sendNotification({
    dispatch,
    response,
  });
};

export const updateCostCenterAsync = async (data, dispatch) => {
  const response = await instance.put(
    `company/edit-cost-center/${data.id}`,
    data
  );

  sendNotification({
    dispatch,
    response,
  });
};

export const deleteCostCenterAsync = async (id, dispatch) => {
  const response = await instance.delete(`/company/delete-cost-center/${id}`);

  sendNotification({
    dispatch,
    response,
  });
};
