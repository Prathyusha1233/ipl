import React, { Component } from "react";
import "./index.css";
import { Button, Space } from "antd";
import { googleLogout } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { resetUI } from "../../actions/userActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Layout, Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const { Header } = Layout;

const NavBar = ({ resetUI }) => {
  const navigate = useNavigate();
  const logOut = () => {
    googleLogout();
    resetUI();
    navigate("/home");
  };
  return (
    <div className="navbar">
      <img src="/logo3.png" alt="Logo" />
      <span className="test">FPL-2</span>
      <div className="sign-out">
        <Button
          className="sign-out-btn"
          onClick={logOut}
          //type="primary"
          icon={<LogoutOutlined style={{ fontSize: "16px" }} />}></Button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      resetUI,
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(NavBar);
