import React, { createContext, useEffect, useReducer } from "react";

// reducer - state management
import { VIEW_USER } from "../store/actions";
import userManagementReducer from "../store/userManagementReducer";

// project imports
import axios from "../utils/axios";
import Loader from "../ui-component/Loader";

// constant
const initialState = {
  user_accounts: [],
  current_user_account: {},
  user_groups: [],
  current_user_group: {},
  user_rights: [],
  current_user_right: {},
};

const UserPermissionContext = createContext({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => {},
});

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userManagementReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        dispatch({
          type: VIEW_USER,
        });
      } catch (err) {}
    };

    init();
  }, []);

  if (!state.isInitialized) {
    return <Loader />;
  }

  return (
    <UserPermissionContext.Provider value={{ ...state }}>
      {children}
    </UserPermissionContext.Provider>
  );
};

export default UserPermissionContext;
