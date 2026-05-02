// // App.js
// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
//   useNavigate,
//   Link,
// } from "react-router-dom";

// import "./App.css";
// import AuthProvider from "./AuthContext/AuthContext";

// // Pages
// import SuperAdminLogin from "./Login/Login";
// import CompanyInformation from "./Company/CompanyInformation";
// import CompanyView from "./Company/CompanyView";
// import CustomerComplaints from "./CustomerComplaints/CustomerComplaints";
// import CustomerSatisfactionSurvey from "./CustomerSatisfactionSurvey/CustomerSatisfactionSurvey";
// import ServiceCompletion from "./ServiceCompletionForm/ServiceCompletion";
// import UserManagement from "./Users/UserManagement";
// import UserView from "./Users/UserView";
// import SurveyQuestions from "./Survey/SurveyQuestions";
// import QuestionsView from "./Survey/QuestionsView";
// import Reports from "./Reports/CustomerReports";
// import SuperAdmin from "./Dashboard/SuperAdminDashboard"
// import ActivityLogs from "./ActivityLogs/ActivityLogs";
// import ErrorLogs from "./ErrorLogs/ErrorLogs";



// import logo from "./Logos/hvac-logo-new.jpg";

// // 🔹 Top Navbar
// const TopNavbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const userRole = localStorage.getItem("userRole");

//   if (userRole !== "superadmin") return null;

//   const handleLogout = () => {
//     localStorage.removeItem("userRole");
//     navigate("/");
//   };

//   const navItems = [
//     { path: "/superadmin/company-information", label: "Company Information" },
//     // { path: "/superadmin/service-completion", label: "Service Completion" },
//     // { path: "/superadmin/customer-satisfaction-survey", label: "Customer Satisfaction Survey" },
//     // { path: "/superadmin/customer-complaints", label: "Customer Complaints" },
//     { path: "/superadmin/user-management", label: "Users" },
//     { path: "/superadmin/view-questions", label: "Survey Questions" },
//     { path: "/superadmin/view-reports", label: "Reports" },
//     { path: "/superadmin/super-admin-dashboard", label:"SuperAdmin"},
//     { path: "/superadmin/Activity-logs", label:"Activity Logs"},
//     { path: "/superadmin/Error-logs", label:"Error Logs"}


//   ];

//   return (
//     <nav className="top-navbar">
//       <div className="nav-container">
//         <div className="nav-brand">
//           <img src={logo} alt="Company Logo" style={{ width: "100px", height: "50px" }} />
//         </div>
//         <div className="nav-links">
//           {navItems.map((item) => (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={location.pathname === item.path ? "active" : ""}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </div>
//         <div className="nav-user">
//           <button onClick={handleLogout} className="logout-btn">
//             Logout
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// // 🔒 Protected Layout
// const PanelLayout = ({ children }) => (
//   <>
//     <TopNavbar />
//     <div className="panel-content">{children}</div>
//   </>
// );

// // 🔒 Route Protection
// const ProtectedRoute = ({ children }) => {
//   const userRole = localStorage.getItem("userRole");
//   if (userRole !== "superadmin") {
//     return <Navigate to="/" replace />;
//   }
//   return <PanelLayout>{children}</PanelLayout>;
// };

// // 🔁 Main App
// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           {/* Public Route */}
//           <Route path="/" element={<SuperAdminLogin />} />

//           {/* Protected Routes */}
//           <Route
//             path="/superadmin/company-information"
//             element={
//               <ProtectedRoute>
//                 <CompanyInformation />
//               </ProtectedRoute>
//             }
//           />

//               <Route
//             path="/superadmin/super-admin-dashboard"
//             element={
//               <ProtectedRoute>
//                 <SuperAdmin />
//               </ProtectedRoute>
//             }
//           />


