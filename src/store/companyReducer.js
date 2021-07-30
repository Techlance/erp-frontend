import { COMPANIES_INITIALIZE, GET_USER_COMPANIES } from "./actions";

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

    default: {
      return { ...state };
    }
  }
};

export default companyReducer;
