import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoginCard from "./LoginCard";
import axios from "axios";
import { AuthContext } from "../AuthContext/AuthContext";
import baseURL from "../ApiUrl/Apiurl";

const SuperAdminLogin = () => {
  const [username, setUsername] = useState("");   // Changed from email to mobileNo
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
const { login } = useContext(AuthContext)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post(`${baseURL}/user-login/`, {
         username,   
        password,
      });

      const user = response.data.data;

      if (user.role === "Super Admin") {
        // Use context login instead of localStorage directly
        login("superadmin", user.user_id, {
          username: user.username,
          default_company: user.default_company,
        });

        navigate("/superadmin/company-information");
      } else {
        setError("User is not a Super Admin");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid Username or password");
    }
  };

  return (
  <LoginCard
  title="Super Admin Login"
  username={username}
  password={password}
  showPassword={showPassword}
  setUsername={setUsername}     
  setPassword={setPassword}
  setShowPassword={setShowPassword}
  handleSubmit={handleSubmit}
  error={error}
/>

  );
};

export default SuperAdminLogin;
