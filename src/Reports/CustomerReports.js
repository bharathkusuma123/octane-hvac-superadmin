import React, { useContext, useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../AuthContext/AuthContext";
import './CustomerReports.css';

const CustomerReports = () => {
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const customerData = [
    { id: 1, name: "John Doe", email: "john@example.com", mobile: "1234567890", city: "New York", country: "USA", postalCode: "10001", status: "Active", createdDate: "2024-01-15", lastPurchase: "2024-03-20" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", mobile: "9876543210", city: "Los Angeles", country: "USA", postalCode: "90001", status: "Active", createdDate: "2024-02-10", lastPurchase: "2024-03-18" },
    { id: 3, name: "Alice Brown", email: "alice@example.com", mobile: "5551234567", city: "Chicago", country: "USA", postalCode: "60601", status: "Inactive", createdDate: "2024-01-05", lastPurchase: "2024-02-15" },
    { id: 4, name: "Bob Johnson", email: "bob@example.com", mobile: "8887776666", city: "Houston", country: "USA", postalCode: "77001", status: "Active", createdDate: "2024-03-01", lastPurchase: "2024-03-25" },
    { id: 5, name: "Emily Davis", email: "emily@example.com", mobile: "9990001111", city: "Phoenix", country: "USA", postalCode: "85001", status: "Pending", createdDate: "2024-02-28", lastPurchase: null },
    { id: 6, name: "Mike Wilson", email: "mike@example.com", mobile: "1112223333", city: "Miami", country: "USA", postalCode: "33101", status: "Active", createdDate: "2024-01-20", lastPurchase: "2024-03-22" },
    { id: 7, name: "Sara Lee", email: "sara@example.com", mobile: "4445556666", city: "Seattle", country: "USA", postalCode: "98101", status: "Suspended", createdDate: "2024-02-15", lastPurchase: "2024-02-28" },
  ];

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [searchHistory, setSearchHistory] = useState([]);

  // Function to format date for search in multiple formats
  const formatDateForSearch = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) return '';
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const monthName = date.toLocaleString('en-IN', { month: 'long' });
    const monthShort = date.toLocaleString('en-IN', { month: 'short' });
    
    return [
      `${day}/${month}/${year}`,                    // DD/MM/YYYY
      `${month}/${day}/${year}`,                    // MM/DD/YYYY
      `${year}-${month}-${day}`,                    // YYYY-MM-DD
      `${year}${month}${day}`,                      // YYYYMMDD
      `${day}-${month}-${year}`,                    // DD-MM-YYYY
      monthName,                                    // January, February
      monthShort,                                   // Jan, Feb
      `${year}`,                                    // 2024
      `${month}/${year}`,                           // MM/YYYY
      `${day} ${monthName} ${year}`,               // 15 January 2024
      `${day} ${monthShort} ${year}`,              // 15 Jan 2024
    ].join(' ');
  };

  // Enhanced global search filtering
  const filteredData = useMemo(() => {
    if (!search.trim()) {
      return customerData.sort((a, b) => {
        const aVal = a[sortConfig.key]?.toString().toLowerCase() || '';
        const bVal = b[sortConfig.key]?.toString().toLowerCase() || '';
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    const searchLower = search.toLowerCase().trim();
    
    // Save search term to history (limited to last 5 searches)
    if (searchLower && !searchHistory.includes(searchLower)) {
      setSearchHistory(prev => [searchLower, ...prev.slice(0, 4)]);
    }
    
    const results = customerData.filter(customer => {
      // Get dates in multiple formats for search
      const createdDateFormats = formatDateForSearch(customer.createdDate);
      const lastPurchaseFormats = formatDateForSearch(customer.lastPurchase);
      
      // Create a comprehensive search string from ALL customer properties
      const searchableText = [
        // Displayed properties
        customer.id.toString(),
        customer.name || '',
        customer.email || '',
        customer.mobile || '',
        customer.city || '',
        
        // Hidden properties (not displayed in table but still searchable)
        customer.country || '',
        customer.postalCode || '',
        customer.status || '',
        customer.createdDate || '',
        customer.lastPurchase || '',
        
        // Dates in multiple formats
        createdDateFormats,
        lastPurchaseFormats,
        
        // Status variations for better search
        customer.status === 'Active' ? 'Active Active Active' : '',
        customer.status === 'Inactive' ? 'Inactive Inactive Inactive' : '',
        customer.status === 'Pending' ? 'Pending Pending Pending' : '',
        customer.status === 'Suspended' ? 'Suspended Suspended Suspended' : '',
        
        // Name variations (first and last name separately)
        ...(customer.name ? customer.name.toLowerCase().split(' ') : []),
        
        // Email variations (username part)
        customer.email ? customer.email.split('@')[0] : '',
        
        // Mobile number variations (without formatting)
        customer.mobile ? customer.mobile.replace(/\D/g, '') : '',
        
        // City variations (common abbreviations)
        customer.city === 'New York' ? 'NY NYC' : '',
        customer.city === 'Los Angeles' ? 'LA' : '',
        customer.city === 'Chicago' ? 'CHI' : '',
        customer.city === 'Houston' ? 'HOU' : '',
        customer.city === 'Phoenix' ? 'PHX' : '',
        customer.city === 'Miami' ? 'MIA' : '',
        customer.city === 'Seattle' ? 'SEA' : '',
        
        // Country variations
        customer.country === 'USA' ? 'USA United States US America' : '',
        
        // Postal code variations
        customer.postalCode || '',
      ]
      .filter(Boolean) // Remove empty strings
      .join(' ')       // Combine into one string
      .toLowerCase()   // Make case-insensitive
      .replace(/\s+/g, ' ') // Normalize spaces
      .trim();
      
      return searchableText.includes(searchLower);
    });
    
    // Sort the filtered results
    return results.sort((a, b) => {
      const aVal = a[sortConfig.key]?.toString().toLowerCase() || '';
      const bVal = b[sortConfig.key]?.toString().toLowerCase() || '';
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [search, sortConfig, customerData, searchHistory]);

  const pageCount = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleSort = (key) => {
    if (sortConfig.key === key) {
      setSortConfig({ key, direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' });
    } else {
      setSortConfig({ key, direction: 'asc' });
    }
  };

  // Clear search history
  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  return (
    <div className="container-fluid mt-4">
      <div className="company-table-box p-4 shadow-sm rounded-4">
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

          <div className="d-flex align-items-center gap-2">
            <input
              type="text"
              className="form-control"
              style={{ width: "300px" }}
              placeholder="Search in all fields..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
            {search && (
              <button 
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setSearch('')}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Search Results Info and Search History */}
        {search && (
          <div className="alert alert-info mb-3">
            <strong>Search Results:</strong> Found {filteredData.length} customer(s) matching "{search}"
          </div>
        )}

        {/* {searchHistory.length > 0 && (
          <div className="mb-3">
            <small className="text-muted">Recent searches: </small>
            {searchHistory.map((term, index) => (
              <button
                key={index}
                className="btn btn-sm btn-outline-primary me-2 mb-1"
                onClick={() => {
                  setSearch(term);
                  setCurrentPage(1);
                }}
              >
                {term}
              </button>
            ))}
            <button
              className="btn btn-sm btn-outline-danger mb-1"
              onClick={clearSearchHistory}
            >
              Clear History
            </button>
          </div>
        )} */}

        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center">
            <thead className="custom-thead text-center">
              <tr>
                <th style={{ cursor: 'pointer', background: '#0099dd', color: 'white' }}>S.No</th>
                <th style={{ cursor: 'pointer', background: '#0099dd', color: 'white' }} onClick={() => handleSort('name')}>
                  Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th style={{ cursor: 'pointer', background: '#0099dd', color: 'white' }} onClick={() => handleSort('email')}>
                  Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th style={{ cursor: 'pointer', background: '#0099dd', color: 'white' }} onClick={() => handleSort('mobile')}>
                  Mobile {sortConfig.key === 'mobile' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th style={{ cursor: 'pointer', background: '#0099dd', color: 'white' }} onClick={() => handleSort('city')}>
                  City {sortConfig.key === 'city' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    {search ? `No customers found matching "${search}"` : 'No customers available'}
                  </td>
                </tr>
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
        {pageCount > 1 && (
          <div className="pagination-container mt-3 d-flex justify-content-center align-items-center gap-3 flex-wrap">
            <button
              className="btn btn-outline-primary btn-sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              Previous
            </button>
            
            <div className="d-flex align-items-center mx-2">
              {(() => {
                const maxVisiblePages = 5;
                let pageNumbers = [];
                
                if (pageCount <= maxVisiblePages) {
                  for (let i = 1; i <= pageCount; i++) {
                    pageNumbers.push(i);
                  }
                } else {
                  let startPage = Math.max(1, currentPage - 2);
                  let endPage = Math.min(pageCount, startPage + maxVisiblePages - 1);
                  
                  if (endPage - startPage + 1 < maxVisiblePages) {
                    startPage = Math.max(1, endPage - maxVisiblePages + 1);
                  }
                  
                  for (let i = startPage; i <= endPage; i++) {
                    pageNumbers.push(i);
                  }
                }
                
                return pageNumbers.map((page) => (
                  <button
                    key={page}
                    className={`btn mx-1 ${currentPage === page ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ));
              })()}
            </div>
            
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
        )}
      </div>
    </div>
  );
};

export default CustomerReports;