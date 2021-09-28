// action - state management
import * as actionTypes from "../../actions";

//-----------------------|| LEDGER MASTER REDUCER ||-----------------------//

// constant
const initialState = { };

const PurchaseReducer = (state = initialState, action) => {
  switch (action.type) {
    // case actionTypes.GET_PURCHASE_CREDIT: {
    //   return {
    //     ...state,
    //   };
    // }
    default: {
      return {
        ...state,
      };
    }
  }
};

export { PurchaseReducer };
