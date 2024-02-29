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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  const isMobile = window.innerWidth <= 768; // Check if it's a mobile device

  return (
    <div>
      {sessionExpired && (
        <div
          style={{
            backgroundImage: `url(${image3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
          }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: isMobile ? "none" : "block",
            }}>
            <Slider
              dots
              infinite
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              autoplay
              autoplaySpeed={3000}>
              <div>
                <img
                  src={image1}
                  alt="Slide 1"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div>
                <img
                  src={image2}
                  alt="Slide 2"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </Slider>
          </div>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}>
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
                      <InfoCircleOutlined
                        style={{ color: "rgba(0,0,0,.45)" }}
                      />
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
