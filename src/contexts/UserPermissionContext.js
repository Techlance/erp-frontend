import React, { createContext, useEffect, useState } from "react";

// reducer - state management
import {
  VIEW_USER_GROUP_BY_ID,
  VIEW_USER_RIGHTS_BY_ID,
} from "../store/actions";

// project imports
import Loader from "../ui-component/Loader";
import { useDispatch, useSelector } from "react-redux";

import {
  // User Rights
  createUserRightsAsync,
  deleteUserRightsAsync,
  getUserRightsAsync,
  updateUserRightsAsync,

  // User Accounts
  createUserAccountAsync,
  deleteUserAccountAsync,
  getUserAccountByIDAsync,
  getUserAccountsAsync,
  updateUserAccountAsync,

  // User Company Groups API
  getUserCompanyGroupByID,
  updateUserCompanyGroupAsync,
  createUserCompanyGroupAsync,

  // User Groups API
  getUserGroupsAsync,
  createUserGroupAsync,
  updateUserGroupAsync,
  deleteUserGroupAsync,
} from "../api";

const UserPermissionContext = createContext();

export const UserPermissionProvider = ({ children }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.userPermissions);

  const [loading] = useState(false);

  useEffect(() => {
    getUser();
    getUserGroups();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ================================= USER MANAGEMENT - USER =================================

  const getUser = async () => {
    await getUserAccountsAsync(dispatch);
  };

  const createUser = async (data) => {
    await createUserAccountAsync(data, dispatch);

    await getUserAccountsAsync(dispatch);
  };

  const updateUser = async (data) => {
    if (data.id === 0) {
      await createUserAccountAsync(data, dispatch);
    } else {
      await updateUserAccountAsync(data, dispatch);

      await getUserAccountsAsync(dispatch);
    }
  };

  const getSelectedUserAccount = async (id) => {
    await getUserAccountByIDAsync(id, dispatch);
  };

  const deleteUser = async (id) => {
    await deleteUserAccountAsync(id, dispatch);

    await getUserAccountsAsync(dispatch);
  };

  // ================================= USER MANAGEMENT - USER GROUP =================================

  const getUserGroups = async () => {
    await getUserGroupsAsync(dispatch);
  };

  const getUserCompanyGroup = async (id) => {
    await getUserCompanyGroupByID(id, dispatch);
  };

  const updateUserCompanyGroup = async (data) => {
    await updateUserCompanyGroupAsync(data, dispatch);

    await getUserCompanyGroupByID(state.current_user_account.id, dispatch);
  };

  const addUserCompanyGroup = async (data) => {
    await createUserCompanyGroupAsync(data, dispatch);

    await getUserCompanyGroupByID(state.current_user_account.id, dispatch);
  };

  const createUserGroup = async (data) => {
    await createUserGroupAsync(data, dispatch);

    await getUserGroupsAsync(dispatch);
  };

  const updateUserGroup = async (id, data) => {
    if (id === 0) {
      await createUserGroupAsync(data, dispatch);
    } else {
      await updateUserGroupAsync(id, data, dispatch);

      await getUserGroupsAsync(dispatch);
    }
  };

  const deleteUserGroup = async (id) => {
    await deleteUserGroupAsync(id, dispatch);

    await getUserGroupsAsync(dispatch);
  };

  const getSelectedUserGroup = async (id) => {
    if (!id) {
      return;
    }

    const userGroup = state.user_groups.find((item) => item.id === id);

    dispatch({
      type: VIEW_USER_GROUP_BY_ID,
      payload: userGroup,
    });
  };

  /* ========================= USER MANAGEMENT - USER RIGHTS ========================= */

  const createUserRights = async (data) => {
    await createUserRightsAsync(data, dispatch);

    await getUserRightsAsync(dispatch);
  };

  const updateUserRights = async (data) => {
    if (data.id === 0) {
      await createUserRightsAsync(data, dispatch);
    } else {
      await updateUserRightsAsync(data, dispatch);
    }

    await getUserRightsAsync(dispatch);
  };

  const deleteUserRights = async (id) => {
    await deleteUserRightsAsync(id, dispatch);

    await getUserRightsAsync(dispatch);
  };

  const getSelectedUserRight = async (id) => {
    if (!id) {
      return;
    }

    const userRight = state.user_rights.find((item) => item.id === id);

    dispatch({
      type: VIEW_USER_RIGHTS_BY_ID,
      payload: userRight,
    });
  };

  // ================================= USER MANAGEMENT - END =================================

  if (loading) {
    return <Loader />;
  }

  return (
    <UserPermissionContext.Provider
      value={{
        createUser,
        updateUser,
        deleteUser,
        getSelectedUserAccount,
        createUserGroup,
        updateUserGroup,
        deleteUserGroup,
        getSelectedUserGroup,
        createUserRights,
        updateUserRights,
        deleteUserRights,
        getSelectedUserRight,
        getUserCompanyGroup,
        updateUserCompanyGroup,
        addUserCompanyGroup,
      }}
    >
      {children}
    </UserPermissionContext.Provider>
  );
};

export default UserPermissionContext;
