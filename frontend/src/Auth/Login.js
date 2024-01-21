import React, { useState } from "react";
import Input from "../Components//Input";
import Button from "../Components/Button";
import "./style.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [status, setStatus] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      if ( !email || !password) {
        setStatus(409);
        setResponseMessage("All fields are required");
        return;
      }
      // Email syntax validation
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
      // Your API endpoint URL
      const apiUrl = `${process.env.REACT_APP_API_URL}/user/login`;
      // Your request payload
      const requestData = {
        email: email,
        password: password,
      };
      // Make a POST request to the API endpoint
      const response = await axios.post(apiUrl, requestData);
      if (response.status == 200) {
        setEmail("");
        setPassword("");
        setStatus(response.data.status);
        localStorage.setItem("token", "Bearer " + response.data.data);
        setResponseMessage(response.data.message);
        navigate("/movie-page");
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
        <div className="alert alert-danger msgDiv" role="alert" >
          {responseMessage}
        </div>
      )}
        <h2 className="bold mb-5">Sign In</h2>
        <form
          onSubmit={handleLogin}
          class="d-flex flex-column gap-3 mx-auto custome-w"
        >
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
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                class="me-2 checkbox "
              />
              <span className="checkbox-text">Remember Me</span>
            </div>
            <div>
              <Link to="/register">Don't have an account? Register</Link>
            </div>
          </div>
          <div>
            <Button onClick={handleLogin}>Login</Button>
          </div>
        </form>
      </div>

  );
}
