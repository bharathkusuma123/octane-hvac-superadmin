import React, { useContext, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../AuthContext/AuthContext";
import './CustomerReports.css';

const CustomerReports = () => {
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const customerData = [
    { id: 1, name: "John Doe", email: "john@example.com", mobile: "1234567890", city: "New York" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", mobile: "9876543210", city: "Los Angeles" },
    { id: 3, name: "Alice Brown", email: "alice@example.com", mobile: "5551234567", city: "Chicago" },
    { id: 4, name: "Bob Johnson", email: "bob@example.com", mobile: "8887776666", city: "Houston" },
    { id: 5, name: "Emily Davis", email: "emily@example.com", mobile: "9990001111", city: "Phoenix" },
    { id: 6, name: "Mike Wilson", email: "mike@example.com", mobile: "1112223333", city: "Miami" },
    { id: 7, name: "Sara Lee", email: "sara@example.com", mobile: "4445556666", city: "Seattle" },
  ];

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  const filteredData = useMemo(() => {
    const lower = search.toLowerCase();
    return customerData
      .filter(c =>
        c.name.toLowerCase().includes(lower) ||
        c.email.toLowerCase().includes(lower) ||
        c.mobile.includes(lower)
      )
      .sort((a, b) => {
        const aVal = a[sortConfig.key].toString().toLowerCase();
        const bVal = b[sortConfig.key].toString().toLowerCase();
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
  }, [search, sortConfig, customerData]);

  const pageCount = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleSort = (key) => {
    if (sortConfig.key === key) {
      setSortConfig({ key, direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' });
    } else {
      setSortConfig({ key, direction: 'asc' });
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-sm rounded-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h4 className="mb-0 fw-bold">Customer Reports</h4>
            <small className="text-muted">Manage all your customer information</small>
          </div>
        </div>

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
            style={{ width: "300px" }}
            placeholder="Search customers..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center">
            <thead className="custom-thead text-center">
              <tr>
                <th style={{ cursor: 'pointer', background: '#0099dd', color: 'white' }}>S.No</th>
                <th style={{ cursor: 'pointer', background: '#0099dd', color: 'white' }} onClick={() => handleSort('name')}>Name</th>
                <th style={{ cursor: 'pointer', background: '#0099dd', color: 'white' }} onClick={() => handleSort('email')}>Email</th>
                <th style={{ cursor: 'pointer', background: '#0099dd', color: 'white' }} onClick={() => handleSort('mobile')}>Mobile</th>
                <th style={{ cursor: 'pointer', background: '#0099dd', color: 'white' }} onClick={() => handleSort('city')}>City</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr><td colSpan="5">No matching customers</td></tr>
              ) : (
                paginatedData.map((c, i) => (
                  <tr key={c.id}>
                    <td>{(currentPage - 1) * rowsPerPage + i + 1}</td>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.mobile}</td>
                    <td>{c.city}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination UI */}
        <div className="pagination-container mt-3 d-flex justify-content-center align-items-center gap-3 flex-wrap">
          <button
            className="btn btn-outline-primary btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Previous
          </button>
          <span className="fw-semibold">
            Page {currentPage} of {pageCount}
          </span>
          <button
            className="btn btn-outline-primary btn-sm"
            disabled={currentPage === pageCount}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
};

export default CustomerReports;
