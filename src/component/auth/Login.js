import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/AlertContext";
import AuthContext from "../../context/auth/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { LoginUser, error, clearErrors, isAuthenticated } = authContext;

  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error !== null) {
      alertContext.setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, navigate]);

  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alertContext.setAlert("Please enter all fields", "danger");
    } else {
      LoginUser({
        email,
        password,
      });
    }
  };
  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>{" "}
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            autoComplete="false"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Login;
