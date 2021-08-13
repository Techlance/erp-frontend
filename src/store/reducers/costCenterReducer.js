// action - state management
import {
  GET_COST_CATEGORY,
  UPDATE_COST_CATEGORY,
  CREATE_COST_CATEGORY,
  DELETE_COST_CATEGORY,
} from "../actions";
//-----------------------|| COST CENTER REDUCER ||-----------------------//

// constant
const initialState = {
  cost_category: null,
};

const costCenterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COST_CATEGORY: {
      return {
        ...state,
        cost_category: action.payload,
      };
    }
    case UPDATE_COST_CATEGORY: {
      return {
        ...state,
      };
    }
    case CREATE_COST_CATEGORY: {
      return {
        ...state,
      };
    }
    case DELETE_COST_CATEGORY: {
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

export { costCenterReducer };
