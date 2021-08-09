// action - state management
import {
  CREATE_USER,
  CREATE_USER_GROUP,
  CREATE_USER_RIGHTS,
  DELETE_USER,
  DELETE_USER_GROUP,
  DELETE_USER_RIGHTS,
  EDIT_USER,
  VIEW_USER_GROUP_BY_ID,
  EDIT_USER_GROUP,
  EDIT_USER_RIGHTS,
  VIEW_USER,
  VIEW_USER_BY_ID,
  VIEW_USER_GROUP,
  VIEW_USER_RIGHTS,
  VIEW_USER_RIGHTS_BY_ID,
  VIEW_USER_COMPANY_GROUP,
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
        user_groups: action.payload,
      };
    }
    case DELETE_USER_GROUP: {
      return {
        ...state,
      };
    }
    case VIEW_USER_GROUP_BY_ID: {
      return {
        ...state,
        current_user_group: action.payload,
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
        user_rights: action.payload,
      };
    }
    case DELETE_USER_RIGHTS: {
      return {
        ...state,
      };
    }
    case VIEW_USER_RIGHTS_BY_ID: {
      return {
        ...state,
        current_user_right: action.payload,
      };
    }
    case VIEW_USER_COMPANY_GROUP: {
      return {
        ...state,
        user_company_group: action.payload,
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
