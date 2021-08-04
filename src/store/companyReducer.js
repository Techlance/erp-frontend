import {
  COMPANIES_INITIALIZE,
  GET_CURRENCY,
  GET_USER_COMPANIES,
  VIEW_COMPANY,
  DELETE_COMPANY,
  VIEW_COMPANY_DOCS,
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
        current_company: action.payload,
      };
    }

    case GET_CURRENCY: {
      return {
        ...state,
        currency: action.payload.data,
      };
    }

    case DELETE_COMPANY: {
      let companyCopy = [...state.companies];
      companyCopy.forEach((element, index) => {
        if (element.company_id === state.current_company.id) {
          delete companyCopy[index];
        }
      });
      return {
        ...state,
        current_company: action.payload.data,
        companies: companyCopy,
      };
    }

    case VIEW_COMPANY_DOCS: {
      return {
        ...state,
        current_company_docs: action.payload,
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default companyReducer;
