// action - state management
import * as actionTypes from "../../actions";
//-----------------------|| USER MANAGEMENT REDUCER ||-----------------------//

// constant
const initialState = {
  company_account_heads: null,
  company_account_groups: null,
  company_account_group_details: null,
  company_ledgers: null,
  company_ledger_details: null,
  current_ledger_docs:[]
};

const ledgerMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_COMPANY_ACCOUNT_HEADS: {
      return {
        ...state,
        company_account_heads: action.payload,
      };
    }
    case actionTypes.UPDATE_COMPANY_ACCOUNT_HEAD: {
      return {
        ...state,
      };
    }
    case actionTypes.CREATE_COMPANY_ACCOUNT_HEAD: {
      return {
        ...state,
      };
    }
    case actionTypes.DELETE_COMPANY_ACCOUNT_HEAD: {
      return {
        ...state,
      };
    }
    case actionTypes.GET_COMPANY_ACCOUNT_GROUPS: {
      return {
        ...state,
        company_account_groups: action.payload,
      };
    }
    case actionTypes.GET_COMPANY_ACCOUNT_GROUP_DETAILS: {
      return {
        ...state,
        company_account_group_details: action.payload,
      };
    }
    case actionTypes.UPDATE_COMPANY_ACCOUNT_GROUP: {
      return {
        ...state,
      };
    }
    case actionTypes.CREATE_COMPANY_ACCOUNT_GROUP: {
      return {
        ...state,
      };
    }
    case actionTypes.DELETE_COMPANY_ACCOUNT_GROUP: {
      return {
        ...state,
      };
    }
    case actionTypes.GET_COMPANY_LEDGERS: {
      return {
        ...state,
        company_ledgers: action.payload,
      };
    }
    case actionTypes.GET_COMPANY_LEDGER_DETAILS: {
      return {
        ...state,
        company_ledger_details: action.payload,
      };
    }
    case actionTypes.UPDATE_COMPANY_LEDGER: {
      return {
        ...state,
      };
    }
    case actionTypes.CREATE_COMPANY_LEDGER: {
      return {
        ...state,
      };
    }
    case actionTypes.DELETE_COMPANY_LEDGER: {
      return {
        ...state,
      };
    }
    case actionTypes.VIEW_LEDGER_DOCS: {
      return {
        ...state,
        current_ledger_docs: action.payload,
      };
    }
    case actionTypes.VIEW_LEDGER_BALANCE: {
      return {
        ...state,
        ledger_balance: action.payload,
      };
    }
    case actionTypes.VIEW_LEDGER_BILLWISE: {
      return {
        ...state,
        ledger_billwise: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export { ledgerMasterReducer };
