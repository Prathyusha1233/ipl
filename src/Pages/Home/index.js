import React, { useEffect, useState } from "react";
import { Card } from "antd";
import "./home.scss";
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
import image1 from "../../images/csk.jpg";
import image2 from "../../images/srh1.png";
import image3 from "../../images/iplcup.jpeg";

const Home = React.memo(({ dispatch, userData, sessionExpired }) => {
  const backgroundImageOptions = [
    image1,
    image2,
    // Add more image paths as needed
  ];

  // Select a random image path
  const randomBackgroundImage =
    backgroundImageOptions[
      Math.floor(Math.random() * backgroundImageOptions.length)
    ];

  const isMobile = window.innerWidth <= 767;

  console.log(isMobile);

  const containerStyle = !isMobile
    ? {
        backgroundImage: `url(${randomBackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
        width: "100%",
        position: "fixed",
        top: "0",
      }
    : {
        backgroundImage: `url(${image3})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      };

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
        <div style={containerStyle}>
          <div className="login-card-container">
            <Card
              className="login-card"
              title="Please login"
              headStyle={{ color: "#ffffff" }}>
              <Input
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
