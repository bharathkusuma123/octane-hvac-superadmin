// import React, { useEffect, useState } from "react";
// import { Bar, Doughnut } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import "./SuperAdminDashboard.css";

// ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

// const SuperAdminDashboard = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     setUsers([
//       { id: 1, name: "Admin One", email: "admin@example.com", role: "Admin" },
//       { id: 2, name: "Customer One", email: "cust@example.com", role: "Customer" },
//       { id: 3, name: "Engineer One", email: "engg@example.com", role: "Service Engineer" },
//       { id: 4, name: "Manager One", email: "manager@example.com", role: "Service Manager" },
//     //   { id: 5, name: "Super Admin", email: "superadmin@example.com", role: "Super Admin" },
//     ]);
//   }, []);

//   const roleCounts = users.reduce((acc, user) => {
//     acc[user.role] = (acc[user.role] || 0) + 1;
//     return acc;
//   }, {});

//   const chartData = {
//     labels: Object.keys(roleCounts),
//     datasets: [
//       {
//         label: "Users",
//         data: Object.values(roleCounts),
//         backgroundColor: "#4CAF50",
//         borderRadius: 6,
//       },
//     ],
//   };

//   const chartOptions = {
//     plugins: { legend: { display: false } },
//     scales: {
//       y: { beginAtZero: true, ticks: { stepSize: 1 } },
//       x: {
//         ticks: { maxRotation: 0, minRotation: 0 },
//         grid: { display: false },
//       },
//     },
//     elements: { bar: { barThickness: 30, maxBarThickness: 40 } },
//     maintainAspectRatio: false,
//   };

//   const doughnutData = {
//     labels: Object.keys(roleCounts),
//     datasets: [
//       {
//         label: "Users",
//         data: Object.values(roleCounts),
//         backgroundColor: ["#4CAF50", "#2196F3", "#FFC107", "#FF5722", "#9C27B0"],
//       },
//     ],
//   };

//   const handleCopyEmail = (email) => {
//     navigator.clipboard.writeText(email);
//     alert("Email copied to clipboard");
//   };

//   const recentActivities = [
//     "Admin One added a new user",
//     "Customer One submitted a ticket",
//     "Engineer One closed a request",
//     "Manager One reviewed a report",
//   ];

//   return (
//     <div className="super-admin-container">
//       <h2 className="super-admin-title">Super Admin Dashboard</h2>

//       {users.length === 0 ? (
//         <div className="super-admin-no-content">
//           Still no content in dashboard related to super admin.
//         </div>
//       ) : (
//         <>
//           <div className="super-admin-total-summary">
//             Total Users: <strong>{users.length}</strong>
//           </div>

//           <div className="super-admin-card-container">
//             {Object.entries(roleCounts).map(([role, count]) => (
//               <div key={role} className="super-admin-role-card">
//                 <h4>{role}</h4>
//                 <p>{count}</p>
//               </div>
//             ))}
//           </div>

//           <div className="super-admin-chart-group">
//             <div className="super-admin-chart-container">
//               <h4 className="super-admin-chart-title">User Distribution (Bar)</h4>
//               <div style={{ height: "250px" }}>
//                 <Bar data={chartData} options={chartOptions} />
//               </div>
//             </div>

//             <div className="super-admin-chart-container">
//               <h4 className="super-admin-chart-title">User Roles (Doughnut)</h4>
//               <div style={{ maxWidth: "300px", margin: "0 auto" }}>
//                 <Doughnut data={doughnutData} />
//               </div>
//             </div>
//           </div>

//           <div className="super-admin-table-container">
//             <h4 className="super-admin-table-title">User List</h4>
//             <div className="super-admin-table-wrapper">
//               <table className="super-admin-table">
//                 <thead>
//                   <tr style={{ background: "#f1f1f1" }}>
//                     <th>#</th>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Role</th>
//                     <th>Copy</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map((u, i) => (
//                     <tr key={u.id}>
//                       <td>{i + 1}</td>
//                       <td>{u.name}</td>
//                       <td>{u.email}</td>
//                       <td>{u.role}</td>
//                       <td>
//                         <button
//                           onClick={() => handleCopyEmail(u.email)}
//                           className="copy-btn"
//                         >
//                           Copy
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           <div className="super-admin-activity-log">
//             <h4 className="super-admin-table-title">Recent Activities</h4>
//             <ul>
//               {recentActivities.map((activity, idx) => (
//                 <li key={idx}>{activity}</li>
//               ))}
//             </ul>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default SuperAdminDashboard;






// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Bar, Doughnut } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import baseURL from "../ApiUrl/Apiurl";
// import "./SuperAdminDashboard.css";

// ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

// const SuperAdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [recentActivities, setRecentActivities] = useState([]);

//   // Fetch users from API
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${baseURL}/users/`);
//       console.log("API Response:", response.data);
      
//       // Check if response.data is an array
//       if (response.data && Array.isArray(response.data)) {
//         setUsers(response.data);
        
//         // Generate recent activities from the fetched users
//         generateRecentActivities(response.data);
//       } else {
//         console.error("Unexpected response format:", response.data);
//         setUsers([]);
//         setError("Invalid data format received from API");
//       }
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       setError(error.message || "Failed to fetch users");
//       setUsers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Generate recent activities from user data
//   const generateRecentActivities = (userData) => {
//     // Sort users by created_at date (newest first)
//     const sortedUsers = [...userData].sort((a, b) => 
//       new Date(b.created_at) - new Date(a.created_at)
//     );
    
//     // Take top 5 recent users for activities
//     const recentUserActivities = sortedUsers.slice(0, 5).map(user => 
//       `${user.full_name || user.username} (${user.role}) joined the system`
//     );
    
//     // Combine with some other activities
//     const activities = [
//       ...recentUserActivities,
//       `Total users registered: ${userData.length}`,
//       `Roles distribution updated`,
//       `System dashboard refreshed`,
//     ];
    
//     setRecentActivities(activities.slice(0, 6)); // Show max 6 activities
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Calculate role counts
//   const roleCounts = users.reduce((acc, user) => {
//     const role = user.role || "Unknown";
//     acc[role] = (acc[role] || 0) + 1;
//     return acc;
//   }, {});

//   // Calculate status counts (if needed)
//   const statusCounts = users.reduce((acc, user) => {
//     const status = user.status || "Unknown";
//     acc[status] = (acc[status] || 0) + 1;
//     return acc;
//   }, {});

//   // Chart data for bar chart
//   const chartData = {
//     labels: Object.keys(roleCounts),
//     datasets: [
//       {
//         label: "Number of Users",
//         data: Object.values(roleCounts),
//         backgroundColor: "#4CAF50",
//         borderRadius: 6,
//       },
//     ],
//   };

//   const chartOptions = {
//     plugins: { 
//       legend: { display: false },
//       tooltip: {
//         callbacks: {
//           label: function(context) {
//             return `${context.label}: ${context.raw} users`;
//           }
//         }
//       }
//     },
//     scales: {
//       y: { 
//         beginAtZero: true, 
//         ticks: { stepSize: 1 },
//         title: {
//           display: true,
//           text: 'Number of Users'
//         }
//       },
//       x: {
//         ticks: { maxRotation: 0, minRotation: 0 },
//         grid: { display: false },
//         title: {
//           display: true,
//           text: 'Roles'
//         }
//       },
//     },
//     elements: { bar: { barThickness: 30, maxBarThickness: 40 } },
//     maintainAspectRatio: false,
//   };

//   // Doughnut chart data
//   const doughnutData = {
//     labels: Object.keys(roleCounts),
//     datasets: [
//       {
//         label: "User Distribution",
//         data: Object.values(roleCounts),
//         backgroundColor: ["#4CAF50", "#2196F3", "#FFC107", "#FF5722", "#9C27B0", "#00BCD4", "#E91E63"],
//         borderWidth: 2,
//         borderColor: "#fff",
//       },
//     ],
//   };

//   const doughnutOptions = {
//     plugins: {
//       legend: {
//         position: 'bottom',
//         labels: {
//           font: {
//             size: 12
//           }
//         }
//       },
//       tooltip: {
//         callbacks: {
//           label: function(context) {
//             const label = context.label || '';
//             const value = context.raw || 0;
//             const total = context.dataset.data.reduce((a, b) => a + b, 0);
//             const percentage = ((value / total) * 100).toFixed(1);
//             return `${label}: ${value} users (${percentage}%)`;
//           }
//         }
//       }
//     }
//   };

//   const handleCopyEmail = (email) => {
//     navigator.clipboard.writeText(email);
//     alert("Email copied to clipboard");
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     if (!dateString) return '-';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//     });
//   };

//   if (loading) {
//     return (
//       <div className="super-admin-container">
//         <div className="loading-spinner">
//           <h3>Loading dashboard data...</h3>
//           <div className="spinner"></div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="super-admin-container">
//         <div className="error-message">
//           <h3>Error loading dashboard</h3>
//           <p>{error}</p>
//           <button onClick={fetchUsers} className="retry-btn">Retry</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="super-admin-container">
//       <h2 className="super-admin-title">Super Admin Dashboard</h2>

//       {users.length === 0 ? (
//         <div className="super-admin-no-content">
//           <p>No users found in the system.</p>
//           <button onClick={fetchUsers} className="retry-btn">Refresh</button>
//         </div>
//       ) : (
//         <>
//           <div className="super-admin-total-summary">
//             Total Users: <strong>{users.length}</strong>
//             <span className="summary-subtitle"> (Active users in system)</span>
//           </div>

//           <div className="super-admin-card-container">
//             {Object.entries(roleCounts).map(([role, count]) => (
//               <div key={role} className="super-admin-role-card">
//                 <h4>{role}</h4>
//                 <p>{count}</p>
//                 <small>{((count / users.length) * 100).toFixed(1)}% of total</small>
//               </div>
//             ))}
//           </div>

//           <div className="super-admin-chart-group">
//             <div className="super-admin-chart-container">
//               <h4 className="super-admin-chart-title">User Distribution by Role (Bar Chart)</h4>
//               <div style={{ height: "250px" }}>
//                 <Bar data={chartData} options={chartOptions} />
//               </div>
//             </div>

//             <div className="super-admin-chart-container">
//               <h4 className="super-admin-chart-title">User Roles Distribution (Doughnut)</h4>
//               <div style={{ maxWidth: "300px", margin: "0 auto" }}>
//                 <Doughnut data={doughnutData} options={doughnutOptions} />
//               </div>
//             </div>
//           </div>

//           <div className="super-admin-table-container">
//             <h4 className="super-admin-table-title">User List</h4>
//             <div className="super-admin-table-wrapper">
//               <table className="super-admin-table">
//                 <thead>
//                   <tr style={{ background: "#f1f1f1" }}>
//                     <th>#</th>
//                     <th>User ID</th>
//                     <th>Full Name</th>
//                     <th>Username</th>
//                     <th>Email</th>
//                     <th>Role</th>
//                     <th>Status</th>
//                     <th>City</th>
//                     <th>Created Date</th>
//                     <th>Copy Email</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map((u, i) => (
//                     <tr key={u.user_id}>
//                       <td>{i + 1}</td>
//                       <td>{u.user_id}</td>
//                       <td>{u.full_name || '-'}</td>
//                       <td>{u.username}</td>
//                       <td>{u.email}</td>
//                       <td>
//                         <span className={`role-badge role-${(u.role || 'unknown').toLowerCase().replace(/\s+/g, '-')}`}>
//                           {u.role || 'Unknown'}
//                         </span>
//                       </td>
//                       <td>
//                         <span className={`status-badge status-${(u.status || 'unknown').toLowerCase()}`}>
//                           {u.status || 'Unknown'}
//                         </span>
//                       </td>
//                       <td>{u.city || '-'}</td>
//                       <td>{formatDate(u.created_at)}</td>
//                       <td>
//                         <button
//                           onClick={() => handleCopyEmail(u.email)}
//                           className="copy-btn"
//                           title="Copy email to clipboard"
//                         >
//                           Copy
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           <div className="super-admin-activity-log">
//             <h4 className="super-admin-table-title">Recent Activities</h4>
//             <ul>
//               {recentActivities.map((activity, idx) => (
//                 <li key={idx}>
//                   <span className="activity-icon">📌</span>
//                   {activity}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="super-admin-stats-footer">
//             <div className="stat-item">
//               <strong>Total Roles:</strong> {Object.keys(roleCounts).length}
//             </div>
//             <div className="stat-item">
//               <strong>Last Updated:</strong> {new Date().toLocaleString()}
//             </div>
//             <div className="stat-item">
//               <strong>Data Source:</strong> API
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default SuperAdminDashboard;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Bar, Doughnut } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import baseURL from "../ApiUrl/Apiurl";
// import "./SuperAdminDashboard.css";

// ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

// const SuperAdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [recentActivities, setRecentActivities] = useState([]);

//   // Fetch users from API
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${baseURL}/users/`);
//       console.log("API Response:", response.data);
      
