import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const ValidateUser = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [validUser, setValidUser] = useState({});
  const { user } = props;
  useEffect(() => {
    axios
      .get(
        "http://localhost:8080/validate-user?emailId=naraharisreeja123@gmail.com"
      )
      .then((response) => {
        setValidUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return <div>{validUser && navigate("/dashboard", { state: user })}</div>;
};

export default ValidateUser;
