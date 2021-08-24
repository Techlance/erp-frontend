// action - state management
import {
  GET_LC,
  UPDATE_LC,
  CREATE_LC,
  DELETE_LC,
  GET_COST_CENTER,
  GET_PARTY_CODE_PAY,
  GET_PARTY_CODE_RECEIVE,
  GET_BANK_AC,
} from "../../actions";
//-----------------------|| LC REDUCER ||-----------------------//

// constant
const initialState = {
  l_c: null,
  //   cost_center: null,
  //   cost_center_details: null,
  centeres: [],
  party_code_pay: [],
  party_code_rec: [],
  current_company_docs: [],
  bank_ac: [],
};

const lcReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LC: {
      return {
        ...state,
        l_c: action.payload,
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
