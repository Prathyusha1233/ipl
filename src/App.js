import React from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import { connect } from "react-redux";
import "./App.css";

const App = ({ userIsValid }) => {
  return (
    <BrowserRouter>
            
      <Routes>
                
        <Route path="/" element={<Home />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                
        {/* <Route
            exact
            path="/dashboard"
            element={
              Object.keys(userIsValid).length > 0 ? (
                <Dashboard />
              ) : (
                <Navigate to="/" />
              )
            } 
          />        */}
      </Routes>
       
    </BrowserRouter>
  );
};
const mapStateToProps = (state) => {
  return {
    userIsValid: state.user,
  };
};

export default connect(mapStateToProps, null)(App);
