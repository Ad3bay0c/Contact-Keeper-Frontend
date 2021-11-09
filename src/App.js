import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Navbar from "./component/layouts/Navbar";
import About from "./component/pages/About";
import Home from "./component/pages/Home";
import ContactState from "./context/contact/contactState";
import AuthState from "./context/auth/authState";
import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import AlertState from "./context/alert/AlertState";
import Alert from "./component/layouts/Alert";
import SetAuthToken from "./utils/SetAuthToken";

if (localStorage.token) {
  SetAuthToken(localStorage.token);
}
const App = () => {
  return (
    <AlertState>
      <AuthState>
        <ContactState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alert />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </div>
            </Fragment>
          </Router>
        </ContactState>
      </AuthState>
    </AlertState>
  );
};

export default App;
