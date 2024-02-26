import React from "react";
import "./index.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { resetUI, setSessionExpired } from "../../actions/userActions";
import { connect } from "react-redux";
import { LogoutOutlined } from "@ant-design/icons";

const NavBar = ({ dispatch }) => {
  const navigate = useNavigate();
  const logOut = () => {
    dispatch(resetUI());
    dispatch(setSessionExpired(true));
    window.history.replaceState(null, "", "/");
  };

  return (
    <div className="navbar">
      <img src="/logo3.png" alt="Logo" />
      <span className="test">FPL-2</span>
      <div className="sign-out">
        <Button
          className="sign-out-btn"
          onClick={logOut}
          icon={<LogoutOutlined style={{ fontSize: "16px" }} />}></Button>
      </div>
    </div>
  );
};

export default connect(null, null)(NavBar);
