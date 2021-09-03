// action - state management
import { budgetActions } from "../../actions";

//-----------------------|| BUDGET REDUCER ||-----------------------//

// constant
const initialState = {
  company_budgets: [],
  company_budget_details: null,
  company_budget_revise: null,
  company_budget_cashflow_details: null,
};

const budgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case budgetActions.GET_COMPANY_BUDGET: {
      return {
        ...state,
        company_budgets: action.payload,
      };
    }

    case budgetActions.GET_COMPANY_BUDGET_DETAILS: {
      return {
        ...state,
        company_budget_details: action.payload,
      };
    }

    case budgetActions.GET_COMPANY_BUDGET_REVISE: {
      console.log(action.payload);
      return {
        ...state,
        company_budget_revise: action.payload,
      };
    }

    case budgetActions.GET_COMPANY_BUDGET_CASHFLOW_DETAILS: {
      return {
        ...state,
        company_budget_cashflow_details: action.payload,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export { budgetReducer };
