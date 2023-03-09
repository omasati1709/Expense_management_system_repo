import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("/users/register", values);
      message.success("Registration Successful");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div className="resgister-page">
      <div className="register-form-container">
        {loading && <Spinner />}
        <Form className="login-form" layout="vertical" onFinish={submitHandler}>
          <h1>Register Form</h1>
          <Form.Item label="Name" name="name">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <div className="register-link">
          <span>Already a user?</span>
          <a href="/login">Login here</a>
        </div>
            <button className="btn btn-primary">Register</button>
          </div>
        </Form>
      </div>
      </div>
    </>
  );
};

export default Register;