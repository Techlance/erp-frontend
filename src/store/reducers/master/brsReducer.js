// action - state management
import { brsActions } from "../../actions";

//-----------------------|| VOUCHER TYPES REDUCER ||-----------------------//

// constant
const initialState = {
  bank_list: [],
  selected_bank: null,
  brs_list: null,
  brs_detail: null,
};

const brsReducer = (state = initialState, action) => {
  switch (action.type) {
    case brsActions.GET_BRS_BANKS: {
      return {
        ...state,
        bank_list: action.payload,
      };
    }

    case brsActions.GET_BRS: {
      return {
        ...state,
        brs_list: action.payload,
      };
    }

    case brsActions.GET_BRS_DETAIL: {
      return {
        ...state,
        brs_detail: action.payload,
      };
    }

    case brsActions.SET_BRS_BANK: {
      return {
        ...state,
        selected_bank: action.payload,
        brs_detail: null,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export { brsReducer };
