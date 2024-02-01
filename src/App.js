import React from "react";
import "./App.css";
import { Card } from "antd";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./utils/PrivateRoute";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import { connect } from "react-redux";
import "./App.css";

const App = ({ userIsValid }) => {
  return (
    <div>
      <BrowserRouter>
              
        <Routes>
                  
          <Route path="/" element={<Home />} />
                  
          <Route
            exact
            path="/dashboard"
            element={userIsValid ? <Dashboard /> : <Navigate to="/" />}
          />
                
        </Routes>
         
      </BrowserRouter>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    userIsValid: state.user,
  };
};

export default connect(mapStateToProps, null)(App);