//       // Check if response.data is an array
//       if (response.data && Array.isArray(response.data)) {
//         setUsers(response.data);
        
//         // Generate recent activities from the fetched users
//         generateRecentActivities(response.data);
//       } else {
//         console.error("Unexpected response format:", response.data);
//         setUsers([]);
//         setError("Invalid data format received from API");
//       }
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       setError(error.message || "Failed to fetch users");
//       setUsers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Generate recent activities from user data
//   const generateRecentActivities = (userData) => {
//     // Sort users by created_at date (newest first)
//     const sortedUsers = [...userData].sort((a, b) => 
//       new Date(b.created_at) - new Date(a.created_at)
//     );
    
//     // Take top 5 recent users for activities
//     const recentUserActivities = sortedUsers.slice(0, 5).map(user => 
//       `${user.full_name || user.username} (${user.role}) joined the system`
//     );
    
//     // Combine with some other activities
//     const activities = [
//       ...recentUserActivities,
//       `Total users registered: ${userData.length}`,
//       `Roles distribution updated`,
//       `System dashboard refreshed`,
//     ];
    
//     setRecentActivities(activities.slice(0, 6)); // Show max 6 activities
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Calculate role counts
//   const roleCounts = users.reduce((acc, user) => {
//     const role = user.role || "Unknown";
//     acc[role] = (acc[role] || 0) + 1;
//     return acc;
//   }, {});