//           <Route
//             path="/companies/view/:company_id"
//             element={
//               <ProtectedRoute>
//                 <CompanyView />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/superadmin/service-completion"
//             element={
//               <ProtectedRoute>
//                 <ServiceCompletion />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/superadmin/customer-satisfaction-survey"
//             element={
//               <ProtectedRoute>
//                 <CustomerSatisfactionSurvey />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/superadmin/customer-complaints"
//             element={
//               <ProtectedRoute>
//                 <CustomerComplaints />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/superadmin/user-management"
//             element={
//               <ProtectedRoute>
//                 <UserManagement />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/users/view/:userId"
//             element={
//               <ProtectedRoute>
//                 <UserView />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/superadmin/view-questions"
//             element={
//               <ProtectedRoute>
//                 <QuestionsView />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/superadmin/survey-questions"
//             element={
//               <ProtectedRoute>
//                 <SurveyQuestions />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/superadmin/view-reports"
//             element={
//               <ProtectedRoute>
//                 <Reports />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/superadmin/Activity-logs"
//             element={
//               <ProtectedRoute>
//                 <ActivityLogs/>
//               </ProtectedRoute>
//             }
//           />

//              <Route
//             path="/superadmin/Error-logs"
//             element={
//               <ProtectedRoute>
//                 <ErrorLogs/>
//               </ProtectedRoute>
//             }
//           />

         

//           {/* Redirect unknown routes */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;


// App.js
import React, { useState, useEffect } from "react";
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
import AuthProvider from "./AuthContext/AuthContext";

// Pages
import SuperAdminLogin from "./Login/Login";
import CompanyInformation from "./Company/CompanyInformation";
import CompanyView from "./Company/CompanyView";
import CustomerComplaints from "./CustomerComplaints/CustomerComplaints";
import CustomerSatisfactionSurvey from "./CustomerSatisfactionSurvey/CustomerSatisfactionSurvey";
import ServiceCompletion from "./ServiceCompletionForm/ServiceCompletion";
import UserManagement from "./Users/UserManagement";
import UserView from "./Users/UserView";
import SurveyQuestions from "./Survey/SurveyQuestions";
import QuestionsView from "./Survey/QuestionsView";
import Reports from "./Reports/CustomerReports";
import SuperAdmin from "./Dashboard/SuperAdminDashboard"
import ActivityLogs from "./ActivityLogs/ActivityLogs";
import ErrorLogs from "./ErrorLogs/ErrorLogs";
import ProblemType from "./ProblemTypes/ProblemType";
import logo from "./Logos/hvac-logo-new.jpg";
import DataRetentionConfig from "./DataRetention/DataRetentionConfig";
import EditDataRetention from "./DataRetention/EditDataRetention";
import baseURL from "./ApiUrl/Apiurl";
import { useContext } from "react";
import { AuthContext } from "./AuthContext/AuthContext";
import ForgotPassword from "./Login/ForgotPassword";
import ChangePassword from "./ChangePassword/ChangePassword";
import ServiceItemDetails from "./ErrorLogs/ServiceItemDetails";

