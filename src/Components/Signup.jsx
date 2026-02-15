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
      <div className="w-full absolute top-6 flex justify-center">
        <h1 className="text-5xl font-serif">Music World</h1>
      </div>

      <h1 className="text-3xl font-bold mb-4">Create an account</h1>
      <Form.Item
        name="email"
        className="font-bold"
        type="email"
        placeholder="Enter your email"
        rules={[
          {
            required: true,
            type: "email",
            message: "Please enter a valid email!",
          },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        className="font-bold"
        placeholder="Enter your password"
        rules={[{ required: true, message: "Please enter your password!" }]}
      >
        <Input.Password placeholder=" Password" />
      </Form.Item>
      <Form.Item
        name="conformpassword"
        className="font-bold"
        placeholder="Confirm your password"
        rules={[{ required: true, message: "Please confirm your password!" }]}
      >
        <Input.Password placeholder="Confirm Password" />
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
