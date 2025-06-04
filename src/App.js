// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import "./App.css";

import SuperAdminLogin from "./Login/Login";
import CompanyInformation from "./Company/CompanyInformation";
import CustomerComplaints from "./CustomerComplaints/CustomerComplaints";
import CustomerSatisfactionSurvey from "./CustomerSatisfactionSurvey/CustomerSatisfactionSurvey";
import ServiceCompletion from "./ServiceCompletionForm/ServiceCompletion";
import UserManagement from "./Users/UserManagement"

import logo from "./Logos/hvac-logo-new.jpg";

// 🔹 TopNavbar
const TopNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  if (userRole !== "superadmin") return null;

  const navItems = [
    { path: "/superadmin/company-information", label: "Company Information" },
    { path: "/superadmin/service-completion", label: "Service Completion" },
    { path: "/superadmin/customer-satisfaction-survey", label: "Customer Satisfaction Survey" },
    { path: "/superadmin/customer-complaints", label: "Customer Complaints" },
    { path: "/superadmin/user-management", label: "Users" },
  ];

  return (
    <nav className="top-navbar">
      <div className="nav-container">
         <div className="nav-brand">
            <img
                src={logo}
                alt="Company Logo"
                style={{ width: "100px", height: "50px" }}
            />
          </div>
        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? "active" : ""}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="nav-user">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

// 🔒 Protected Layout
const PanelLayout = ({ children }) => (
  <>
    <TopNavbar />
    <div className="panel-content">{children}</div>
  </>
);

// 🔒 Route Protection
const ProtectedRoute = ({ children }) => {
  const userRole = localStorage.getItem("userRole");
  if (userRole !== "superadmin") {
    return <Navigate to="/" replace />;
  }
  return <PanelLayout>{children}</PanelLayout>;
};

// 🔁 Main App
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SuperAdminLogin />} />
        <Route
          path="/superadmin/company-information"
          element={
            <ProtectedRoute>
              <CompanyInformation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/superadmin/service-completion"
          element={
            <ProtectedRoute>
              <ServiceCompletion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/superadmin/customer-satisfaction-survey"
          element={
            <ProtectedRoute>
              <CustomerSatisfactionSurvey />
            </ProtectedRoute>
          }
        />
        <Route
          path="/superadmin/customer-complaints"
          element={
            <ProtectedRoute>
              <CustomerComplaints />
            </ProtectedRoute>
          }
        />

        <Route
          path="/superadmin/user-management"
          element={
            <ProtectedRoute>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
