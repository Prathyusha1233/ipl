import React from "react";
import { Card } from "antd";
import "./index.css";
import GoogleLoginComp from "../../Components/GoogleLoginComp";

const Home = () => {
  return (
    <div className="app">
      <div className="login-card-container">
        <Card
          className="login-card"
          title="Please login with your Gmail."
          headStyle={{ color: "#ffffff" }}>
          <GoogleLoginComp />
        </Card>
      </div>
    </div>
  );
};

export default Home;
