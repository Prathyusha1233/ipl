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
import { validateUser, resetUI } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const Home = React.memo(({ dispatch, userData }) => {
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
    // if (Object.keys(userData).length > 0) {
    //   navigate("/dashboard");
    // }
  };

  // useEffect(() => {
  //   navigate("/dashboard");

  //   // return () => {
  //   //   second;
  //   // };
  // }, [userData]);
  console.log("test1", userData);
  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      console.log("test", userData);
      navigate("/dashboard");
    }
    return () => {
      resetUI();
    };
  }, [userData]);

  return (
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
          <Button className="login-button" type="text" onClick={handleClick}>
            Login
          </Button>
        </Card>
      </div>
    </div>
  );
});

const mapStateToProps = (state) => {
  return { userData: state.user };
};
export default connect(mapStateToProps)(Home);
