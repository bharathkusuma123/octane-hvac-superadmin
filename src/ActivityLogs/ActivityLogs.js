import React, { useMemo, useState } from "react";

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

  // Enhanced function to format date from "yyyy-mm-dd HH:MM AM/PM" to "dd/mm/yyyy HH:MM AM/PM"
  const formatDate = (dateString) => {
    try {
      const [datePart, timePart] = dateString.split(' ');
      const [year, month, day] = datePart.split('-');
      return `${day}/${month}/${year} ${timePart}`;
    } catch (error) {
      return dateString; // Return original if formatting fails
    }
  };

  // Function to format date in multiple formats for search
  const formatDateForSearch = (dateString) => {
    if (!dateString) return '';
    
    try {
      const [datePart, timePart] = dateString.split(' ');
      const [year, month, day] = datePart.split('-');
      
      // Extract time components
      const [time, period] = timePart ? timePart.split(' ') : ['', ''];
      const [hourStr, minuteStr] = time ? time.split(':') : ['', ''];
      const hour = hourStr ? parseInt(hourStr, 10) : 0;
      const minute = minuteStr ? parseInt(minuteStr, 10) : 0;
      
      // Convert to 24-hour format for better search
      let hour24 = hour;
      if (period === 'PM' && hour !== 12) hour24 = hour + 12;
      if (period === 'AM' && hour === 12) hour24 = 0;
      
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const monthShortNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      
      const monthNum = parseInt(month, 10) - 1;
      const monthName = monthNames[monthNum];
      const monthShort = monthShortNames[monthNum];
      
      // Return multiple formats for better searchability
      return [
        // Original format
        dateString,
        // Formatted display format
        `${day}/${month}/${year} ${timePart}`,
        // Date only formats
        `${day}/${month}/${year}`,
        `${month}/${day}/${year}`,
        `${year}-${month}-${day}`,
        `${year}${month}${day}`,
        `${day}-${month}-${year}`,
        // Month formats
        monthName,
        monthShort,
        month,
        // Year formats
        year,
        `${month}/${year}`,
        `${year}-${month}`,
        // Time formats
        timePart,
        time,
        period,
        `${hour24}:${minute.toString().padStart(2, '0')}`,
        // Full date with month name
        `${day} ${monthName} ${year}`,
        `${day} ${monthShort} ${year}`,
        // Searchable variations
        `${day}${month}${year}`,
        `${month}${day}${year}`,
        `${year}${day}${month}`,
        // AM/PM variations
        period === 'AM' ? 'morning am' : '',
        period === 'PM' ? 'afternoon pm evening' : '',
      ].join(' ');
    } catch (error) {
      return dateString;
    }
  };

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: "user", direction: "asc" });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    
    if (!q) {
      // No search term, return all logs with sorting
      return [...logs].sort((a, b) => {
        if (sortConfig.key === "timestamp") {
          const aDate = new Date(a.timestamp);
          const bDate = new Date(b.timestamp);
          if (sortConfig.direction === "asc") {
            return aDate - bDate;
          } else {
            return bDate - aDate;
          }
        }
        
        const aVal = String(a[sortConfig.key]).toLowerCase();
        const bVal = String(b[sortConfig.key]).toLowerCase();
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    // Enhanced global search with all properties
    const searchResults = logs.filter((log) => {
      // Create a comprehensive search string for each log
      const searchableText = [
        // Original values
        log.user,
        log.category,
        log.object,
        log.timestamp,
        String(log.slNo),
        
        // Formatted date for search
        formatDateForSearch(log.timestamp),
        
        // Email username (without domain)
        log.user ? log.user.split('@')[0] : '',
        
        // Domain part of email
        log.user ? log.user.split('@')[1] : '',
        
        // Category variations
        log.category ? `${log.category.toLowerCase()}` : '',
        log.category ? `${log.category.toLowerCase()}s` : '', // plural
        log.category === 'Compute' ? 'compute vm virtual machine server' : '',
        log.category === 'Storage' ? 'storage blob file disk' : '',
        log.category === 'Policy' ? 'policy rule security compliance' : '',
        log.category === 'Network' ? 'network firewall vnet subnet' : '',
        
        // Object variations
        log.object ? `${log.object.toLowerCase()}` : '',
        log.object ? log.object.toLowerCase().replace(/\s+/g, '') : '', // without spaces
        log.object === 'Virtual Machine' ? 'vm virtualmachine machine' : '',
        log.object === 'Blob Storage' ? 'blobstorage blob container' : '',
        log.object === 'Policy Rule' ? 'policyrule rule policy' : '',
        log.object === 'Firewall' ? 'firewall security network' : '',
        log.object === 'VM Extension' ? 'vmextension extension vm' : '',
        log.object === 'Append Tag' ? 'appendtag tag tagging metadata' : '',
        log.object === 'SAS Token' ? 'sastoken token sas security' : '',
        
        // User variations
        log.user ? log.user.split('@')[0].replace(/[^a-z0-9]/gi, ' ') : '', // username without special chars
        log.user === 'ops@contoso.com' ? 'operations ops administrator' : '',
        log.user === 'audit@contoso.com' ? 'audit auditor auditing' : '',
        
        // Convert slNo to words (for "one", "two", etc. search)
        String(log.slNo) === '1' ? 'one first' : '',
        String(log.slNo) === '2' ? 'two second' : '',
        String(log.slNo) === '3' ? 'three third' : '',
        String(log.slNo) === '4' ? 'four fourth' : '',
        String(log.slNo) === '5' ? 'five fifth' : '',
        String(log.slNo) === '6' ? 'six sixth' : '',
        String(log.slNo) === '7' ? 'seven seventh' : '',
        
        // Add all values as lowercase for search
        ...Object.values(log).filter(val => 
          val !== null && val !== undefined
        ).map(val => String(val).toLowerCase())
      ]
      .join(' ')                    // Combine into one string
      .toLowerCase()                // Make case-insensitive
      .replace(/\s+/g, ' ')         // Normalize spaces
      .trim();
      
      return searchableText.includes(q);
    });

    // Apply sorting to filtered results
    return searchResults.sort((a, b) => {
      if (sortConfig.key === "timestamp") {
        const aDate = new Date(a.timestamp);
        const bDate = new Date(b.timestamp);
        if (sortConfig.direction === "asc") {
          return aDate - bDate;
        } else {
          return bDate - aDate;
        }
      }
      
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
            <strong>Search Results:</strong> Found {filtered.length} log(s) matching "{search}"
          </div>
        )}

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
                  <td colSpan="5" className="text-center">
                    {search ? `No logs found matching "${search}"` : 'No logs found'}
                  </td>
                </tr>
              ) : (
                pageData.map((row, idx) => (
                  <tr key={row.slNo}>
                    <td>{start + idx + 1}</td>
                    <td>{row.user}</td>
                    <td>{row.category}</td>
                    <td>{formatDate(row.timestamp)}</td>
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
        {pageCount > 1 && (
          <div className="mt-3 d-flex justify-content-center align-items-center gap-3 flex-wrap">
            <button
              className="btn btn-outline-primary btn-sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </button>
            
            <div className="d-flex align-items-center gap-1 mx-2">
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
                    className={`btn btn-sm ${currentPage === page ? 'btn-primary' : 'btn-outline-primary'}`}
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
        )}
      </div>
    </div>
  );
};

export default ActivityLogs;