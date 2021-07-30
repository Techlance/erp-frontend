import {
  COMPANIES_INITIALIZE,
  GET_CURRENCY,
  GET_USER_COMPANIES,
  VIEW_COMPANY,
} from "./actions";

const companyReducer = (state, action) => {
  switch (action.type) {
    case GET_USER_COMPANIES: {
      return {
        ...state,
        companies: action.payload.companies,
        isInitialized: true,
      };
    }

    case COMPANIES_INITIALIZE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case VIEW_COMPANY: {
      return {
        ...state,
        currentCompany: action.payload.data,
      };
    }

    case GET_CURRENCY: {
      return {
        ...state,
        currency: action.payload.data,
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default companyReducer;
