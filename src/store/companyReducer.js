import * as actionTypes from "./actions";

// constant
const initialState = {
  companies: [],
  current_company: {
    id: 0,
    company_name: "",
    address: "",
    country: "",
    state: "",
    email: "",
    website: "",
    contact_no: "",
    base_currency: { id: 0 },
    logo: null,
    cr_no: "",
    registration_no: "",
    tax_id_no: "",
    vat_id_no: "",
    year_start_date: "",
    year_end_date: "",
    created_by: "",
  },
  current_company_docs: [],
  currencies: [],
};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_COMPANIES: {
      return {
        ...state,
        companies: action.payload.companies,
        isInitialized: true,
      };
    }

    case actionTypes.COMPANIES_INITIALIZE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case actionTypes.VIEW_COMPANY: {
      return {
        ...state,
        current_company: action.payload,
      };
    }

    case actionTypes.GET_CURRENCY: {
      return {
        ...state,
        currencies: action.payload,
      };
    }

    case actionTypes.DELETE_COMPANY: {
      return {
        ...state,
        current_company: action.payload,
      };
    }

    case actionTypes.VIEW_COMPANY_DOCS: {
      return {
        ...state,
        current_company_docs: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default companyReducer;
