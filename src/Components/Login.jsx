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
        "https://capstonebackend-aifo.onrender.com/api/auth/login",
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
      <div className="w-full absolute top-5 flex justify-center">
        <h1 className="text-4xl font-serif">Music World</h1>
      </div>

      <h1 className="text-2xl font-bold mb-4">Log In</h1>
      <Form.Item
        className="font-bold"
        name="email"
        rules={[
          {
            required: true,

            message: "Please enter a valid email!",
          },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        className="font-bold"
        name="password"
        rules={[{ required: true, message: "Please enter your password!" }]}
      >
        <Input.Password placeholder="Password" />
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
