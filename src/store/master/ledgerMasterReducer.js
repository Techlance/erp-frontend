// action - state management
import {
  GET_COMPANY_ACCOUNT_HEADS,
  UPDATE_COMPANY_ACCOUNT_HEAD,
  CREATE_COMPANY_ACCOUNT_HEAD,
  DELETE_COMPANY_ACCOUNT_HEAD,
} from "../actions";
//-----------------------|| USER MANAGEMENT REDUCER ||-----------------------//

// constant
const initialState = {
  company_account_heads: null,
};

const ledgerMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPANY_ACCOUNT_HEADS: {
      return {
        ...state,
        company_account_heads: action.payload,
      };
    }
    case UPDATE_COMPANY_ACCOUNT_HEAD: {
      return {
        ...state,
      };
    }
    case CREATE_COMPANY_ACCOUNT_HEAD: {
      return {
        ...state,
      };
    }
    case DELETE_COMPANY_ACCOUNT_HEAD: {
      return {
        ...state,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default ledgerMasterReducer;
