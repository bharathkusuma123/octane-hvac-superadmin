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

  // Function to get date in multiple formats for search
  const getDateFormatsForSearch = (dateString) => {
    if (!dateString) return '';
    
    try {
      const [datePart, timePart] = dateString.split(' ');
      const [year, month, day] = datePart.split('-');
      const [hourMinute, ampm] = timePart ? timePart.split(' ') : ['', ''];
      
      const formats = [
        // Original format
        dateString,
        
        // Display format
        `${day}/${month}/${year} ${timePart}`,
        
        // Date only variations
        `${day}/${month}/${year}`,
        `${month}/${day}/${year}`,
        `${year}-${month}-${day}`,
        `${year}${month}${day}`,
        `${day}-${month}-${year}`,
        
        // Time only variations
        timePart,
        hourMinute,
        ampm,
        
        // Month variations
        getMonthName(parseInt(month)),
        getShortMonthName(parseInt(month)),
        
        // Year variations
        year,
        `${month}/${year}`,
        
        // Time without AM/PM
        hourMinute ? `${hourMinute}` : '',
        
        // Hour variations
        hourMinute ? hourMinute.split(':')[0] : '',
        
        // Day variations
        day,
        parseInt(day).toString(), // Remove leading zero
        
        // Month variations (numerical)
        month,
        parseInt(month).toString(), // Remove leading zero
      ];
      
      return formats.join(' ');
    } catch (error) {
      return dateString;
    }
  };

  // Helper function to get month name
  const getMonthName = (monthNum) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthNum - 1] || '';
  };

  // Helper function to get short month name
  const getShortMonthName = (monthNum) => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return months[monthNum - 1] || '';
  };

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'asc' });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    
    if (!q) {
      // No search term, return all logs sorted
      const base = [...logs];
      return base.sort((a, b) => {
        if (sortConfig.key === "timestamp") {
          const aDate = new Date(a.timestamp);
          const bDate = new Date(b.timestamp);
          return sortConfig.direction === "asc" ? aDate - bDate : bDate - aDate;
        }
        
        const aVal = String(a[sortConfig.key]).toLowerCase();
        const bVal = String(b[sortConfig.key]).toLowerCase();
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // Enhanced search across ALL fields
    const base = logs.filter((row) => {
      // Get all searchable text for this row
      const searchableText = [
        // Raw fields
        row.errorId?.toString() || '',
        row.user || '',
        row.errorMessage || '',
        row.errorType || '',
        row.object || '',
        row.timestamp || '',
        
        // Email username part (without domain)
        row.user ? row.user.split('@')[0] : '',
        
        // Error type variations
        row.errorType === 'Backend' ? 'Backend Server BackendServer' : '',
        row.errorType === 'API' ? 'API Rest API REST' : '',
        row.errorType === 'Security' ? 'Security Auth Authentication' : '',
        row.errorType === 'Database' ? 'Database DB SQL' : '',
        
        // Error message variations (common keywords)
        row.errorMessage ? row.errorMessage.toLowerCase().split(' ').join(' ') : '',
        row.errorMessage ? row.errorMessage.replace(/\s+/g, '') : '',
        
        // Object variations
        row.object === 'Virtual Machine' ? 'Virtual Machine VM VirtualMachine' : '',
        row.object === 'Blob Storage' ? 'Blob Storage BlobStorage Storage' : '',
        row.object === 'Policy Rule' ? 'Policy Rule PolicyRule Rule' : '',
        row.object === 'Firewall' ? 'Firewall FW' : '',
        
        // Date in multiple formats
        getDateFormatsForSearch(row.timestamp),
        
        // Display formatted date
        formatDate(row.timestamp),
        
        // Row index (for searching by position)
        (row.errorId).toString(),
        
        // Any other potential fields (even if not in current data structure)
        ...Object.values(row).filter(val => 
          val !== null && val !== undefined
        ).map(val => {
          if (typeof val === 'string' || typeof val === 'number') {
            return String(val);
          }
          if (typeof val === 'boolean') {
            return val ? 'true yes' : 'false no';
          }
          if (Array.isArray(val)) {
            return val.join(' ');
          }
          if (typeof val === 'object' && val !== null) {
            return JSON.stringify(val);
          }
          return '';
        })
      ]
      .join(' ')                    // Combine into one string
      .toLowerCase()                // Make case-insensitive
      .replace(/\s+/g, ' ')         // Normalize spaces
      .trim();
      
      return searchableText.includes(q);
    });

    // Sort the filtered results
    return base.sort((a, b) => {
      if (sortConfig.key === "timestamp") {
        const aDate = new Date(a.timestamp);
        const bDate = new Date(b.timestamp);
        return sortConfig.direction === "asc" ? aDate - bDate : bDate - aDate;
      }
      
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

          <div className="d-flex align-items-center gap-2">
            <input
              type="text"
              className="form-control"
              style={{ width: 300 }}
              placeholder="Search in all columns..."
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

        {/* Search Results Info */}
        {search && (
          <div className="alert alert-info mb-3">
            <strong>Search Results:</strong> Found {filtered.length} error log(s) matching "{search}"
          </div>
        )}

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
                  <td colSpan="7" className="text-center">
                    {search ? `No error logs found matching "${search}"` : 'No error logs found'}
                  </td>
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
          
          <div className="d-flex align-items-center gap-1">
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
                  className={`btn btn-sm mx-1 ${currentPage === page ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ));
            })()}
          </div>
          
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