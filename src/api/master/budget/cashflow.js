import { budgetActions } from "../../../store/actions";

// project imports
import instance from "../../../utils/axios";
import sendNotification from "../../../utils/sendNotification";

export const getBudgetCashflowDetailsAsync = async (id, dispatch) => {
  try {
    if (!id) return;

    const response = await instance.get(
      `/budget/get-budget-cashflow-details/${id}`
    );

    dispatch({
      type: budgetActions.GET_COMPANY_BUDGET_CASHFLOW_DETAILS,
      payload: response.data.data,
    });
  } catch (error) {
    console.log("Error while getting");
  }
};

export const updateBudgetCashflowDetailsAsync = async (
  // id,
  data,
  onSuccess,
  dispatch
) => {
  try {
    // if (!id) return;

    const response = await instance.post(
      `/budget/create-edit-budget-cashflow-detail/`,
      data
    );

    sendNotification({
      dispatch,
      response,
    });

    if (response.data.success) onSuccess();
  } catch (error) {
    console.log("Error while getting");
  }
};

export const getBudgetCashflowReviseAsync = async (id, dispatch) => {
  try {
    if (!id) return;

    const response = await instance.get(
      `/budget/get-revised-budget-cashflow-details/${id}`
    );

    dispatch({
      type: budgetActions.GET_COMPANY_BUDGET_CASHFLOW_REVISE,
      payload: response.data.data,
    });
  } catch (error) {
    console.log("Error while getting");
  }
};

export const updateBudgetCashflowReviseAsync = async (
  id,
  data,
  onSuccess,
  dispatch
) => {
  try {
    if (!id) return;

    const response = await instance.post(
      `/budget/create-edit-revised-budget-cashflow-detail/`,
      data
    );

    dispatch({
      type: budgetActions.UPDATE_COMPANY_BUDGET_REVISE,
    });

    sendNotification({
      dispatch,
      response,
    });

    if (response.data.success) onSuccess();
  } catch (error) {
    console.log("Error while getting");
  }
};

export const addCashflowHeadAsync = async (
  data,
  onSuccess,
  dispatch
) => {
  try {
    const response = await instance.post(
      `/budget/create-cashflow-head`,
      data
    );

    dispatch({
      type: budgetActions.ADD_BUDGET_CASHFLOW_DETAILS
    });

    sendNotification({
      dispatch,
      response,
    });

    if (response.data.success) onSuccess(response.data.data);
  } catch (error) {
    console.log("Error while getting");
  }
};

