import { useNavigate } from "react-router-dom";
// src/components/Signup.js
import React, { useState } from "react";

import { message, Form, Input, Button } from "antd";
import { useAuth } from "../../contexts/Authcontext";

const Signup = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://capstonebackend-aifo.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();
      if (response.ok) {
        message.success("Signup successful!");
        login(data.token, data.user);
        navigate("/login");
      } else {
        message.error(data.message || "Signup failed");
      }
    } catch (error) {
      message.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onFinish={handleSubmit} layout="vertical" className="auth">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <Form.Item
        name="email"
        className="font-bold"
        type="email"
        label="Email"
        placeholder="Enter your email"
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
        className="font-bold"
        label="Password"
        placeholder="Enter your password"
        rules={[{ required: true, message: "Please enter your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="conformpassword"
        className="font-bold"
        label="Confirm Password"
        placeholder="Confirm your password"
        rules={[{ required: true, message: "Please confirm your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item gap={2}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Sign Up
        </Button>

        <Button type="link" href="/login" className="font-bold text-black">
          Already have an account?? Login here.
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Signup;
