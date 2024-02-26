import React, { useEffect, useState } from "react";
import { Card } from "antd";
import "./home.css";
import { Input, Tooltip, Button } from "antd";
import {
  InfoCircleOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { setSessionExpired, validateUser } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Dashboard from "../Dashboard";

const Home = React.memo(({ dispatch, userData, sessionExpired }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleClick = (e) => {
    dispatch(validateUser({ payload: { email, password } }));
  };

  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      sessionStorage.setItem("userData", JSON.stringify(userData));
      dispatch(setSessionExpired(false));
    }
  }, [navigate, userData]);

  return (
    <div>
      {sessionExpired && (
        <div className="app">
          <div className="login-card-container">
            <Card
              className="login-card"
              title="Please login"
              headStyle={{ color: "#ffffff" }}>
              <Input
                tabIndex="-1"
                style={{ outline: "none" }}
                placeholder="Enter your username"
                className="username"
                onChange={handleEmailChange}
                prefix={<UserOutlined className="site-form-item-icon" />}
                suffix={
                  <Tooltip title="Extra information">
                    <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                  </Tooltip>
                }
              />
              <Input.Password
                tabIndex="-1"
                style={{ outline: "none" }}
                placeholder="Enter 4-digit PIN"
                type="number"
                onChange={handlePasswordChange}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              <Button
                className="login-button"
                type="text"
                onClick={handleClick}>
                Login
              </Button>
            </Card>
          </div>
        </div>
      )}
      {!sessionExpired && <Dashboard />}
    </div>
  );
});

const mapStateToProps = (state) => {
  return { userData: state.user, sessionExpired: state.isSessionExpired };
};
export default connect(mapStateToProps)(Home);
