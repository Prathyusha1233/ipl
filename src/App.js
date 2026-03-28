import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import { connect } from "react-redux";
import "./App.css";

const App = ({ userIsValid }) => {
  return (
    <BrowserRouter>
            
      <Routes>
                
        <Route path="/" element={<Home />} />
                
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
