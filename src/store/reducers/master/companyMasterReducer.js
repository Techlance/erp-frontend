// action - state management
import { EXIT_COMPANY, SELECT_COMPANY } from "../../actions";

//-----------------------|| ACCOUNT REDUCER ||-----------------------//

const companyMasterReducer = (state, action) => {
  switch (action.type) {
    case SELECT_COMPANY: {
      return {
        ...state,
        isInitialized: true,
        company: action.payload,
      };
    }
    case EXIT_COMPANY: {
      return {
        ...state,
        isInitialized: true,
        company: null,
      };
    }

    default: {
      return { ...state };
    }
  }
};

export { companyMasterReducer };
