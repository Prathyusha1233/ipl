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
  console.log("userIsValid", Object.keys(userIsValid).length);
  return (
    <div>
      <BrowserRouter>
              
        <Routes>
                  
          <Route path="/" element={<Home />} />
                  
          <Route
            exact
            path="/dashboard"
            element={
              Object.keys(userIsValid).length > 0 ? (
                <Dashboard />
              ) : (
                <Navigate to="/" />
              )
            }
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
