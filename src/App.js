import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Navbar from "./component/layouts/Navbar";
import About from "./component/pages/About";
import Home from "./component/pages/Home";
import ContactState from "./context/contact/contactState";

const App = () => {
  return (
    <ContactState>
      <Router>
        <Fragment>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </Fragment>
      </Router>
    </ContactState>
  );
};

export default App;
