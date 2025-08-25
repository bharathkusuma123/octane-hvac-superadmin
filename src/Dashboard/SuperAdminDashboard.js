import React, { useEffect, useState } from "react";
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
import "./SuperAdminDashboard.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const SuperAdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers([
      { id: 1, name: "Admin One", email: "admin@example.com", role: "Admin" },
      { id: 2, name: "Customer One", email: "cust@example.com", role: "Customer" },
      { id: 3, name: "Engineer One", email: "engg@example.com", role: "Service Engineer" },
      { id: 4, name: "Manager One", email: "manager@example.com", role: "Service Manager" },
    //   { id: 5, name: "Super Admin", email: "superadmin@example.com", role: "Super Admin" },
    ]);
  }, []);

  const roleCounts = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(roleCounts),
    datasets: [
      {
        label: "Users",
        data: Object.values(roleCounts),
        backgroundColor: "#4CAF50",
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
      x: {
        ticks: { maxRotation: 0, minRotation: 0 },
        grid: { display: false },
      },
    },
    elements: { bar: { barThickness: 30, maxBarThickness: 40 } },
    maintainAspectRatio: false,
  };

  const doughnutData = {
    labels: Object.keys(roleCounts),
    datasets: [
      {
        label: "Users",
        data: Object.values(roleCounts),
        backgroundColor: ["#4CAF50", "#2196F3", "#FFC107", "#FF5722", "#9C27B0"],
      },
    ],
  };

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
    alert("Email copied to clipboard");
  };

  const recentActivities = [
    "Admin One added a new user",
    "Customer One submitted a ticket",
    "Engineer One closed a request",
    "Manager One reviewed a report",
  ];

  return (
    <div className="super-admin-container">
      <h2 className="super-admin-title">Super Admin Dashboard</h2>

      {users.length === 0 ? (
        <div className="super-admin-no-content">
          Still no content in dashboard related to super admin.
        </div>
      ) : (
        <>
          <div className="super-admin-total-summary">
            Total Users: <strong>{users.length}</strong>
          </div>

          <div className="super-admin-card-container">
            {Object.entries(roleCounts).map(([role, count]) => (
              <div key={role} className="super-admin-role-card">
                <h4>{role}</h4>
                <p>{count}</p>
              </div>
            ))}
          </div>

          <div className="super-admin-chart-group">
            <div className="super-admin-chart-container">
              <h4 className="super-admin-chart-title">User Distribution (Bar)</h4>
              <div style={{ height: "250px" }}>
                <Bar data={chartData} options={chartOptions} />
              </div>
            </div>

            <div className="super-admin-chart-container">
              <h4 className="super-admin-chart-title">User Roles (Doughnut)</h4>
              <div style={{ maxWidth: "300px", margin: "0 auto" }}>
                <Doughnut data={doughnutData} />
              </div>
            </div>
          </div>

          <div className="super-admin-table-container">
            <h4 className="super-admin-table-title">User List</h4>
            <div className="super-admin-table-wrapper">
              <table className="super-admin-table">
                <thead>
                  <tr style={{ background: "#f1f1f1" }}>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Copy</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={u.id}>
                      <td>{i + 1}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.role}</td>
                      <td>
                        <button
                          onClick={() => handleCopyEmail(u.email)}
                          className="copy-btn"
                        >
                          Copy
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="super-admin-activity-log">
            <h4 className="super-admin-table-title">Recent Activities</h4>
            <ul>
              {recentActivities.map((activity, idx) => (
                <li key={idx}>{activity}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default SuperAdminDashboard;
