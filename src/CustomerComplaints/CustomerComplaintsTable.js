import React, { useEffect, useState } from "react";
import "./CustomerComplaints.css";

const CustomerComplaintsTable = ({ onAdd }) => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const dummyData = [
      {
        complaint_id: "C1001",
        customer_id: 501,
        service_item_id: 1001,
        complaint_details: "Machine making unusual noise",
        complaint_date: "2024-05-22 10:30:00",
        status: "Open",
        escalation_level: "None",
        service_manager_email: "",
        gm_email: "",
        resolution_details: "",
        resolved_at: null,
        created_by: "cust_user",
        updated_at: "2024-05-23 08:45:00"
      },
      // Add more complaints here if needed
    ];

    const sortedData = dummyData.sort(
      (a, b) => new Date(b.complaint_date) - new Date(a.complaint_date)
    );
    setComplaints(sortedData);
    setFilteredComplaints(sortedData);
  }, []);

  useEffect(() => {
    const filtered = complaints.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredComplaints(filtered);
    setCurrentPage(1);
  }, [searchTerm, complaints]);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentComplaints = filteredComplaints.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredComplaints.length / entriesPerPage);

  return (
    <div className="container my-4">
      <div className="complaints-container p-4 rounded shadow-sm">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
          <div>
            <h2 className="complaints-title mb-0">Complaint Records</h2>
            <p className="text-muted mb-0">Manage customer complaints</p>
          </div>
          <button className="btn btn-primary" onClick={onAdd}>
            Add Complaint
          </button>
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

          <input
            type="text"
            placeholder="Search complaints..."
            className="form-control w-auto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>S.No</th>
                <th>Complaint ID</th>
                <th>Customer ID</th>
                <th>Service Item ID</th>
                <th>Complaint Details</th>
                <th>Complaint Date</th>
                <th>Status</th>
                <th>Escalation</th>
                <th>Manager Email</th>
                <th>GM Email</th>
                <th>Resolution</th>
                <th>Resolved At</th>
                <th>Created By</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {currentComplaints.length > 0 ? (
                currentComplaints.map((item, idx) => (
                  <tr key={idx}>
                    <td>{indexOfFirstEntry + idx + 1}</td>
                    <td>{item.complaint_id}</td>
                    <td>{item.customer_id}</td>
                    <td>{item.service_item_id}</td>
                    <td>{item.complaint_details}</td>
                    <td>{new Date(item.complaint_date).toLocaleString()}</td>
                    <td>{item.status}</td>
                    <td>{item.escalation_level}</td>
                    <td>{item.service_manager_email || "-"}</td>
                    <td>{item.gm_email || "-"}</td>
                    <td>{item.resolution_details || "-"}</td>
                    <td>{item.resolved_at ? new Date(item.resolved_at).toLocaleString() : "-"}</td>
                    <td>{item.created_by}</td>
                    <td>{new Date(item.updated_at).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="14" className="text-center">
                    No complaints found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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
      </div>
    </div>
  );
};

export default CustomerComplaintsTable;
