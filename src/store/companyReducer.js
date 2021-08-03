import {
  COMPANIES_INITIALIZE,
  GET_CURRENCY,
  GET_USER_COMPANIES,
  UPDATE_FORM,
  VIEW_COMPANY,
  DELETE_COMPANY,
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

    case UPDATE_FORM: {
      return {
        ...state,
        current_company: {
          ...state.current_company,
          ...action.payload.data,
        },
      };
    }

    case DELETE_COMPANY: {
      let companyCopy = [...state.companies];
      console.log(companyCopy);
      companyCopy.forEach((element, index) => {
        console.log(element);
        console.log(
          "emenet" + element.company_id + " " + state.current_company.id
        );
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

    default: {
      return { ...state };
    }
  }
};

export default companyReducer;
