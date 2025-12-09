// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import baseURL from "../ApiUrl/Apiurl";
// import { AuthContext } from "../AuthContext/AuthContext";
// import ProblemTypeForm from "./ProblemTypeForm"; // Import the new component
// import "./ProblemType.css";

// const ProblemType = () => {
//   const [problemTypes, setProblemTypes] = useState([]);
//   const [filteredProblemTypes, setFilteredProblemTypes] = useState([]);
//   const [editing, setEditing] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [entriesPerPage, setEntriesPerPage] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);

//   const { userId } = useContext(AuthContext);
//   const companyId = "COMP1";

//   // Fetch all problem types
//   const fetchProblemTypes = async () => {
//     try {
//       const response = await axios.get(`${baseURL}/problem-types/`);
//       console.log("API Response:", response.data);
      
//       const apiData = response.data.data || [];
//       const sortedData = Array.isArray(apiData) 
//         ? apiData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
//         : [];
      
//       console.log("Processed Data:", sortedData);
//       setProblemTypes(sortedData);
//       setFilteredProblemTypes(sortedData);
//     } catch (error) {
//       console.error("Error fetching problem types:", error);
//       alert("Failed to fetch problem types");
//     }
//   };

//   useEffect(() => {
//     fetchProblemTypes();
//   }, []);

//   // Handle form submission
//   const handleSubmit = async (formData) => {
//     if (!formData.name.trim() || !formData.description.trim()) {
//       alert("Please enter both name and description");
//       return;
//     }

//     if (!userId) {
//       alert("User ID not found. Please login again.");
//       return;
//     }

//     if (!companyId) {
//       alert("Company ID not found. Please select a company.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         name: formData.name,
//         description: formData.description,
//         user_id: userId,
//         company_id: companyId
//       };

//       if (editing) {
//         // UPDATE
//         payload.problem_type_id = editing.problem_type_id;
//         const response = await axios.put(`${baseURL}/problem-types/${editing.problem_type_id}/`, payload);
//         if (response.data.status === "success") {
//           alert("Problem Type updated successfully!");
//         } else {
//           throw new Error(response.data.message || "Update failed");
//         }
//       } else {
//         // CREATE
//         const response = await axios.post(`${baseURL}/problem-types/`, payload);
//         if (response.data.status === "success") {
//           alert("Problem Type added successfully!");
//         } else {
//           throw new Error(response.data.message || "Creation failed");
//         }
//       }

//       setEditing(null);
//       setIsFormVisible(false);
//       fetchProblemTypes();
//     } catch (error) {
//       console.error("Error saving problem type:", error);
//       alert(error.message || "Failed to save problem type");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle delete
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this problem type?")) return;

//     try {
//       const response = await axios.delete(`${baseURL}/problem-types/${id}/?user_id=${userId}`);
//       if (response.data.status === "success") {
//         alert("Problem Type deleted successfully!");
//       } else {
//         throw new Error(response.data.message || "Delete failed");
//       }
//       fetchProblemTypes();
//     } catch (error) {
//       console.error("Error deleting problem type:", error);
//       alert(error.message || "Failed to delete problem type");
//     }
//   };

//   // Handle edit
//   const handleEdit = (problemType) => {
//     setEditing(problemType);
//     setIsFormVisible(true);
//   };

//   // Handle add new
//   const handleAdd = () => {
//     setEditing(null);
//     setIsFormVisible(true);
//   };

//   // Handle cancel
//   const handleCancel = () => {
//     setEditing(null);
//     setIsFormVisible(false);
//   };

//   // Search and filter
//   useEffect(() => {
//     const filtered = problemTypes.filter((pt) =>
//       Object.values(pt)
//         .join(" ")
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//     );
//     setFilteredProblemTypes(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, problemTypes]);

//   // Format date time
//   const formatDateTime = (dateString) => {
//     if (!dateString) return '-';
//     const date = new Date(dateString);
//     return date.toLocaleString('en-IN', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: false,
//       timeZone: 'Asia/Kolkata'
//     });
//   };

//   // Pagination
//   const indexOfLastEntry = currentPage * entriesPerPage;
//   const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
//   const currentProblemTypes = filteredProblemTypes.slice(indexOfFirstEntry, indexOfLastEntry);
//   const totalPages = Math.ceil(filteredProblemTypes.length / entriesPerPage);

