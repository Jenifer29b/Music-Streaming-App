import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import { message, Form, Input, Button } from "antd";
import { useAuth } from "../../contexts/Authcontext";

const Login = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://capstonebackend-aifo.onrender.com /api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();
      if (response.ok) {
        message.success("Login successful!");
        login(data.token, data.user);
        navigate("/app");
      } else {
        message.error(data.message || "Login failed");
      }
    } catch (error) {
      message.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onFinish={handleSubmit} layout="vertical">
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            type: "email",
            message: "Please enter a valid email!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please enter your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          // onClick={ () => navigate("/play")}
        >
          Log In
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
