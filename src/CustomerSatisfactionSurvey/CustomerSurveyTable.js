import React, { useEffect, useState } from "react";
import "./CustomerSatisfactionSurvey.css";

const CustomerSurveyTable = ({ onAdd }) => {
  const [surveys, setSurveys] = useState([]);
  const [filteredSurveys, setFilteredSurveys] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const dummyData = [
      {
        survey_id: 1,
        service_order_id: 2001,
        customer_id: 501,
        service_engineer_id: 302,
        rating_engineer: 9,
        rating_service: 8,
        engineer_rating_reason: "Very professional",
        service_rating_reason: "Satisfactory work",
        suggestions: "Improve response time",
        submitted_at: "2024-05-20 09:30:00",
        created_by: "customer123",
        updated_at: "2024-05-21 10:45:00"
      },
      // Add more entries here as needed
    ];

    const sortedData = dummyData.sort(
      (a, b) => new Date(b.submitted_at) - new Date(a.submitted_at)
    );
    setSurveys(sortedData);
    setFilteredSurveys(sortedData);
  }, []);

  useEffect(() => {
    const filtered = surveys.filter((entry) =>
      Object.values(entry).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSurveys(filtered);
    setCurrentPage(1);
  }, [searchTerm, surveys]);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentSurveys = filteredSurveys.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredSurveys.length / entriesPerPage);

  return (
    <div className="container my-4">
      <div className="p-4 shadow-sm rounded customer-survey-container">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
          <div>
            <h2 className="mb-0">Customer Surveys</h2>
            <p className="text-muted mb-0">Manage customer satisfaction responses</p>
          </div>
          <button className="btn btn-primary" onClick={onAdd}>
            Add Survey
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
            placeholder="Search surveys..."
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
                <th>Survey ID</th>
                <th>Order ID</th>
                <th>Customer ID</th>
                <th>Engineer ID</th>
                <th>Eng. Rating</th>
                <th>Service Rating</th>
                <th>Eng. Reason</th>
                <th>Service Reason</th>
                <th>Suggestions</th>
                <th>Submitted At</th>
                <th>Created By</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {currentSurveys.length > 0 ? (
                currentSurveys.map((entry, idx) => (
                  <tr key={idx}>
                    <td>{indexOfFirstEntry + idx + 1}</td>
                    <td>{entry.survey_id}</td>
                    <td>{entry.service_order_id}</td>
                    <td>{entry.customer_id}</td>
                    <td>{entry.service_engineer_id}</td>
                    <td>{entry.rating_engineer}</td>
                    <td>{entry.rating_service}</td>
                    <td>{entry.engineer_rating_reason}</td>
                    <td>{entry.service_rating_reason}</td>
                    <td>{entry.suggestions}</td>
                    <td>{new Date(entry.submitted_at).toLocaleString()}</td>
                    <td>{entry.created_by}</td>
                    <td>{new Date(entry.updated_at).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="13" className="text-center">
                    No surveys found.
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

export default CustomerSurveyTable;