//   // Table Component
//   const ProblemTypeTable = () => (
//     <div className="problem-type-management-container">
//       <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
//         <div>
//           <h2 className="problem-type-management-title mb-0">Problem Type Management</h2>
//           <p className="problem-type-management-subtitle mb-0 text-muted">
//             Manage problem types | User: <strong>{userId}</strong> | Company: <strong>{companyId}</strong>
//           </p>
//         </div>
//         <button 
//           onClick={handleAdd} 
//           className="btn btn-primary"
//           disabled={!userId || !companyId}
//         >
//           Add New Problem Type
//         </button>
//       </div>

//       {(!userId || !companyId) && (
//         <div className="alert alert-warning">
//           <strong>Warning:</strong> {!userId ? "User ID not found. Please login again." : "Company ID not found. Please select a company."}
//         </div>
//       )}

//       <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
//         <div className="d-flex align-items-center gap-2">
//           Show
//           <select
//             value={entriesPerPage}
//             onChange={(e) => setEntriesPerPage(Number(e.target.value))}
//             className="form-select form-select-sm w-auto"
//           >
//             <option value={5}>5</option>
//             <option value={10}>10</option>
//             <option value={25}>25</option>
//           </select>
//           entries
//         </div>
//         <input
//           type="text"
//           placeholder="Search problem types..."
//           className="form-control w-auto"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <div className="table-responsive mb-4">
//         <table className="table">
//           <thead className="product-table-header">
//             <tr>
//               <th>S.No</th>
//               <th>Problem Type ID</th>
//               <th>Name</th>
//               <th>Description</th>
//               <th>Created At</th>
//               <th>Updated At</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentProblemTypes.length > 0 ? (
//               currentProblemTypes.map((problemType, index) => (
//                 <tr key={problemType.problem_type_id}>
//                   <td>{indexOfFirstEntry + index + 1}</td>
//                   <td>{problemType.problem_type_id}</td>
//                   <td>{problemType.name}</td>
//                   <td>{problemType.description}</td>
//                   <td>{formatDateTime(problemType.created_at)}</td>
//                   <td>{formatDateTime(problemType.updated_at)}</td>
//                   <td>
//                     <div className="action-icons">
//                       <FaEdit
//                         title="Edit"
//                         onClick={() => handleEdit(problemType)}
//                         className="action-icon edit-icon"
//                       />
//                       <FaTrash
//                         title="Delete"
//                         onClick={() => handleDelete(problemType.problem_type_id)}
//                         className="action-icon delete-icon"
//                       />
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-center">No problem types found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="pagination-controls d-flex justify-content-center mt-3">
//         <button
//           className="btn btn-outline-primary me-2"
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((prev) => prev - 1)}
//         >
//           Previous
//         </button>
//         <span className="align-self-center mx-2">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           className="btn btn-outline-primary ms-2"
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage((prev) => prev + 1)}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );

//   return isFormVisible ? (
//     <ProblemTypeForm 
//       editing={editing}
//       onCancel={handleCancel}
//       onSubmit={handleSubmit}
//       loading={loading}
//     />
//   ) : (
//     <ProblemTypeTable />
//   );
// };

// export default ProblemType;


//===============================================================
// After fixing filter -Global search issue 


import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import baseURL from "../ApiUrl/Apiurl";
import { AuthContext } from "../AuthContext/AuthContext";
import ProblemTypeForm from "./ProblemTypeForm";
import "./ProblemType.css";

const ProblemType = () => {
  const [problemTypes, setProblemTypes] = useState([]);
  const [filteredProblemTypes, setFilteredProblemTypes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]); // To store user data for search

  const { userId } = useContext(AuthContext);
  const companyId = "COMP1";

  // Fetch users data for username search
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${baseURL}/users/`);
      if (response.data && Array.isArray(response.data)) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch all problem types
  const fetchProblemTypes = async () => {
    try {
      const response = await axios.get(`${baseURL}/problem-types/`);
      console.log("API Response:", response.data);
      
      const apiData = response.data.data || [];
      const sortedData = Array.isArray(apiData) 
        ? apiData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        : [];
      
      console.log("Processed Data:", sortedData);
      setProblemTypes(sortedData);
      setFilteredProblemTypes(sortedData);
    } catch (error) {
      console.error("Error fetching problem types:", error);
      alert("Failed to fetch problem types");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchProblemTypes();
  }, []);

  // Function to get username from user_id
  const getUsernameById = (userId) => {
    if (!userId || users.length === 0) return userId;
    
    const user = users.find(user => user.user_id === userId);
    return user ? user.username : userId;
  };

  // Function to format date for display
  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata'
    });
  };

  // Function to format date in multiple formats for search
  const formatDateForSearch = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) return '';
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const monthName = date.toLocaleString('en-IN', { month: 'long' });
    const monthShort = date.toLocaleString('en-IN', { month: 'short' });
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    
    // Return multiple formats for better searchability
    return [
      `${day}/${month}/${year}`,                    // DD/MM/YYYY
      `${day}/${month}/${year} ${hour}:${minute}:${second}`, // DD/MM/YYYY HH:MM:SS
      `${month}/${day}/${year}`,                    // MM/DD/YYYY
      `${year}-${month}-${day}`,                    // YYYY-MM-DD
      `${year}${month}${day}`,                      // YYYYMMDD
      `${day}-${month}-${year}`,                    // DD-MM-YYYY
      date.toISOString(),                           // ISO string
      monthName,                                    // January, February
      monthShort,                                   // Jan, Feb
      `${year}`,                                    // 2024
      `${month}/${year}`,                           // MM/YYYY
      `${day} ${monthName} ${year}`,               // 15 January 2024
      `${day} ${monthShort} ${year}`,              // 15 Jan 2024
      `${hour}:${minute}`,                          // HH:MM
      `${hour}:${minute}:${second}`,               // HH:MM:SS
    ].join(' ');
  };

  // Enhanced global search functionality
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProblemTypes(problemTypes);
      setCurrentPage(1);
      return;
    }

    const searchLower = searchTerm.toLowerCase().trim();
    
    const filtered = problemTypes.filter((problemType) => {
      // Get user data for search
      const createdByUsername = getUsernameById(problemType.created_by);
      const updatedByUsername = getUsernameById(problemType.updated_by);
      
      // Get dates in multiple formats for search
      const createdDateFormats = formatDateForSearch(problemType.created_at);
      const updatedDateFormats = formatDateForSearch(problemType.updated_at);
      
      // Create a comprehensive search string
      const searchableText = [
        // Raw problem type data
        problemType.problem_type_id || '',
        problemType.name || '',
        problemType.description || '',
        problemType.created_at || '',
        problemType.updated_at || '',
        problemType.created_by || '',
        problemType.updated_by || '',
        problemType.company_id || '',
        problemType.status || '',
        problemType.is_active !== undefined ? String(problemType.is_active) : '',
        
        // Formatted user data for search
        createdByUsername,
        updatedByUsername,
        
        // Dates in multiple formats
        createdDateFormats,
        updatedDateFormats,
        
        // Display values (exactly as shown in table)
        formatDateTime(problemType.created_at),
        formatDateTime(problemType.updated_at),
        
        // Status variations for better search
        problemType.status === 'Active' ? 'Active Active Active' : '',
        problemType.status === 'Inactive' ? 'Inactive Inactive Inactive' : '',
        problemType.status === 'Pending' ? 'Pending Pending Pending' : '',
        
        // Active/Inactive variations
        problemType.is_active === true ? 'active true yes enabled' : '',
        problemType.is_active === false ? 'inactive false no disabled' : '',
        
        // Company variations
        companyId ? `company ${companyId} COMP1` : '',
        
        // Name and description variations (for partial matching)
        problemType.name ? problemType.name.toLowerCase().split(' ').join(' ') : '',
        problemType.description ? problemType.description.toLowerCase().split(' ').join(' ') : '',
        problemType.name ? problemType.name.toLowerCase().replace(/\s+/g, '') : '',
        problemType.description ? problemType.description.toLowerCase().replace(/\s+/g, '') : '',
        
        // Add any other properties that might exist
        ...Object.values(problemType).filter(val => 
          val !== null && val !== undefined
        ).map(val => {
          if (typeof val === 'string' || typeof val === 'number') {
            return String(val);
          }
          if (typeof val === 'boolean') {
            return val ? 'true yes active' : 'false no inactive';
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
      
      return searchableText.includes(searchLower);
    });
    
    setFilteredProblemTypes(filtered);
    setCurrentPage(1);
  }, [searchTerm, problemTypes, users]);

  // Handle form submission
  const handleSubmit = async (formData) => {
    if (!formData.name.trim() || !formData.description.trim()) {
      alert("Please enter both name and description");
      return;
    }

    if (!userId) {
      alert("User ID not found. Please login again.");
      return;
    }

    if (!companyId) {
      alert("Company ID not found. Please select a company.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        user_id: userId,
        company_id: companyId
      };

      if (editing) {
        // UPDATE
        payload.problem_type_id = editing.problem_type_id;
        const response = await axios.put(`${baseURL}/problem-types/${editing.problem_type_id}/`, payload);
        if (response.data.status === "success") {
          alert("Problem Type updated successfully!");
        } else {
          throw new Error(response.data.message || "Update failed");
        }
      } else {
        // CREATE
        const response = await axios.post(`${baseURL}/problem-types/`, payload);
        if (response.data.status === "success") {
          alert("Problem Type added successfully!");
        } else {
          throw new Error(response.data.message || "Creation failed");
        }
      }

      setEditing(null);
      setIsFormVisible(false);
      fetchProblemTypes();
    } catch (error) {
      console.error("Error saving problem type:", error);
      alert(error.message || "Failed to save problem type");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this problem type?")) return;

    try {
      const response = await axios.delete(`${baseURL}/problem-types/${id}/?user_id=${userId}`);
      if (response.data.status === "success") {
        alert("Problem Type deleted successfully!");
      } else {
        throw new Error(response.data.message || "Delete failed");
      }
      fetchProblemTypes();
    } catch (error) {
      console.error("Error deleting problem type:", error);
      alert(error.message || "Failed to delete problem type");
    }
  };

  // Handle edit
  const handleEdit = (problemType) => {
    setEditing(problemType);
    setIsFormVisible(true);
  };

  // Handle add new
  const handleAdd = () => {
    setEditing(null);
    setIsFormVisible(true);
  };

  // Handle cancel
  const handleCancel = () => {
    setEditing(null);
    setIsFormVisible(false);
  };

  // Pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentProblemTypes = filteredProblemTypes.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredProblemTypes.length / entriesPerPage);

  // Table Component
  const ProblemTypeTable = () => (
    <div className="problem-type-management-container">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <div>
          <h2 className="problem-type-management-title mb-0">Problem Type Management</h2>
          <p className="problem-type-management-subtitle mb-0 text-muted">
            Manage problem types | User: <strong>{userId}</strong> | Company: <strong>{companyId}</strong>
          </p>
        </div>
        <button 
          onClick={handleAdd} 
          className="btn btn-primary"
          disabled={!userId || !companyId}
        >
          Add New Problem Type
        </button>
      </div>

      {(!userId || !companyId) && (
        <div className="alert alert-warning">
          <strong>Warning:</strong> {!userId ? "User ID not found. Please login again." : "Company ID not found. Please select a company."}
        </div>
      )}

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
        <div className="d-flex align-items-center gap-2">
          <input
            type="text"
            placeholder="Search in all columns..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ minWidth: '250px' }}
          />
          {searchTerm && (
            <button 
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setSearchTerm('')}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Search Results Info */}
      {searchTerm && (
        <div className="alert alert-info mb-3">
          <strong>Search Results:</strong> Found {filteredProblemTypes.length} problem type(s) matching "{searchTerm}"
        </div>
      )}

      <div className="table-responsive mb-4">
        <table className="table">
          <thead className="product-table-header">
            <tr>
              <th>S.No</th>
              <th>Problem Type ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProblemTypes.length > 0 ? (
              currentProblemTypes.map((problemType, index) => (
                <tr key={problemType.problem_type_id}>
                  <td>{indexOfFirstEntry + index + 1}</td>
                  <td>{problemType.problem_type_id}</td>
                  <td>{problemType.name}</td>
                  <td>{problemType.description}</td>
                  <td>{formatDateTime(problemType.created_at)}</td>
                  <td>{formatDateTime(problemType.updated_at)}</td>
                  <td>
                    <div className="action-icons">
                      <FaEdit
                        title="Edit"
                        onClick={() => handleEdit(problemType)}
                        className="action-icon edit-icon"
                      />
                      <FaTrash
                        title="Delete"
                        onClick={() => handleDelete(problemType.problem_type_id)}
                        className="action-icon delete-icon"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  {searchTerm ? `No problem types found matching "${searchTerm}"` : 'No problem types found.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination-controls d-flex justify-content-center mt-3">
          <button
            className="btn btn-outline-primary me-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
          
          <div className="d-flex align-items-center mx-2">
            {(() => {
              const maxVisiblePages = 5;
              let pageNumbers = [];
              
              if (totalPages <= maxVisiblePages) {
                for (let i = 1; i <= totalPages; i++) {
                  pageNumbers.push(i);
                }
              } else {
                let startPage = Math.max(1, currentPage - 2);
                let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
                
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
      )}
    </div>
  );

  return isFormVisible ? (
    <ProblemTypeForm 
      editing={editing}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
      loading={loading}
    />
  ) : (
    <ProblemTypeTable />
  );
};

export default ProblemType;