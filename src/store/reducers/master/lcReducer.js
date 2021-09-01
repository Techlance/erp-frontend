// action - state management
import {
  GET_IMPORT_LC,
  GET_EXPORT_LC,
  GET_DETAIL_LC,
  UPDATE_LC,
  CREATE_LC,
  DELETE_LC,
  GET_COST_CENTER,
  GET_PARTY_CODE_PAY,
  GET_PARTY_CODE_RECEIVE,
  GET_BANK_AC,
  GET_LC_DOCS,
  GET_LC_AMEND,
} from "../../actions";
//-----------------------|| LC REDUCER ||-----------------------//

// constant
const initialState = {
  lc_import: null,
  lc_export: null,
  lc_detail: null,
  centeres: [],
  party_code_pay: [],
  party_code_rec: [],
  current_lc_docs: [],
  lc_amend: [],
  bank_ac: [],
};

const lcReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_IMPORT_LC: {
      return {
        ...state,
        lc_import: action.payload,
      };
    }
    case GET_EXPORT_LC: {
      return {
        ...state,
        lc_export: action.payload,
      };
    }
    case GET_LC_DOCS: {
      return {
        ...state,
        current_lc_docs: action.payload,
      };
    }
    case GET_DETAIL_LC: {
      return {
        ...state,
        lc_detail: action.payload,
      };
    }
    case GET_LC_AMEND: {
      return {
        ...state,
        lc_amend: action.payload,
      };
    }
    case UPDATE_LC: {
      return {
        ...state,
      };
    }
    case CREATE_LC: {
      return {
        ...state,
      };
    }
    case DELETE_LC: {
      return {
        ...state,
      };
    }
    case GET_COST_CENTER: {
      return {
        ...state,
        centeres: action.payload,
      };
    }
    case GET_PARTY_CODE_PAY: {
      return {
        ...state,
        party_code_pay: action.payload,
      };
    }
    case GET_PARTY_CODE_RECEIVE: {
      return {
        ...state,
        party_code_rec: action.payload,
      };
    }
    case GET_BANK_AC: {
      return {
        ...state,
        bank_ac: action.payload,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export { lcReducer };
