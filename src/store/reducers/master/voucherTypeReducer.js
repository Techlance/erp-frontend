// action - state management
import { voucherTypeActions } from "../../actions";

//-----------------------|| VOUCHER TYPES REDUCER ||-----------------------//

// constant
const initialState = {
  voucher_types: [],
  voucher_type_details: null,
};

const voucherTypesReducer = (state = initialState, action) => {
  switch (action.type) {
    case voucherTypeActions.GET_VOUCHER_TYPES: {
      return {
        ...state,
        voucher_types: action.payload,
      };
    }

    case voucherTypeActions.GET_VOUCHER_TYPES_DETAILS: {
      return {
        ...state,
        voucher_type_details: action.payload,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export { voucherTypesReducer };
