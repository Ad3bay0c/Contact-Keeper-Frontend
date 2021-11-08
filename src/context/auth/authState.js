import { useReducer } from "react";
import authReducer from "./authReducer";
import AuthContext from "./authContext";

const AuthState = (props) => {
  const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={}>
      {props.children}
    </AuthContext.Provider>
  );
};
