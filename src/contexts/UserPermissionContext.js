import React, { createContext, useEffect, useReducer } from "react";

// reducer - state management
import { VIEW_USER, CREATE_USER, EDIT_USER, DELETE_USER, VIEW_USER_BY_ID, CREATE_USER_GROUP, EDIT_USER_GROUP, DELETE_USER_GROUP, CREATE_USER_RIGHTS, EDIT_USER_RIGHTS, DELETE_USER_RIGHTS } from "../store/actions";
import userManagementReducer from "../store/userManagementReducer";

// project imports
import axios from "../utils/axios";
import Loader from "../ui-component/Loader";
import { useDispatch } from "react-redux";
import sendNotification from "../utils/sendNotification";

// constant
const initialState = {
  isInitialized:true,
  user_accounts: [],
  current_user_account: {},
  user_groups: [],
  current_user_group: {},
  user_rights: [],
  current_user_right: {},
};

const UserPermissionContext = createContext({
  ...initialState,
  
});

export const UserPermissionProvider = ({ children }) => {
  const globalDispatch = useDispatch();
  const [state, dispatch] = useReducer(userManagementReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const response = await axios.get("user/get-users")
        console.log(response.data)
        dispatch({
            type:VIEW_USER,
            payload:response.data.data
        })
      } catch (err) {}
    };

    init();
  }, []);

  // ================================= USER MANAGEMENT - USER =================================
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
  };

  const updateUser = async (id, data) => {
    if (data.id === -1) {
      createUser(data);
    } else {
      delete data["logo"];
      console.log(data);
      const response = await axios.put(`user/edit-user/${id}`, data);

      sendNotification({
        globalDispatch,
        success: response.data.success,
        message: response.data.message,
      });
    }
  };

  const getSelectedUser = async (id) => {
    if (!id) {
      dispatch({
        type: VIEW_USER_BY_ID,
      });
    } else {
      const response = await axios.get(`/user/get-users/${id}`);

      dispatch({
        type: VIEW_USER_BY_ID,
        payload: {
          data: response.data.data,
        },
      });
    }
  };

  const deleteUser = async (id) => {
    const response = await axios.delete(`/user/delete-user/${id}`);

    if (response.data.success) {
      dispatch({
        type: DELETE_USER,
      });
    }

    sendNotification({
      globalDispatch,
      success: response.data.success,
      message: response.data.message,
    });
  };


  // ================================= USER MANAGEMENT - USER GROUP =================================

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
  };

  const updateUserGroup = async (id, data) => {
    if (data.id === -1) {
      createUserGroup(data);
    } else {
      delete data["logo"];
      console.log(data);
      const response = await axios.put(`user/edit-user-group/${id}`, data);

      sendNotification({
        globalDispatch,
        success: response.data.success,
        message: response.data.message,
      });
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
  };




  // ================================= USER MANAGEMENT - USER RIGHTS =================================


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
  };

  const updateUserRights = async (id, data) => {
    if (data.id === -1) {
      createUserRights(data);
    } else {
      delete data["logo"];
      console.log(data);
      const response = await axios.put(`user/edit-user-right/${id}`, data);

      sendNotification({
        globalDispatch,
        success: response.data.success,
        message: response.data.message,
      });
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
  };


  if (!state.isInitialized) {
    return <Loader />;
  }

  return (
    <UserPermissionContext.Provider value={{ ...state, createUser, updateUser, getSelectedUser, deleteUser, createUserGroup, updateUserGroup, deleteUserGroup, createUserRights, updateUserRights, deleteUserRights }}>
      {children}
    </UserPermissionContext.Provider>
  );
};

export default UserPermissionContext;
