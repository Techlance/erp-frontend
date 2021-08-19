// action - state management
import { GET_LC, UPDATE_LC, CREATE_LC, DELETE_LC } from "../../actions";
//-----------------------|| LC REDUCER ||-----------------------//

// constant
const initialState = {
  l_c: null,
  //   cost_center: null,
  //   cost_center_details: null,
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

    default: {
      return {
        ...state,
      };
    }
  }
};

export { lcReducer };