// 🔹 Top Navbar
const TopNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = localStorage.getItem("userRole");
  const userId = localStorage.getItem("userId");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch and set username
  useEffect(() => {
    const fetchUsername = async () => {
      if (userId) {
        try {
          const response = await fetch(`${baseURL}/users/`);
          if (response.ok) {
            const users = await response.json();
            const currentUser = users.find(user => user.user_id === userId);
            if (currentUser) {
              setUsername(currentUser.username);
            } else {
              console.warn("User not found with ID:", userId);
            }
          } else {
            console.error("Failed to fetch users");
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUsername();
  }, [userId]);

  if (userRole !== "superadmin") return null;

 const handleLogout = () => {
  logout();   // ✅ centralized logout
  navigate("/");
};

  const navItems = [
        { path: "/superadmin/super-admin-dashboard", label:"Dashboard"},
    { path: "/superadmin/company-information", label: "Company Information" },
    { path: "/superadmin/user-management", label: "Users" },
    { path: "/superadmin/view-questions", label: "Survey Questions" },
    // { path: "/superadmin/view-reports", label: "Reports" },
    { path: "/superadmin/Activity-logs", label:"Activity Logs"},
    { path: "/superadmin/Error-logs", label:"Error Logs"},
    { path: "/superadmin/problem-types", label: "Problem Types" },
     { path: "/superadmin/data-retention", label: "Data Retention" },

  ];

  return (
    <nav className="top-navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <img src={logo} alt="Company Logo" style={{ width: "100px", height: "50px" }} />
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

<div className="nav-user" style={{ position: "relative" }}>
  
  {/* 👤 Profile Icon */}
  <div
    onClick={() => setShowDropdown(!showDropdown)}
    style={{
      cursor: "pointer",
      fontSize: "20px",
      background: "#f0f0f0",
      borderRadius: "50%",
      padding: "8px 12px",
      marginRight: "10px"
    }}
  >
    👤
  </div>

  {/* Dropdown */}
  {showDropdown && (
    <div
      style={{
        position: "absolute",
        top: "40px",
        right: "0",
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "10px",
        width: "180px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        color: "#000000",
        zIndex: 1000
      }}
    >
      <div style={{ marginBottom: "8px", fontWeight: "bold" }}>
        {username || "User"}
      </div>

      <hr />

      <div
        style={{ cursor: "pointer", color: "#007bff" }}
        onClick={() => {
          navigate("/superadmin/change-password"); // ✅ path
          setShowDropdown(false);
        }}
      >
        Change Password
      </div>
    </div>
  )}

  {/* Logout Button */}
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
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<SuperAdminLogin />} />

<Route path="/superadmin-forgot-password" element={<ForgotPassword />} />
          {/* Protected Routes */}
          <Route
            path="/superadmin/company-information"
            element={
              <ProtectedRoute>
                <CompanyInformation />
              </ProtectedRoute>
            }
          />

          <Route
            path="/superadmin/super-admin-dashboard"
            element={
              <ProtectedRoute>
                <SuperAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/companies/view/:company_id"
            element={
              <ProtectedRoute>
                <CompanyView />
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
  path="/superadmin/change-password"
  element={
    <ProtectedRoute>
      <ChangePassword />
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

          <Route
            path="/users/view/:userId"
            element={
              <ProtectedRoute>
                <UserView />
              </ProtectedRoute>
            }
          />

          <Route
            path="/superadmin/view-questions"
            element={
              <ProtectedRoute>
                <QuestionsView />
              </ProtectedRoute>
            }
          />

           <Route
            path="/superadmin/data-retention"
            element={
              <ProtectedRoute>
                <DataRetentionConfig />
              </ProtectedRoute>
            }
          />

          <Route
            path="/superadmin/survey-questions"
            element={
              <ProtectedRoute>
                <SurveyQuestions />
              </ProtectedRoute>
            }
          />

          
          <Route
            path="/superadmin/editdatarentention/:id"
            element={
              <ProtectedRoute>
                <EditDataRetention />
              </ProtectedRoute>
            }
          />

          <Route
            path="/superadmin/view-reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />

          <Route
            path="/superadmin/Activity-logs"
            element={
              <ProtectedRoute>
                <ActivityLogs/>
              </ProtectedRoute>
            }
          />

          <Route
            path="/superadmin/Error-logs"
            element={
              <ProtectedRoute>
                <ErrorLogs/>
              </ProtectedRoute>
            }
          />

             <Route
            path="/superadmin/service-item-details/:id"
            element={
              <ProtectedRoute>
                <ServiceItemDetails />
              </ProtectedRoute>
            }
          />

          <Route
  path="/superadmin/problem-types"
  element={
    <ProtectedRoute>
      <ProblemType />
    </ProtectedRoute>
  }
/>


          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;