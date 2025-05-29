import React, { useEffect, useState } from "react";
import "./ServiceCompletion.css";

const ServiceCompletionTable = ({ onAdd }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Simulating fetched data
    const dummyData = [
      {
        component_entry_id: 1,
        service_item_id: 101,
        component_id: "CMP001",
        component_serial_number: "SN123456789",
        warranty_start_date: "2024-01-01",
        warranty_end_date: "2025-01-01",
        vendor_id: "VEND009",
        created_at: "2024-05-01 08:00:00",
        updated_at: "2024-05-10 12:00:00",
        created_by: "admin",
        updated_by: "tech_lead",
      },
      // Add more dummy entries as needed
    ];

    const sorted = dummyData.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    setData(sorted);
    setFilteredData(sorted);
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, data]);

  const indexOfLast = currentPage * entriesPerPage;
  const indexOfFirst = indexOfLast - entriesPerPage;
  const currentData = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  return (
    <div className="container my-4">
      <div className="service-wrapper p-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
          <div>
            <h2 className="service-title mb-0">Service Item Components</h2>
            <p className="text-muted mb-0">Manage completed service items</p>
          </div>
          <button className="btn btn-primary" onClick={onAdd}>
            Add Completion
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
            placeholder="Search components..."
            className="form-control w-auto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>S.No</th>
                <th>ID</th>
                <th>Service Item ID</th>
                <th>Component ID</th>
                <th>Serial Number</th>
                <th>Warranty Start</th>
                <th>Warranty End</th>
                <th>Vendor ID</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Created By</th>
                <th>Updated By</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((item, index) => (
                  <tr key={index}>
                    <td>{indexOfFirst + index + 1}</td>
                    <td>{item.component_entry_id}</td>
                    <td>{item.service_item_id}</td>
                    <td>{item.component_id}</td>
                    <td>{item.component_serial_number}</td>
                    <td>{item.warranty_start_date}</td>
                    <td>{item.warranty_end_date}</td>
                    <td>{item.vendor_id}</td>
                    <td>{new Date(item.created_at).toLocaleString()}</td>
                    <td>{new Date(item.updated_at).toLocaleString()}</td>
                    <td>{item.created_by}</td>
                    <td>{item.updated_by}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center">
                    No components found.
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

export default ServiceCompletionTable;
