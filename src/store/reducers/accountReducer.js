// action - state management
import * as actionTypes from "../actions";
//-----------------------|| ACCOUNT REDUCER ||-----------------------//

const accountReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ACCOUNT_INITIALIZE: {
      const { isLoggedIn, user } = action.payload;
      return {
        ...state,
        isLoggedIn,
        isInitialized: true,
        user,
      };
    }
    case actionTypes.LOGIN: {
      const { user } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        user,
      };
    }
    case actionTypes.LOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export { accountReducer };
