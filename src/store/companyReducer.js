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
  master_company: null,
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
        ...initialState,
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
    case actionTypes.SELECT_COMPANY: {
      return {
        ...state,
        master_company: action.payload,
      };
    }
    case actionTypes.EXIT_COMPANY: {
      return {
        ...state,
        master_company: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default companyReducer;
