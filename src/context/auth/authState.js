import { useReducer } from "react";
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
  CLEAR_ERRORS
} from "../type";

const AuthState = (props) => {
  const initialState = {
    isAuthenticated: null,
    user: null,
    token: localStorage.getItem("token"),
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthContext.Provider value={{
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      token: state.token,
      loading: state.loading,
      error: state.error,
    }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;