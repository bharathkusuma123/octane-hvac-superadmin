import React, { useState, useEffect } from "react";
import "./CompanyInformation.css";

const CompanyTable = ({ onAdd }) => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const dummyData = [
      {
        company_id: 1,
        company_name: "ABC Corp",
        cr_number: "1234567890",
        vat_number: "VAT987654321",
        service_email: "service@abc.com",
        gm_email: "gm@abc.com",
        currency_code: "USD",
        time_zone: "America/New_York",
        status: "Active",
        created_at: "2024-01-01 10:00:00",
        updated_at: "2024-05-01 15:00:00",
        created_by: "admin",
        updated_by: "manager",
      },
      // Add more dummy companies as needed
    ];

    const sortedData = dummyData.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    setCompanies(sortedData);
    setFilteredCompanies(sortedData);
  }, []);

  useEffect(() => {
    const filtered = companies.filter((comp) =>
      Object.values(comp)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredCompanies(filtered);
    setCurrentPage(1);
  }, [searchTerm, companies]);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredCompanies.length / entriesPerPage);

  return (
    <div className="container my-4">
      <div className="company-table-box p-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
          <div>
            <h2 className="company-form-heading mb-0">Company List</h2>
            <p className="text-muted mb-0">Manage company records</p>
          </div>
          <button className="btn btn-primary" onClick={onAdd}>
            Add Company
          </button>
        </div>

        {/* Controls */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
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
            placeholder="Search companies..."
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
                <th>ID</th>
                <th>Company Name</th>
                <th>CR Number</th>
                <th>VAT Number</th>
                <th>Service Email</th>
                <th>GM Email</th>
                <th>Currency</th>
                <th>Time Zone</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Created By</th>
                <th>Updated By</th>
              </tr>
            </thead>
            <tbody>
              {currentCompanies.length > 0 ? (
                currentCompanies.map((company, index) => (
                  <tr key={index}>
                    <td>{indexOfFirstEntry + index + 1}</td>
                    <td>{company.company_id}</td>
                    <td>{company.company_name}</td>
                    <td>{company.cr_number}</td>
                    <td>{company.vat_number}</td>
                    <td>{company.service_email}</td>
                    <td>{company.gm_email}</td>
                    <td>{company.currency_code}</td>
                    <td>{company.time_zone}</td>
                    <td>
                      <span
                        className={`badge ${
                          company.status === "Active"
                            ? "bg-success"
                            : company.status === "Inactive"
                            ? "bg-warning text-dark"
                            : "bg-danger"
                        }`}
                      >
                        {company.status}
                      </span>
                    </td>
                    <td>{new Date(company.created_at).toLocaleString()}</td>
                    <td>{new Date(company.updated_at).toLocaleString()}</td>
                    <td>{company.created_by}</td>
                    <td>{company.updated_by}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="14" className="text-center">
                    No companies found.
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

export default CompanyTable;
