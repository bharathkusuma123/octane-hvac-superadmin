import React, { useEffect, useState } from "react";
import baseURL from "../ApiUrl/Apiurl";

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [usersList, setUsersList] = useState([]); // ✅ Users API data
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  // add this state
const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");
  const companyId = localStorage.getItem("companyId");

  useEffect(() => {
    fetchLogs();
    fetchUsers(); // ✅ Fetch users for Role column
  }, []);

  // update fetchLogs function like this

const fetchLogs = async () => {
  try {
    setLoading(true);

    const response = await fetch(
      `${baseURL}/activity-logs/?user_id=${userId}&company_id=${companyId}`
    );
    const data = await response.json();

    if (data.status === "success") {
      const sorted = data.data.records.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setLogs(sorted);
      setFilteredLogs(sorted);
    }
  } catch (error) {
    console.error("Error fetching logs:", error);
  } finally {
    setLoading(false);
  }
};

  // ✅ Fetch users list for matching role
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${baseURL}/users/`);
      const data = await response.json();
      setUsersList(data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // ✅ Get Role by matching user_id
  const getUserRole = (logUserId) => {
    const matchedUser = usersList.find(
      (user) => user.user_id === logUserId
    );
    return matchedUser ? matchedUser.role : "-";
  };

  // ✅ Same date format style
  const formatDate = (dateString) => {
    if (!dateString) return "-";

    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-IN", { month: "short" });
    const year = date.getFullYear();
    const time = date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${day} ${month} ${year}, ${time}`;
  };

  // ✅ Search logic
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredLogs(logs);
      setCurrentPage(1);
      return;
    }

    const searchLower = searchTerm.toLowerCase();

    const filtered = logs.filter((log) =>
      [
        log.log_id,
        log.user_category,
        log.user_id,
        log.username,
        getUserRole(log.user_id), // ✅ Search includes role
        log.activity_type,
        log.description,
        formatDate(log.created_at),
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchLower)
    );

    setFilteredLogs(filtered);
    setCurrentPage(1);
  }, [searchTerm, logs, usersList]);

  const indexOfLast = currentPage * entriesPerPage;
  const indexOfFirst = indexOfLast - entriesPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredLogs.length / entriesPerPage);

  return (
    <div className="container-fluid user-management-container">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <div>
          <h2 className="user-management-title mb-0">Activity Logs</h2>
          <p className="user-management-subtitle mb-0 text-muted">
            Track user activities
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <div className="d-flex align-items-center gap-2">
          Show
          <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="form-select form-select-sm w-auto"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
          entries
        </div>

        <div className="d-flex align-items-center gap-2">
          <input
            type="text"
            placeholder="Search in all columns..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ minWidth: "250px" }}
          />
        </div>
      </div>

{loading ? (
  <div className="text-center my-3">
    <div className="spinner-border text-primary"></div>
    <p>Loading Activity Logs...</p>
  </div>
) : (
  <>
    <div className="table-responsive mb-4">
      <table className="table">
        <thead className="product-table-header">
          <tr>
            <th>S.No</th>
            <th>Log ID</th>
            <th>User Category</th>
            <th>User ID</th>
            <th>User Name</th>
            <th>Role</th>
            <th>Activity</th>
            <th>Description</th>
            <th>Date & Time</th>
          </tr>
        </thead>

        <tbody>
          {currentLogs.length > 0 ? (
            currentLogs.map((log, idx) => (
              <tr key={log.log_id}>
                <td>{indexOfFirst + idx + 1}</td>
                <td>{log.log_id}</td>
                <td>{log.user_category}</td>
                <td>{log.user_id}</td>
                <td>{log.username}</td>

                <td>
                  <span className="badge bg-secondary">
                    {getUserRole(log.user_id)}
                  </span>
                </td>

                <td>
                  <span className="badge bg-primary">
                    {log.activity_type}
                  </span>
                </td>

                <td>{log.description}</td>
                <td>{formatDate(log.created_at)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No logs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </>
)}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination-controls d-flex justify-content-center mt-3">
          <button
            className="btn btn-outline-primary me-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>

          <span className="align-self-center mx-2">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="btn btn-outline-primary ms-2"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityLogs;