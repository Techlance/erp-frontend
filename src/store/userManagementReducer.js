// action - state management
import {
  CREATE_USER,
  CREATE_USER_GROUP,
  CREATE_USER_RIGHTS,
  DELETE_USER,
  DELETE_USER_GROUP,
  DELETE_USER_RIGHTS,
  EDIT_USER,
  EDIT_USER_GROUP,
  EDIT_USER_RIGHTS,
  VIEW_USER,
  VIEW_USER_BY_ID,
  VIEW_USER_GROUP,
  VIEW_USER_RIGHTS,
} from "./actions";

//-----------------------|| USER MANAGEMENT REDUCER ||-----------------------//

const userManagementReducer = (state, action) => {
  switch (action.type) {
    case CREATE_USER: {
      return {
        ...state,
      };
    }
    case EDIT_USER: {
      return {
        ...state,
      };
    }
    case VIEW_USER: {
      return {
        ...state,
        user_accounts: action.payload,
      };
    }
    case DELETE_USER: {
      return {
        ...state,
      };
    }
    case VIEW_USER_BY_ID: {
      return {
        ...state,
        current_user_account: action.payload.data,
      };
    }
    case CREATE_USER_GROUP: {
      return {
        ...state,
      };
    }
    case EDIT_USER_GROUP: {
      return {
        ...state,
      };
    }
    case VIEW_USER_GROUP: {
      return {
        ...state,
      };
    }
    case DELETE_USER_GROUP: {
      return {
        ...state,
      };
    }
    case CREATE_USER_RIGHTS: {
      return {
        ...state,
      };
    }
    case EDIT_USER_RIGHTS: {
      return {
        ...state,
      };
    }
    case VIEW_USER_RIGHTS: {
      return {
        ...state,
      };
    }
    case DELETE_USER_RIGHTS: {
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

export default userManagementReducer;
