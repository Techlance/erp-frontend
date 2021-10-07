// action - state management
import {purchaseActions} from "../../actions";

//-----------------------|| LEDGER MASTER REDUCER ||-----------------------//

// constant
const initialState = {
  parent_voucher:null,
  voucher_list:null
 };

const PurchaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case purchaseActions.GET_VOUCHER_LIST: {
      return {
        ...state,
        voucher_list:action.payload
      };
    }
    case purchaseActions.SELECT_PARENT_VOUCHER: {
      return {
        ...state,
        parent_voucher:action.payload
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export { PurchaseReducer };
