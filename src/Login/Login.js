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
  const [loading, setLoading] = useState(false);  // Added loading state
  const { login } = useContext(AuthContext)
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const response = await axios.post(`${baseURL}/user-login/`, {
      username,
      password,
    });

    const user = response.data.data;
    const sessionId = response.data.data.session_id; // ✅ get session_id

    if (user.role === "Super Admin") {
      // ✅ Store session_id in localStorage
      localStorage.setItem("session_id", sessionId);

      login("superadmin", user.user_id, {
        username: user.username,
        default_company: user.default_company,
      });

      navigate("/superadmin/super-admin-dashboard");
    } else {
      setError("User is not a Super Admin");
    }
  } catch (err) {
    console.error("Login error:", err);
    setError(err.response?.data?.message || "Invalid Username or password");
  } finally {
    setLoading(false);
  }
};

  return (
    <LoginCard
      title="Super Admin Login"
      username={username}
      password={password}
      showPassword={showPassword}
      loading={loading}  // Pass loading prop
      setUsername={setUsername}     
      setPassword={setPassword}
      setShowPassword={setShowPassword}
      handleSubmit={handleSubmit}
      error={error}
      navigate={navigate}  
    />
  );
};

export default SuperAdminLogin;