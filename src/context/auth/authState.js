import { useReducer } from "react";
import axios from "axios";
import AuthReducer from "./authReducer";
import AuthContext from "./authContext";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_ERRORS,
} from "../type";
import SetAuthToken from "../../utils/SetAuthToken";

const AuthState = (props) => {
  const initialState = {
    isAuthenticated: null,
    user: null,
    token: localStorage.getItem("token"),
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //Register user
  const RegisterUser = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:2500/api/auth",
        formData,
        config
      );
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      LoadUser();
    } catch (err) {
      console.log(err.response.data);
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.error,
      });
    }
  };

  //Login User
  const LoginUser = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:2500/api/auth/login",
        formData,
        config
      );
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.data,
      });
      LoadUser();
    } catch (err) {
      console.log(err.response.data);
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.error,
      });
    }
  };

  // Logout User
  const LogoutUser = () => {
    dispatch({
      type: LOGOUT,
    });
  };
  //Clear Error
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  // Load User
  const LoadUser = async () => {
    if (localStorage.token) {
      SetAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("http://localhost:2500/api/user");
      dispatch({
        type: USER_LOADED,
        payload: res.data.user,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
        loading: state.loading,
        error: state.error,
        RegisterUser,
        clearErrors,
        LoadUser,
        LoginUser,
        LogoutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
