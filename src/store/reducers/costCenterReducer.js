// action - state management
import {
  GET_COST_CATEGORY,
  UPDATE_COST_CATEGORY,
  CREATE_COST_CATEGORY,
  DELETE_COST_CATEGORY,
  GET_COST_CENTER,
  GET_COST_CENTER_DETAILS,
  UPDATE_COST_CENTER,
  CREATE_COST_CENTER,
  DELETE_COST_CENTER,
} from "../actions";
//-----------------------|| COST CENTER REDUCER ||-----------------------//

// constant
const initialState = {
  cost_category: null,
  cost_center: null,
  cost_center_details: null,
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
    case GET_COST_CENTER: {
      return {
        ...state,
        cost_center: action.payload,
      };
    }
    case GET_COST_CENTER_DETAILS: {
      return {
        ...state,
        cost_center_details: action.payload,
      };
    }
    case UPDATE_COST_CENTER: {
      return {
        ...state,
      };
    }
    case CREATE_COST_CENTER: {
      return {
        ...state,
      };
    }
    case DELETE_COST_CENTER: {
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
