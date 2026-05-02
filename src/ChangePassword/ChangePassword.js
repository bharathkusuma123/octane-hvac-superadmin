import React, { useState, useEffect } from "react";
import baseURL from "../ApiUrl/Apiurl";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";

const ChangePassword = () => {
  const navigate = useNavigate(); 

  const userId = localStorage.getItem("userId");
  const { logout } = useContext(AuthContext);

  const [login, setLogin] = useState(""); // username
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [a1, setA1] = useState("");
  const [a2, setA2] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  // ✅ Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${baseURL}/users/`);
        const data = await res.json();

        const currentUser = data.find(
          (u) => u.user_id === userId
        );

        if (currentUser) {
          setLogin(currentUser.username); // ✅ username
          setQ1(currentUser.security_question1 || "");
          setQ2(currentUser.security_question2 || "");
          setA1(currentUser.answer1 || "");
          setA2(currentUser.answer2 || "");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (userId) fetchUser();
  }, [userId]);

  // ✅ YOUR EXACT FUNCTION (UNCHANGED)
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🔐  Super Admin Forgot Password Submit Triggered");

    if (!login || !q1 || !q2 || !a1 || !a2 || !newPassword) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please fill in all fields.",
      });
      return;
    }

    if (q1 === q2) {
      Swal.fire({
        icon: "error",
        title: "Invalid Questions",
        text: "Please select two different security questions.",
      });
      return;
    }

    const payload = {
      login,
      security_question1: q1,
      answer1: a1,
      security_question2: q2,
      answer2: a2,
      new_password: newPassword,
    };

    console.log("📤 Payload", {
      ...payload,
      new_password: "******",
    });

    try {
      const response = await fetch(`${baseURL}/user-forgot-password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        let errorMessage = "Please check your details and try again.";

        if (result?.errors?.new_password) {
          errorMessage = result.errors.new_password[0];
        } else if (result?.message) {
          errorMessage = result.message;
        } else if (result?.error) {
          errorMessage = result.error;
        }

        Swal.fire({
          icon: "error",
          title: "Reset Failed",
          text: errorMessage,
        });

        return;
      }

     Swal.fire({
  icon: "success",
  title: "Success",
  text: "Password reset successfully!",
}).then(() => {
  logout();              // ✅ CLEAR SESSION
  navigate("/");         // ✅ REDIRECT TO LOGIN
});

    } catch (err) {
      console.error("🚨 Error:", err);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div className="container mt-4">
      <h3>Change Password</h3>

      <form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>

        {/* Username */}
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={login}
            readOnly
          />
        </div>

        {/* Row 1 */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Security Question 1</label>
            <input
              type="text"
              className="form-control"
              value={q1}
              readOnly
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Answer 1</label>
            <input
              type="text"
              className="form-control"
              value={a1}
              onChange={(e) => setA1(e.target.value)}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Security Question 2</label>
            <input
              type="text"
              className="form-control"
              value={q2}
              readOnly
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Answer 2</label>
            <input
              type="text"
              className="form-control"
              value={a2}
              onChange={(e) => setA2(e.target.value)}
            />
          </div>
        </div>

       <div className="mb-3 password-field">
  <label>New Password</label>

  <div className="input-wrapper">
    <input
      type={showPassword ? "text" : "password"}
      className="form-control"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
    />

    <i
      className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"} eye-icon`}
      onClick={() => setShowPassword(!showPassword)}
    ></i>
  </div>
</div>

        <button className="btn btn-primary w-100">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;