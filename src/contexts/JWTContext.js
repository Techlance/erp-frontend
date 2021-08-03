import React, { createContext, useEffect, useReducer } from "react";

// third-party
import jwtDecode from "jwt-decode";

// reducer - state management
import { ACCOUNT_INITIALIZE, LOGIN, LOGOUT } from "../store/actions";
import accountReducer from "../store/accountReducer";

// project imports
import axios from "../utils/axios";
import Loader from "../ui-component/Loader";
import sendNotification from "../utils/sendNotification";
import { useDispatch } from "react-redux";

// constant
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
};

const verifyToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);
  return decoded.exp > Date.now() / 1000;
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = accessToken;
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

//-----------------------|| JWT CONTEXT & PROVIDER ||-----------------------//

const JWTContext = createContext({
  ...initialState,
});

export const JWTProvider = ({ children }) => {
  const globalDispatch = useDispatch();

  const [state, dispatch] = useReducer(accountReducer, initialState);

  const login = async (email, password) => {
    const response = await axios.post("/user/login", {
      email,
      password,
    });

    if (response.data.success) {
      const { accessToken, user } = response.data.data;
      setSession(accessToken);
      dispatch({
        type: LOGIN,
        payload: {
          user,
        },
      });
      sendNotification({
        globalDispatch,
        success: response.data.success,
        message: response.data.message,
      });
    } else {
      sendNotification({
        globalDispatch,
        success: response.data.success,
        message: response.data.message,
      });
    }
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        if (accessToken && verifyToken(accessToken)) {
          setSession(accessToken);
          const response = await axios.get("/user/me");
          const { user } = response.data.data;
          dispatch({
            type: ACCOUNT_INITIALIZE,
            payload: {
              isLoggedIn: true,
              user,
            },
          });
        } else {
          dispatch({
            type: ACCOUNT_INITIALIZE,
            payload: {
              isLoggedIn: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: ACCOUNT_INITIALIZE,
          payload: {
            isLoggedIn: false,
            user: null,
          },
        });
      }
    };

    init();
  }, []);

  if (!state.isInitialized) {
    return <Loader />;
  }

  return (
    <JWTContext.Provider value={{ ...state, login, logout }}>
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;
