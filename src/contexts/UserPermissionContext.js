import React, { createContext, useEffect, useReducer, useState } from "react";

// reducer - state management
import {
  VIEW_USER,
  CREATE_USER,
  DELETE_USER,
  VIEW_USER_BY_ID,
  CREATE_USER_GROUP,
  DELETE_USER_GROUP,
  CREATE_USER_RIGHTS,
  DELETE_USER_RIGHTS,
  VIEW_USER_GROUP,
  VIEW_USER_RIGHTS,
  VIEW_USER_GROUP_BY_ID,
  VIEW_USER_RIGHTS_BY_ID,
  VIEW_USER_COMPANY_GROUP,
} from "../store/actions";
import userManagementReducer from "../store/userManagementReducer";

// project imports
import axios from "../utils/axios";
import Loader from "../ui-component/Loader";
import { useDispatch } from "react-redux";
import sendNotification from "../utils/sendNotification";

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

const UserPermissionContext = createContext({
  ...initialState,
});

export const UserPermissionProvider = ({ children }) => {
  const globalDispatch = useDispatch();
  const [state, dispatch] = useReducer(userManagementReducer, initialState);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUser();
    getUserGroups();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ================================= USER MANAGEMENT - USER =================================

  const getUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/user/get-users");
      dispatch({
        type: VIEW_USER,
        payload: response.data.data,
      });
      setLoading(false);

      if (!response.data.success) {
        sendNotification({
          globalDispatch,
          success: response.data.success,
          message: response.data.message,
        });
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const createUser = async (data) => {
    const response = await axios.post("/user/add-user", data);

    dispatch({
      type: CREATE_USER,
    });

    sendNotification({
      globalDispatch,
      success: response.data.success,
      message: response.data.message,
    });

    getUser();
  };

  const updateUser = async (data) => {
    if (data.id === 0) {
      delete data.id;
      createUser(data);
    } else {
      const response = await axios.put(`/user/edit-user/${data.id}`, data);

      sendNotification({
        globalDispatch,
        success: response.data.success,
        message: response.data.message,
      });
      getUser();
    }
  };

  const getSelectedUserAccount = async (id) => {
    if (!id) {
      return;
    }
    const response = await axios.get(`/user/get-users/${id}`);

    dispatch({
      type: VIEW_USER_BY_ID,
      payload: {
        data: response.data.data,
      },
    });
  };

  const deleteUser = async (id) => {
    const response = await axios.delete(`/user/delete-user/${id}`);

    if (response.data.success) {
      dispatch({
        type: DELETE_USER,
      });
    }

    getUser();

    sendNotification({
      globalDispatch,
      success: response.data.success,
      message: response.data.message,
    });
  };

  // ================================= USER MANAGEMENT - USER GROUP =================================

  const getUserGroups = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/user/get-user-group");

      dispatch({
        type: VIEW_USER_GROUP,
        payload: response.data.data,
      });
      setLoading(false);

      if (!response.data.success) {
        sendNotification({
          globalDispatch,
          success: response.data.success,
          message: response.data.message,
        });
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const getUserCompanyGroup = async (id) => {
    if (!id) {
      return;
    }

    const response = await axios.get(`/company/get-user-company-group/${id}`);

    dispatch({
      type: VIEW_USER_COMPANY_GROUP,
      payload: response.data.data,
    });
  };

  const updateUserCompanyGroup = async (data) => {
    const response = await axios.put(
      `/company/edit-user-company/${data.id}`,
      data
    );

    sendNotification({
      globalDispatch,
      success: response.data.success,
      message: response.data.message,
    });

    getUserCompanyGroup(state.current_user_account.id);
  };

  const addUserCompanyGroup = async (data) => {
    const response = await axios.post("/company/add-user-company", data);

    sendNotification({
      globalDispatch,
      success: response.data.success,
      message: response.data.message,
    });

    getUserCompanyGroup(state.current_user_account.id);
  };

  const createUserGroup = async (data) => {
    const response = await axios.post("/user/add-user-group", data);

    dispatch({
      type: CREATE_USER_GROUP,
    });

    sendNotification({
      globalDispatch,
      success: response.data.success,
      message: response.data.message,
    });

    getUserGroups();
  };

  const updateUserGroup = async (id, data) => {
    if (id === 0) {
      createUserGroup(data);
    } else {
      delete data.id;
      const response = await axios.put(`/user/edit-user-group/${id}`, data);

      sendNotification({
        globalDispatch,
        success: response.data.success,
        message: response.data.message,
      });
      getUserGroups();
    }
  };

  const deleteUserGroup = async (id) => {
    const response = await axios.delete(`/user/delete-user-group/${id}`);

    if (response.data.success) {
      dispatch({
        type: DELETE_USER_GROUP,
      });
    }

    sendNotification({
      globalDispatch,
      success: response.data.success,
      message: response.data.message,
    });

    getUserGroups();
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

  // ================================= USER MANAGEMENT - USER RIGHTS =================================

  const getUserRights = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/user/get-user-right");

      dispatch({
        type: VIEW_USER_RIGHTS,
        payload: response.data.data,
      });
      setLoading(false);

      if (!response.data.success) {
        sendNotification({
          globalDispatch,
          success: response.data.success,
          message: response.data.message,
        });
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const createUserRights = async (data) => {
    const response = await axios.post("/user/add-user-right", data);

    dispatch({
      type: CREATE_USER_RIGHTS,
    });

    sendNotification({
      globalDispatch,
      success: response.data.success,
      message: response.data.message,
    });

    getUserRights();
  };

  const updateUserRights = async (data) => {
    if (data.id === 0) {
      createUserRights(data);
    } else {
      // const form = dataToForm(data)
      const response = await axios.put(
        `/user/edit-user-right/${data.id}`,
        data
      );

      sendNotification({
        globalDispatch,
        success: response.data.success,
        message: response.data.message,
      });

      // getUserRights();
    }
  };

  const deleteUserRights = async (id) => {
    const response = await axios.delete(`/user/delete-user-right/${id}`);

    if (response.data.success) {
      dispatch({
        type: DELETE_USER_RIGHTS,
      });
    }

    sendNotification({
      globalDispatch,
      success: response.data.success,
      message: response.data.message,
    });

    getUserRights();
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
        ...state,
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
