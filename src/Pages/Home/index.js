import React from "react";
import { Card } from "antd";
import "./home.css";
import GoogleLoginComp from "../../Components/GoogleLoginComp";
import { Input, Tooltip, Button } from "antd";
import {
  InfoCircleOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

const Home = () => {
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
            prefix={<UserOutlined className="site-form-item-icon" />}
            suffix={
              <Tooltip title="Extra information">
                <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
          />
          <Input.Password
            placeholder="Enter password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <Button className="login-button" type="text">
            Login
          </Button>
          {/* <GoogleLoginComp /> */}
        </Card>
      </div>
    </div>
  );
};

export default Home;
