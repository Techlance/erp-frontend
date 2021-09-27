// action - state management
import {
  userManagementUserActions,
  userRightsActions,
  userManagementUserCompanyGroupActions,
  userManagementUserGroups,
} from "../actions";

//-----------------------|| USER MANAGEMENT REDUCER ||-----------------------//

// constant
const initialState = {
  user_accounts: [],
  current_user_account: { id: 0 },
  user_groups: [],
  current_user_group: { id: 0 },
  user_rights: [],
  current_user_right: { id: 0 },
  user_company_group: [],
};

const userPermissionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case userManagementUserActions.VIEW_USER: {
      return {
        ...state,
        user_accounts: action.payload,
      };
    }
    case userManagementUserActions.VIEW_USER_BY_ID: {
      return {
        ...state,
        current_user_account: action.payload.data,
      };
    }
    case userManagementUserGroups.VIEW_USER_GROUP: {
      return {
        ...state,
        user_groups: action.payload,
      };
    }
    case userManagementUserGroups.VIEW_USER_GROUP_BY_ID: {
      return {
        ...state,
        current_user_group: action.payload,
      };
    }
    case userRightsActions.VIEW_USER_RIGHTS: {
      return {
        ...state,
        user_rights: action.payload,
      };
    }
    case userRightsActions.VIEW_USER_RIGHTS_BY_ID: {
      return {
        ...state,
        current_user_right: action.payload,
      };
    }
    case userManagementUserCompanyGroupActions.VIEW_USER_COMPANY_GROUP: {
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

export { userPermissionsReducer };
