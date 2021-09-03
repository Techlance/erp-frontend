import { budgetActions } from "../../../store/actions";

// project imports
import instance from "../../../utils/axios";

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
