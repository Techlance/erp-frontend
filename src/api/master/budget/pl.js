import { budgetActions } from "../../../store/actions";
import { dataToForm } from "../../../utils";

// project imports
import instance from "../../../utils/axios";
import sendNotification from "../../../utils/sendNotification";

export const getCompanyBudgetAsync = async (id, dispatch) => {
  try {
    if (!id) return;

    const response = await instance.get(`/budget/get-budget/${id}`);

    dispatch({
      type: budgetActions.GET_COMPANY_BUDGET,
      payload: response.data.data,
    });
  } catch (error) {
    console.log("Error while getting");
  }
};

export const addCompanyBudgetAsync = async (data, dispatch) => {
  const response = await instance.post(
    "/budget/create-budget",
    dataToForm(data)
  );

  sendNotification({
    dispatch,
    response,
  });
};

export const getBudgetPlDetailsAsync = async (id, dispatch) => {
  try {
    if (!id) return;

    const response = await instance.get(`/budget/get-budget-details/${id}`);

    dispatch({
      type: budgetActions.GET_COMPANY_BUDGET_DETAILS,
      payload: response.data.data,
    });
  } catch (error) {
    console.log("Error while getting");
  }
};

export const updateBudgetPlDetailsAsync = async (id, data, successFn, dispatch) => {
  try {
    if (!id) return;

    const response = await instance.put(`/budget/edit-changed-budget-details/${id}`,data);

    dispatch({
      type: budgetActions.UPDATE_COMPANY_BUDGET_DETAILS,
    });

    sendNotification({
      dispatch,
      response,
    });

    if(response.data.success)
      successFn();

  } catch (error) {
    console.log("Error while getting");
  }
};

export const getBudgetPlReviseAsync = async (id, dispatch) => {
  try {
    if (!id) return;

    const response = await instance.get(`/budget/get-revised-budget-details/${id}`);

    dispatch({
      type: budgetActions.GET_COMPANY_BUDGET_REVISE,
      payload: response.data.data,
    });
  } catch (error) {
    console.log("Error while getting");
  }
};

export const updateBudgetPlReviseAsync = async (id, data, successFn, dispatch) => {
  try {
    if (!id) return;

    const response = await instance.put(`/budget/edit-revised-budget-details/${id}`,data);

    dispatch({
      type: budgetActions.UPDATE_COMPANY_BUDGET_REVISE,
    });

    sendNotification({
      dispatch,
      response,
    });

    if(response.data.success)
      successFn();

  } catch (error) {
    console.log("Error while getting");
  }
};

