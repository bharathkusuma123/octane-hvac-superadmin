import React, { useState, useMemo } from 'react';

const ErrorLogs = () => {
  const logs = [
    {
      errorId: 1,
      user: "user1@contoso.com",
      errorMessage: "Null pointer exception",
      errorType: "Backend",
      timestamp: "2025-08-08 10:30 AM",
      object: "Virtual Machine",
    },
    {
      errorId: 2,
      user: "user2@contoso.com",
      errorMessage: "404 Not Found",
      errorType: "API",
      timestamp: "2025-08-08 10:35 AM",
      object: "Blob Storage",
    },
    {
      errorId: 3,
      user: "user3@contoso.com",
      errorMessage: "Unauthorized access",
      errorType: "Security",
      timestamp: "2025-08-08 10:40 AM",
      object: "Policy Rule",
    },
    {
      errorId: 4,
      user: "user4@contoso.com",
      errorMessage: "Database connection failed",
      errorType: "Database",
      timestamp: "2025-08-08 10:50 AM",
      object: "Firewall",
    },
  ];

  // Function to format date from "yyyy-mm-dd HH:MM AM/PM" to "dd/mm/yyyy HH:MM AM/PM"
  const formatDate = (dateString) => {
    try {
      const [datePart, timePart] = dateString.split(' ');
      const [year, month, day] = datePart.split('-');
      return `${day}/${month}/${year} ${timePart}`;
    } catch (error) {
      return dateString; // Return original if formatting fails
    }
  };

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'asc' });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const base = q
      ? logs.filter(
          (r) =>
            r.user.toLowerCase().includes(q) ||
            r.errorMessage.toLowerCase().includes(q) ||
            r.errorType.toLowerCase().includes(q) ||
            r.object.toLowerCase().includes(q) ||
            r.timestamp.toLowerCase().includes(q)
        )
      : logs;

    return [...base].sort((a, b) => {
      // For timestamp sorting, we need to convert to Date objects
      if (sortConfig.key === "timestamp") {
        const aDate = new Date(a.timestamp);
        const bDate = new Date(b.timestamp);
        if (sortConfig.direction === "asc") {
          return aDate - bDate;
        } else {
          return bDate - aDate;
        }
      }
      
      // For other columns
      const aVal = String(a[sortConfig.key]).toLowerCase();
      const bVal = String(b[sortConfig.key]).toLowerCase();
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [logs, search, sortConfig]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const start = (currentPage - 1) * rowsPerPage;
  const pageData = filtered.slice(start, start + rowsPerPage);

  const handleSort = (key) => {
    setCurrentPage(1);
    setSortConfig((prev) =>
      prev.key === key ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' } : { key, direction: 'asc' }
    );
  };

  const handleUpdate = (row) => alert(`Update clicked for: ${row.object}`);
  const handleDelete = (row) => alert(`Delete clicked for: ${row.object}`);

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-sm rounded-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h4 className="mb-0 fw-bold">Error Logs</h4>
            <small className="text-muted">Track and manage system errors</small>
          </div>
        </div>

        {/* Search & Rows Per Page */}
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <div className="d-flex align-items-center">
            <label className="me-2">Show</label>
            <select
              className="form-select w-auto"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
            <label className="ms-2">entries</label>
          </div>

          <input
            type="text"
            className="form-control"
            style={{ width: 300 }}
            placeholder="Search user, error message, object..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center">
            <thead className="text-center">
              <tr>
                <th style={{ background: "#0099dd", color: "white" }}>Error ID</th>
                <th style={{ background: "#0099dd", color: "white" }}>User</th>
                <th style={{ background: "#0099dd", color: "white" }}>Error Message</th>
                <th style={{ background: "#0099dd", color: "white" }}>Error Type</th>
                <th style={{ cursor: "pointer", background: "#0099dd", color: "white" }} onClick={() => handleSort("timestamp")}>
                  Timestamp {sortConfig.key === "timestamp" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                </th>
                <th style={{ background: "#0099dd", color: "white" }}>Object</th>
                {/* <th style={{ background: "#0099dd", color: "white" }}>Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr>
                  <td colSpan="7">No matching logs</td>
                </tr>
              ) : (
                pageData.map((row, idx) => (
                  <tr key={row.errorId}>
                    <td>{start + idx + 1}</td>
                    <td>{row.user}</td>
                    <td>{row.errorMessage}</td>
                    <td>{row.errorType}</td>
                    <td>{formatDate(row.timestamp)}</td>
                    <td>{row.object}</td>
                    {/* <td>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-primary" onClick={() => handleUpdate(row)}>
                          Update
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(row)}>
                          Delete
                        </button>
                      </div>
                    </td> */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-3 d-flex justify-content-center align-items-center gap-3 flex-wrap">
          <button
            className="btn btn-outline-primary btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </button>
          <span className="fw-semibold">Page {currentPage} of {pageCount}</span>
          <button
            className="btn btn-outline-primary btn-sm"
            disabled={currentPage === pageCount}
            onClick={() => setCurrentPage((p) => Math.min(pageCount, p + 1))}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorLogs;