import React, { useMemo, useState } from "react";
// If you're using Bootstrap Icons, make sure to include them in index.html:
// <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">

const ActivityLogs = () => {
  const logs = [
    { slNo: 1, user: "user1@contoso.com", category: "Compute", object: "Virtual Machine", timestamp: "2025-08-08 10:30 AM" },
    { slNo: 2, user: "user2@contoso.com", category: "Storage", object: "Blob Storage", timestamp: "2025-08-08 10:35 AM" },
    { slNo: 3, user: "user3@contoso.com", category: "Policy", object: "Policy Rule", timestamp: "2025-08-08 10:40 AM" },
    { slNo: 4, user: "user4@contoso.com", category: "Network", object: "Firewall", timestamp: "2025-08-08 10:50 AM" },
    { slNo: 5, user: "ops@contoso.com", category: "Compute", object: "VM Extension", timestamp: "2025-08-08 11:00 AM" },
    { slNo: 6, user: "audit@contoso.com", category: "Policy", object: "Append Tag", timestamp: "2025-08-08 11:10 AM" },
    { slNo: 7, user: "user5@contoso.com", category: "Storage", object: "SAS Token", timestamp: "2025-08-08 11:20 AM" },
  ];

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: "user", direction: "asc" });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const base = q
      ? logs.filter(
          (r) =>
            r.user.toLowerCase().includes(q) ||
            r.category.toLowerCase().includes(q) ||
            r.object.toLowerCase().includes(q) ||
            r.timestamp.toLowerCase().includes(q)
        )
      : logs;

    return [...base].sort((a, b) => {
      const aVal = String(a[sortConfig.key]).toLowerCase();
      const bVal = String(b[sortConfig.key]).toLowerCase();
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [logs, search, sortConfig]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const start = (currentPage - 1) * rowsPerPage;
  const pageData = filtered.slice(start, start + rowsPerPage);

  const handleSort = (key) => {
    setCurrentPage(1);
    setSortConfig((prev) =>
      prev.key === key ? { key, direction: prev.direction === "asc" ? "desc" : "asc" } : { key, direction: "asc" }
    );
  };

  const handleUpdate = (row) => alert(`Update clicked for: ${row.object}`);
  const handleDelete = (row) => alert(`Delete clicked for: ${row.object}`);

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-sm rounded-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h4 className="mb-0 fw-bold">Activity Logs</h4>
            <small className="text-muted">Recent operations across resources</small>
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
            placeholder="Search user, category, object..."
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
                <th style={{ background: "#0099dd", color: "white" }}>S.No</th>
                <th style={{ cursor: "pointer", background: "#0099dd", color: "white" }} onClick={() => handleSort("user")}>
                  User {sortConfig.key === "user" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                </th>
                <th style={{ cursor: "pointer", background: "#0099dd", color: "white" }} onClick={() => handleSort("category")}>
                  Category {sortConfig.key === "category" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                </th>
                <th style={{ cursor: "pointer", background: "#0099dd", color: "white" }} onClick={() => handleSort("timestamp")}>
                  Timestamp {sortConfig.key === "timestamp" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                </th>
                {/* <th style={{ cursor: "pointer", background: "#0099dd", color: "white" }} onClick={() => handleSort("object")}>
                  Object {sortConfig.key === "object" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                </th> */}
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr>
                  <td colSpan="5">No matching logs</td>
                </tr>
              ) : (
                pageData.map((row, idx) => (
                  <tr key={row.slNo}>
                    <td>{start + idx + 1}</td>
                    <td>{row.user}</td>
                    <td>{row.category}</td>
                    <td>{row.timestamp}</td>
                    {/* <td className="text-start">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleUpdate(row)}
                          >
                            Update
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(row)}
                          >
                            Delete
                          </button>
                        </div>
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

export default ActivityLogs;