//   // Calculate status counts (if needed)
//   const statusCounts = users.reduce((acc, user) => {
//     const status = user.status || "Unknown";
//     acc[status] = (acc[status] || 0) + 1;
//     return acc;
//   }, {});

//   // Chart data for bar chart
//   const chartData = {
//     labels: Object.keys(roleCounts),
//     datasets: [
//       {
//         label: "Number of Users",
//         data: Object.values(roleCounts),
//         backgroundColor: "#4CAF50",
//         borderRadius: 6,
//       },
//     ],
//   };

//   const chartOptions = {
//     plugins: { 
//       legend: { display: false },
//       tooltip: {
//         callbacks: {
//           label: function(context) {
//             return `${context.label}: ${context.raw} users`;
//           }
//         }
//       }
//     },
//     scales: {
//       y: { 
//         beginAtZero: true, 
//         ticks: { stepSize: 1 },
//         title: {
//           display: true,
//           text: 'Number of Users'
//         }
//       },
//       x: {
//         ticks: { maxRotation: 0, minRotation: 0 },
//         grid: { display: false },
//         title: {
//           display: true,
//           text: 'Roles'
//         }
//       },
//     },
//     elements: { bar: { barThickness: 30, maxBarThickness: 40 } },
//     maintainAspectRatio: false,
//   };

//   // Doughnut chart data
//   const doughnutData = {
//     labels: Object.keys(roleCounts),
//     datasets: [
//       {
//         label: "User Distribution",
//         data: Object.values(roleCounts),
//         backgroundColor: ["#4CAF50", "#2196F3", "#FFC107", "#FF5722", "#9C27B0", "#00BCD4", "#E91E63"],
//         borderWidth: 2,
//         borderColor: "#fff",
//       },
//     ],
//   };

//   const doughnutOptions = {
//     plugins: {
//       legend: {
//         position: 'bottom',
//         labels: {
//           font: {
//             size: 12
//           }
//         }
//       },
//       tooltip: {
//         callbacks: {
//           label: function(context) {
//             const label = context.label || '';
//             const value = context.raw || 0;
//             const total = context.dataset.data.reduce((a, b) => a + b, 0);
//             const percentage = ((value / total) * 100).toFixed(1);
//             return `${label}: ${value} users (${percentage}%)`;
//           }
//         }
//       }
//     }
//   };

//   const handleCopyEmail = (email) => {
//     navigator.clipboard.writeText(email);
//     alert("Email copied to clipboard");
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     if (!dateString) return '-';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//     });
//   };

//   if (loading) {
//     return (
//       <div className="super-admin-container">
//         <div className="loading-spinner">
//           <h3>Loading dashboard data...</h3>
//           <div className="spinner"></div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="super-admin-container">
//         <div className="error-message">
//           <h3>Error loading dashboard</h3>
//           <p>{error}</p>
//           <button onClick={fetchUsers} className="retry-btn">Retry</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="super-admin-container">
//       <h2 className="super-admin-title">Super Admin Dashboard</h2>

//       {users.length === 0 ? (
//         <div className="super-admin-no-content">
//           <p>No users found in the system.</p>
//           <button onClick={fetchUsers} className="retry-btn">Refresh</button>
//         </div>
//       ) : (
//         <>
//           <div className="super-admin-total-summary">
//             Total Users: <strong>{users.length}</strong>
//             <span className="summary-subtitle"> (Active users in system)</span>
//           </div>

//           <div className="super-admin-card-container">
//             {Object.entries(roleCounts).map(([role, count]) => (
//               <div key={role} className="super-admin-role-card">
//                 <h4>{role}</h4>
//                 <p>{count}</p>
//                 <small>{((count / users.length) * 100).toFixed(1)}% of total</small>
//               </div>
//             ))}
//           </div>

//           <div className="super-admin-chart-group">
//             <div className="super-admin-chart-container">
//               <h4 className="super-admin-chart-title">User Distribution by Role (Bar Chart)</h4>
//               <div style={{ height: "250px" }}>
//                 <Bar data={chartData} options={chartOptions} />
//               </div>
//             </div>

//             <div className="super-admin-chart-container">
//               <h4 className="super-admin-chart-title">User Roles Distribution (Doughnut)</h4>
//               <div style={{ maxWidth: "300px", margin: "0 auto" }}>
//                 <Doughnut data={doughnutData} options={doughnutOptions} />
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default SuperAdminDashboard;



import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import baseURL from "../ApiUrl/Apiurl";
import { AuthContext } from "../AuthContext/AuthContext";
import "./SuperAdminDashboard.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const SuperAdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [serviceItems, setServiceItems] = useState([]);
  const [serviceItemsLoading, setServiceItemsLoading] = useState(false);

  // Get userId and companyId from AuthContext
  const { userId, companyId } = useContext(AuthContext);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/users/`);
      console.log("API Response:", response.data);
      
      // Check if response.data is an array
      if (response.data && Array.isArray(response.data)) {
        setUsers(response.data);
        
        // Generate recent activities from the fetched users
        generateRecentActivities(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setUsers([]);
        setError("Invalid data format received from API");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error.message || "Failed to fetch users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch service items count
  const fetchServiceItems = async () => {
    if (!userId || !companyId) {
      console.log("Missing userId or companyId, skipping service items fetch");
      return;
    }

    try {
      setServiceItemsLoading(true);
      const response = await axios.get(
        `${baseURL}/service-items/?user_id=${userId}&company_id=${companyId}`
      );
      console.log("Service Items API Response:", response.data);
      
      if (response.data && response.data.status === "success" && Array.isArray(response.data.data)) {
        setServiceItems(response.data.data);
      } else {
        console.error("Unexpected service items response format:", response.data);
        setServiceItems([]);
      }
    } catch (error) {
      console.error("Error fetching service items:", error);
      setServiceItems([]);
    } finally {
      setServiceItemsLoading(false);
    }
  };

  // Generate recent activities from user data
  const generateRecentActivities = (userData) => {
    // Sort users by created_at date (newest first)
    const sortedUsers = [...userData].sort((a, b) => 
      new Date(b.created_at) - new Date(a.created_at)
    );
    
    // Take top 5 recent users for activities
    const recentUserActivities = sortedUsers.slice(0, 5).map(user => 
      `${user.full_name || user.username} (${user.role}) joined the system`
    );
    
    // Combine with some other activities
    const activities = [
      ...recentUserActivities,
      `Total users registered: ${userData.length}`,
      `Roles distribution updated`,
      `System dashboard refreshed`,
    ];
    
    setRecentActivities(activities.slice(0, 6)); // Show max 6 activities
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch service items when userId and companyId are available
  useEffect(() => {
    if (userId && companyId) {
      fetchServiceItems();
    }
  }, [userId, companyId]);

  // Calculate role counts
  const roleCounts = users.reduce((acc, user) => {
    const role = user.role || "Unknown";
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {});

  // Calculate status counts (if needed)
  const statusCounts = users.reduce((acc, user) => {
    const status = user.status || "Unknown";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  // Chart data for bar chart
  const chartData = {
    labels: Object.keys(roleCounts),
    datasets: [
      {
        label: "Number of Users",
        data: Object.values(roleCounts),
        backgroundColor: "#4CAF50",
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    plugins: { 
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw} users`;
          }
        }
      }
    },
    scales: {
      y: { 
        beginAtZero: true, 
        ticks: { stepSize: 1 },
        title: {
          display: true,
          text: 'Number of Users'
        }
      },
      x: {
        ticks: { maxRotation: 0, minRotation: 0 },
        grid: { display: false },
        title: {
          display: true,
          text: 'Roles'
        }
      },
    },
    elements: { bar: { barThickness: 30, maxBarThickness: 40 } },
    maintainAspectRatio: false,
  };

  // Doughnut chart data
  const doughnutData = {
    labels: Object.keys(roleCounts),
    datasets: [
      {
        label: "User Distribution",
        data: Object.values(roleCounts),
        backgroundColor: ["#4CAF50", "#2196F3", "#FFC107", "#FF5722", "#9C27B0", "#00BCD4", "#E91E63"],
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  const doughnutOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} users (${percentage}%)`;
          }
        }
      }
    }
  };

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
    alert("Email copied to clipboard");
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="super-admin-container">
        <div className="loading-spinner">
          <h3>Loading dashboard data...</h3>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="super-admin-container">
        <div className="error-message">
          <h3>Error loading dashboard</h3>
          <p>{error}</p>
          <button onClick={fetchUsers} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="super-admin-container">
      <h2 className="super-admin-title">Super Admin Dashboard</h2>
      
      {/* Display userId and companyId for debugging (optional) */}
      <div className="user-info-bar" style={{ fontSize: '12px', color: '#666', marginBottom: '15px' }}>
        User ID: {userId || 'Not available'} | Company ID: {companyId || 'Not available'}
      </div>

      {users.length === 0 ? (
        <div className="super-admin-no-content">
          <p>No users found in the system.</p>
          <button onClick={fetchUsers} className="retry-btn">Refresh</button>
        </div>
      ) : (
        <>
          <div className="super-admin-total-summary">
            Total Users: <strong>{users.length}</strong>
            <span className="summary-subtitle"> (Active users in system)</span>
          </div>

          <div className="super-admin-card-container">
            {Object.entries(roleCounts).map(([role, count]) => (
              <div key={role} className="super-admin-role-card">
                <h4>{role}</h4>
                <p>{count}</p>
                <small>{((count / users.length) * 100).toFixed(1)}% of total</small>
              </div>
            ))}
            
            {/* Service Items Card - Display count of service items */}
            <div className="super-admin-role-card service-items-card">
              <h4>Service Items</h4>
              <p>{serviceItemsLoading ? '...' : serviceItems.length}</p>
              <small>
                {serviceItemsLoading 
                  ? 'Loading...' 
                  : `${serviceItems.length} service item(s) available`}
              </small>
              {!userId || !companyId ? (
                <small style={{ display: 'block', color: '#ff9800', marginTop: '5px' }}>
                  ⚠️ Login required
                </small>
              ) : null}
            </div>
          </div>

          <div className="super-admin-chart-group">
            <div className="super-admin-chart-container">
              <h4 className="super-admin-chart-title">User Distribution by Role (Bar Chart)</h4>
              <div style={{ height: "250px" }}>
                <Bar data={chartData} options={chartOptions} />
              </div>
            </div>

            <div className="super-admin-chart-container">
              <h4 className="super-admin-chart-title">User Roles Distribution (Doughnut)</h4>
              <div style={{ maxWidth: "300px", margin: "0 auto" }}>
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SuperAdminDashboard;