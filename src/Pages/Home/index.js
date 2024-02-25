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
import { resetUI, validateUser } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Dashboard from "../Dashboard";
import { Modal } from "antd";

const Home = React.memo(({ dispatch, userData, apiError }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const [showDashboard, setShowDashboard] = useState(false);
  const [showSessionExpired, setShowSessionExpired] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleClick = (e) => {
    dispatch(validateUser({ payload: { email, password } }));
  };

  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      sessionStorage.setItem("userData", JSON.stringify(userData));
      setShowDashboard(true);
    }
  }, [navigate, userData]);

  console.log("userData", userData);
  console.log("apiError", apiError);

  useEffect(() => {
    if (apiError === "Invalid token") {
      dispatch(resetUI());
      setShowDashboard(false);
      setShowSessionExpired(true);
    }
  }, [apiError]);

  const handleModalLogin = () => {
    // Handle login logic
    // setModalVisible(false);
    setShowSessionExpired(false);
    // Close modal after login
  };
  return (
    <div>
      {!showDashboard && !showSessionExpired && (
        <div className="app">
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
                placeholder="Enter password"
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
      {showSessionExpired && (
        <Modal
          title="Session Expired"
          visible={showSessionExpired}
          onCancel={() => setShowSessionExpired(false)}
          footer={[
            <Button key="ogin-button" type="primary" onClick={handleModalLogin}>
              Login
            </Button>,
          ]}>
          <p>Your session has expired. Please login again.</p>
        </Modal>
      )}
      {showDashboard && <Dashboard setShowDashboard={setShowDashboard} />}
    </div>
  );
});

const mapStateToProps = (state) => {
  return { userData: state.user, apiError: state.error };
};
export default connect(mapStateToProps)(Home);
