import { budgetActions } from "../../store/actions";
import { dataToForm } from "../../utils";

// project imports
import instance from "../../utils/axios";
import sendNotification from "../../utils/sendNotification";

export const getCompanyBudgetAsync = async (id, dispatch) => {
  try {
    if (!id) return;

    const response = await instance.get(
      `/budget/get-budget/${id}`
    );

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
  
      const response = await instance.get(
        `/budget/get-budget-details/${id}`
      );
  
      dispatch({
      type: budgetActions.GET_COMPANY_BUDGET_DETAILS,
        payload: response.data.data,
      });
    } catch (error) {
      console.log("Error while getting");
    }
};
