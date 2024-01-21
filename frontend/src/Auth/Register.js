// RegisterForm.js - Register Form Component
import React, { useState } from "react";
import Input from "../Components//Input";
import Button from "../Components/Button";
import "../App.css";
import "./style.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [status, setStatus] = useState("");
  // const [rememberMe, setRememberMe] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // const handleRememberMeChange = () => {
  //   setRememberMe(!rememberMe);
  // };

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      if (!name || !email || !password || !confirmPassword) {
        setStatus(409);
        setResponseMessage("All fields are required");
        return;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setStatus(409);
        setResponseMessage("Invalid email syntax");
        return;
      }

      // Password length validation
      if (password.length < 6) {
        setStatus(409);
        setResponseMessage("Password should be at least 6 characters long");
        return;
      }
      if (password !== confirmPassword) {
        setStatus(409);
        setResponseMessage("Password and Confirm Password do not match");
        return;
      }
      // Your API endpoint URL
      const apiUrl = `${process.env.REACT_APP_API_URL}/user/register`;
      // Your request payload
      const requestData = {
        user_name: name,
        email: email,
        password: password,
        confirm_password: confirmPassword,
      };
      // Make a POST request to the API endpoint
      const response = await axios.post(apiUrl, requestData);
      if (response.status == 200) {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setStatus(response.data.status);
        setResponseMessage(response.data.message);
        navigate("/");
      }
    } catch (error) {
      setStatus(error.response.data.status);
      setResponseMessage(error.response.data.message);
    }
  };

  return (
      <div className="LoginForm">
      {status == 200 && (
        <div className="alert alert-primary msgDiv" role="alert" >
          {responseMessage}
        </div>
      )}
      {status == 409 && (
        <div className="alert alert-danger msgDiv" role="alert">
          {responseMessage}
        </div>
      )}
        <h2 className="bold mb-5">Register</h2>
        <form
          onSubmit={handleRegister}
          class="d-flex flex-column gap-3 mx-auto custome-w"
        >
          <div>
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          <div className="text-start">
            <Link to="/">Already have an account? Login</Link>
          </div>
          <div>
            <Button onClick={handleRegister}>Register</Button>
          </div>
        </form>
      </div>
  );
}
