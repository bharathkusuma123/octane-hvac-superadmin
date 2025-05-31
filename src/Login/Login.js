import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginCard from "./LoginCard";
import axios from "axios";

const SuperAdminLogin = () => {
  const [username, setUsername] = useState("");   // Changed from email to mobileNo
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post("http://175.29.21.7:8006/user-login/", {
         username,   
        password,
      });

      const user = response.data.data;

      if (user.role === "Super Admin") {
        localStorage.setItem("userRole", "superadmin");
      
      navigate("/superadmin/company-information");
      } else {
        setError("User is not an Super Admin");
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
