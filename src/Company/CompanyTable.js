// import React, { useState, useEffect } from "react";
// import "./CompanyInformation.css";

// const CompanyTable = ({ onAdd }) => {
//   const [companies, setCompanies] = useState([]);
//   const [filteredCompanies, setFilteredCompanies] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [entriesPerPage, setEntriesPerPage] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch companies from API
//   useEffect(() => {
//     const fetchCompanies = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch("http://175.29.21.7:8006/companies/");
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         // Assuming data.data is the array of companies
//         const sortedData = data.data.sort(
//           (a, b) => new Date(b.created_at) - new Date(a.created_at)
//         );
//         setCompanies(sortedData);
//         setFilteredCompanies(sortedData);
//       } catch (err) {
//         setError("Failed to fetch companies. Please try again later.");
//         setCompanies([]);
//         setFilteredCompanies([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCompanies();
//   }, []);

//   // Filter on search term change or companies change
//   useEffect(() => {
//     const filtered = companies.filter((comp) =>
//       Object.values(comp)
//         .join(" ")
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//     );
//     setFilteredCompanies(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, companies]);

//   // Pagination calculations
//   const indexOfLastEntry = currentPage * entriesPerPage;
//   const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
//   const currentCompanies = filteredCompanies.slice(
//     indexOfFirstEntry,
//     indexOfLastEntry
//   );
//   const totalPages = Math.ceil(filteredCompanies.length / entriesPerPage);

//     const formatDate = (dateString) => {
//     if (!dateString) return '';
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return 'Invalid date';

//       const day = date.getDate().toString().padStart(2, '0');
//       const month = (date.getMonth() + 1).toString().padStart(2, '0');
//       const year = date.getFullYear();

//       return `${day}/${month}/${year}`;
//     } catch (e) {
//       return 'Invalid date';
//     }
//   };

//   return (
//     <div className="container-fluid my-4">
//       <div className="company-table-box p-4">
//         {/* Header */}
//         <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
//           <div>
//             <h2 className="company-form-heading mb-0">Company List</h2>
//             <p className="text-muted mb-0">Manage company records</p>
//           </div>
//           <button className="btn btn-primary" onClick={onAdd}>
//             Add Company
//           </button>
//         </div>

//         {/* Controls */}
//         <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
//           <div className="d-flex align-items-center gap-2">
//             Show
//             <select
//               value={entriesPerPage}
//               onChange={(e) => setEntriesPerPage(Number(e.target.value))}
//               className="form-select form-select-sm w-auto"
//             >
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={25}>25</option>
//             </select>
//             entries
//           </div>
//           <input
//             type="text"
//             placeholder="Search companies..."
//             className="form-control w-auto"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         {/* Loading and error states */}
//         {loading && (
//           <div className="text-center my-3">
//             <div className="spinner-border text-primary" role="status"></div>
//             <p>Loading companies...</p>
//           </div>
//         )}
//         {error && <div className="alert alert-danger">{error}</div>}

//         {/* Table */}
//         {!loading && !error && (
//           <div className="table-responsive mb-4">
//             <table className="table">
//               <thead className="product-table-header">
//                 <tr>
//                   <th>S.No</th>
//                   <th>ID</th>
//                   <th>Company Name</th>
//                   <th>CR Number</th>
//                   <th>VAT Number</th>
//                   <th>Service Email</th>
//                   <th>GM Email</th>
//                   <th>Currency</th>
//                   <th>Time Zone</th>
//                   <th>Status</th>
//                   <th>Created At</th>
//                   <th>Updated At</th>
//                   <th>Created By</th>
//                   <th>Updated By</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentCompanies.length > 0 ? (
//                   currentCompanies.map((company, index) => (
//                     <tr key={company.company_id || index}>
//                       <td>{indexOfFirstEntry + index + 1}</td>
//                       <td>{company.company_id}</td>
//                       <td>{company.company_name}</td>
//                       <td>{company.cr_number}</td>
//                       <td>{company.vat_number}</td>
//                       <td>{company.service_email}</td>
//                       <td>{company.gm_email}</td>
//                       <td>{company.currency_code}</td>
//                       <td>{company.time_zone}</td>
//                       <td>
//                         <span
//                           className={`badge ${
//                             company.status === "Active"
//                               ? "bg-success"
//                               : company.status === "Inactive"
//                               ? "bg-warning text-dark"
//                               : "bg-danger"
//                           }`}
//                         >
//                           {company.status}
//                         </span>
//                       </td>
//                              <td>{formatDate(company.created_at)}</td>
//                       <td>{formatDate(company.updated_at)}</td>
//                       <td>{company.created_by}</td>
//                       <td>{company.updated_by}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="14" className="text-center">
//                       No companies found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Pagination */}
//         {!loading && !error && filteredCompanies.length > 0 && (
//           <div className="pagination-controls d-flex justify-content-center mt-3">
//             <button
//               className="btn btn-outline-primary me-2"
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage((prev) => prev - 1)}
//             >
//               Previous
//             </button>
//             <span className="align-self-center mx-2">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               className="btn btn-outline-primary ms-2"
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage((prev) => prev + 1)}
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CompanyTable;












// import React, { useState, useEffect } from "react";
// import "./CompanyInformation.css";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import axios from "axios";
// import { toast } from "react-toastify";

// const CompanyTable = ({ onAdd, onEdit }) => {
//   const [companies, setCompanies] = useState([]);
//   const [filteredCompanies, setFilteredCompanies] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [entriesPerPage, setEntriesPerPage] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchCompanies = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch("http://175.29.21.7:8006/companies/");
//       if (!response.ok) throw new Error("HTTP error");
//       const data = await response.json();
//       const sortedData = data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//       setCompanies(sortedData);
//       setFilteredCompanies(sortedData);
//     } catch {
//       setError("Failed to fetch companies. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   useEffect(() => {
//     const filtered = companies.filter((comp) =>
//       Object.values(comp).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredCompanies(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, companies]);

//   const handleDelete = async (company_id) => {
//     if (!window.confirm("Are you sure you want to delete this company?")) return;

//     try {
//       await axios.delete(`http://175.29.21.7:8006/companies/${company_id}/`);
//       toast.success("Company deleted successfully!");
//       fetchCompanies(); // Refresh table
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to delete company.");
//     }
//   };

//   const indexOfLastEntry = currentPage * entriesPerPage;
//   const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
//   const currentCompanies = filteredCompanies.slice(indexOfFirstEntry, indexOfLastEntry);
//   const totalPages = Math.ceil(filteredCompanies.length / entriesPerPage);

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return isNaN(date) ? "Invalid date" : `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
//   };

//   return (
//     <div className="container-fluid my-4">
//       <div className="company-table-box p-4">
//         <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
//           <div>
//             <h2 className="company-form-heading mb-0">Company List</h2>
//             <p className="text-muted mb-0">Manage company records</p>
//           </div>
//           <button className="btn btn-primary" onClick={onAdd}>Add Company</button>
//         </div>

//         <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
//           <div className="d-flex align-items-center gap-2">
//             Show
//             <select
//               value={entriesPerPage}
//               onChange={(e) => setEntriesPerPage(Number(e.target.value))}
//               className="form-select form-select-sm w-auto"
//             >
//               {[5, 10, 25].map(val => <option key={val} value={val}>{val}</option>)}
//             </select>
//             entries
//           </div>
//           <input
//             type="text"
//             placeholder="Search companies..."
//             className="form-control w-auto"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         {loading ? (
//           <div className="text-center my-3">
//             <div className="spinner-border text-primary"></div>
//             <p>Loading companies...</p>
//           </div>
//         ) : error ? (
//           <div className="alert alert-danger">{error}</div>
//         ) : (
//           <>
//             <div className="table-responsive mb-4">
//               <table className="table">
//                 <thead className="product-table-header">
//                   <tr>
//                     <th>S.No</th>
//                     <th>ID</th>
//                     <th>Company Name</th>
//                     <th>CR Number</th>
//                     <th>VAT Number</th>
//                     <th>Service Email</th>
//                     <th>GM Email</th>
//                     <th>Currency</th>
//                     <th>Time Zone</th>
//                     <th>Status</th>
//                     <th>Created At</th>
//                     <th>Updated At</th>
//                     <th>Created By</th>
//                     <th>Updated By</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentCompanies.length > 0 ? (
//                     currentCompanies.map((company, index) => (
//                       <tr key={company.company_id}>
//                         <td>{indexOfFirstEntry + index + 1}</td>
//                         <td>{company.company_id}</td>
//                         <td>{company.company_name}</td>
//                         <td>{company.cr_number}</td>
//                         <td>{company.vat_number}</td>
//                         <td>{company.service_email}</td>
//                         <td>{company.gm_email}</td>
//                         <td>{company.currency_code}</td>
//                         <td>{company.time_zone}</td>
//                         <td>
//                           <span className={`badge ${company.status === "Active" ? "bg-success"
//                               : company.status === "Inactive" ? "bg-warning text-dark"
//                                 : "bg-danger"
//                             }`}>
//                             {company.status}
//                           </span>
//                         </td>
//                         <td>{formatDate(company.created_at)}</td>
//                         <td>{formatDate(company.updated_at)}</td>
//                         <td>{company.created_by}</td>
//                         <td>{company.updated_by}</td>
//                         <td>
//                           <FaEdit
//                             title="Edit"
//                             onClick={() => onEdit(company)}
//                             className="company-action-icon edit"
//                           />
//                           <FaTrash
//                             title="Delete"
//                             onClick={() => handleDelete(company.company_id)}
//                             className="company-action-icon delete"
//                           />
//                         </td>

//                       </tr>
//                     ))
//                   ) : (
//                     <tr><td colSpan="15" className="text-center">No companies found.</td></tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             <div className="pagination-controls d-flex justify-content-center mt-3">
//               <button
//                 className="btn btn-outline-primary me-2"
//                 disabled={currentPage === 1}
//                 onClick={() => setCurrentPage(prev => prev - 1)}
//               >Previous</button>
//               <span className="align-self-center mx-2">Page {currentPage} of {totalPages}</span>
//               <button
//                 className="btn btn-outline-primary ms-2"
//                 disabled={currentPage === totalPages}
//                 onClick={() => setCurrentPage(prev => prev + 1)}
//               >Next</button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CompanyTable;



// import React, { useState, useEffect } from "react";
// import "./CompanyInformation.css";
// import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';
// import baseURL from "../ApiUrl/Apiurl";
// const CompanyTable = ({ onAdd, onEdit }) => {
//   const [companies, setCompanies] = useState([]);
//   const [filteredCompanies, setFilteredCompanies] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [entriesPerPage, setEntriesPerPage] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const fetchCompanies = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(`${baseURL}/companies/`);
//       if (!response.ok) throw new Error("HTTP error");
//       const data = await response.json();
//       const sortedData = data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//       setCompanies(sortedData);
//       setFilteredCompanies(sortedData);
//     } catch {
//       setError("Failed to fetch companies. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   useEffect(() => {
//     const filtered = companies.filter((comp) =>
//       Object.values(comp).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredCompanies(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, companies]);

// const handleDelete = async (company_id) => {
//   Swal.fire({
//     title: 'Are you sure?',
//     text: 'This company will be permanently deleted!',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#d33',
//     cancelButtonColor: '#3085d6',
//     confirmButtonText: 'Yes, delete it!'
//   }).then(async (result) => {
//     if (result.isConfirmed) {
//       try {
//         await axios.delete(`${baseURL}/companies/${company_id}/`);
//         Swal.fire({
//           icon: 'success',
//           title: 'Deleted!',
//           text: 'Company deleted successfully!',
//           confirmButtonColor: '#3085d6',
//         });
//         fetchCompanies();
//       } catch (error) {
//         console.error(error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Failed!',
//           text: 'Could not delete the company. Please try again.',
//           confirmButtonColor: '#d33',
//         });
//       }
//     }
//   });
// };


//   const indexOfLastEntry = currentPage * entriesPerPage;
//   const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
//   const currentCompanies = filteredCompanies.slice(indexOfFirstEntry, indexOfLastEntry);
//   const totalPages = Math.ceil(filteredCompanies.length / entriesPerPage);

//   return (
//     <div className="container-fluid my-4">
//       <div className="company-table-box p-4">
//         <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
//           <div>
//             <h2 className="company-form-heading mb-0">Company List</h2>
//             <p className="text-muted mb-0">Manage company records</p>
//           </div>
//           <button className="btn btn-primary" onClick={onAdd}>Add Company</button>
//         </div>

//         <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
//           <div className="d-flex align-items-center gap-2">
//             Show
//             <select
//               value={entriesPerPage}
//               onChange={(e) => setEntriesPerPage(Number(e.target.value))}
//               className="form-select form-select-sm w-auto"
//             >
//               {[5, 10, 25].map(val => <option key={val} value={val}>{val}</option>)}
//             </select>
//             entries
//           </div>
//           <input
//             type="text"
//             placeholder="Search companies..."
//             className="form-control w-auto"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         {loading ? (
//           <div className="text-center my-3">
//             <div className="spinner-border text-primary"></div>
//             <p>Loading companies...</p>
//           </div>
//         ) : error ? (
//           <div className="alert alert-danger">{error}</div>
//         ) : (
//           <>
//             <div className="table-responsive mb-4">
//               <table className="table">
//                 <thead className="product-table-header">
//                   <tr>
//                     <th>S.No</th>
//                     <th>ID</th>
//                     <th>Company Name</th>
//                     <th>CR Number</th>
//                     <th>VAT Number</th>
//                     <th>Service Email</th>
//                     <th>GM Email</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentCompanies.length > 0 ? (
//                     currentCompanies.map((company, index) => (
//                       <tr key={company.company_id}>
//                         <td>{indexOfFirstEntry + index + 1}</td>
//                         <td>{company.company_id}</td>
//                         <td>{company.company_name}</td>
//                         <td>{company.cr_number}</td>
//                         <td>{company.vat_number}</td>
//                         <td>{company.service_email}</td>
//                         <td>{company.gm_email}</td>
//                         <td>
//                           <span className={`badge ${company.status === "Active" ? "bg-success" :
//                             company.status === "Inactive" ? "bg-warning text-dark" : "bg-danger"}`}>
//                             {company.status}
//                           </span>
//                         </td>
//                        <td>
//   <div className="action-icons">
//     <FaEye
//       title="View"
//       onClick={() => navigate(`/companies/view/${company.company_id}`)}
//       className="action-icon view-icon"
//     />
//     <FaEdit
//       title="Edit"
//       onClick={() => onEdit(company)}
//       className="action-icon edit-icon"
//     />
//     <FaTrash
//       title="Delete"
//       onClick={() => handleDelete(company.company_id)}
//       className="action-icon delete-icon"
//     />
//   </div>
// </td>

//                       </tr>
//                     ))
//                   ) : (
//                     <tr><td colSpan="9" className="text-center">No companies found.</td></tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             <div className="pagination-controls d-flex justify-content-center mt-3">
//               <button
//                 className="btn btn-outline-primary me-2"
//                 disabled={currentPage === 1}
//                 onClick={() => setCurrentPage(prev => prev - 1)}
//               >Previous</button>
//               <span className="align-self-center mx-2">Page {currentPage} of {totalPages}</span>
//               <button
//                 className="btn btn-outline-primary ms-2"
//                 disabled={currentPage === totalPages}
//                 onClick={() => setCurrentPage(prev => prev + 1)}
//               >Next</button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CompanyTable;


//===============================================================
// After fixing filter -Global search issue 



import React, { useState, useEffect } from "react";
import "./CompanyInformation.css";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import baseURL from "../ApiUrl/Apiurl";

const CompanyTable = ({ onAdd, onEdit }) => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCompanies = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseURL}/companies/`);
      if (!response.ok) throw new Error("HTTP error");
      const data = await response.json();
      const sortedData = data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setCompanies(sortedData);
      setFilteredCompanies(sortedData);
    } catch {
      setError("Failed to fetch companies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

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
      setFilteredCompanies(companies);
      setCurrentPage(1);
      return;
    }

    const searchLower = searchTerm.toLowerCase().trim();
    
    const filtered = companies.filter((company) => {
      // Get dates in multiple formats for search
      const createdDateFormats = formatDateForSearch(company.created_at);
      const updatedDateFormats = formatDateForSearch(company.updated_at);
      
      // Create a comprehensive search string
      const searchableText = [
        // Raw company data
        company.company_id || '',
        company.company_name || '',
        company.cr_number || '',
        company.vat_number || '',
        company.service_email || '',
        company.gm_email || '',
        company.status || '',
        company.created_at || '',
        company.updated_at || '',
        company.created_by || '',
        company.updated_by || '',
        
        // Dates in multiple formats
        createdDateFormats,
        updatedDateFormats,
        
        // Status with badge text multiple times for better search
        company.status === 'Active' ? 'Active Active Active' : '',
        company.status === 'Inactive' ? 'Inactive Inactive Inactive' : '',
        company.status === 'Pending' ? 'Pending Pending Pending' : '',
        company.status === 'Suspended' ? 'Suspended Suspended Suspended' : '',
        
        // Email variations
        company.service_email ? company.service_email.split('@')[0] : '',
        company.gm_email ? company.gm_email.split('@')[0] : '',
        
        // Company name variations (for partial matching)
        company.company_name ? company.company_name.toLowerCase().split(' ').join(' ') : '',
        company.company_name ? company.company_name.toLowerCase().replace(/\s+/g, '') : '',
        
        // Add any other properties that might exist
        ...Object.values(company).filter(val => 
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
    
    setFilteredCompanies(filtered);
    setCurrentPage(1);
  }, [searchTerm, companies]);

  const handleDelete = async (company_id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This company will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${baseURL}/companies/${company_id}/`);
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Company deleted successfully!',
            confirmButtonColor: '#3085d6',
          });
          fetchCompanies();
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Failed!',
            text: 'Could not delete the company. Please try again.',
            confirmButtonColor: '#d33',
          });
        }
      }
    });
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredCompanies.length / entriesPerPage);

  return (
    <div className="container-fluid my-4">
      <div className="company-table-box p-4">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
          <div>
            <h2 className="company-form-heading mb-0">Company List</h2>
            <p className="text-muted mb-0">Manage company records</p>
          </div>
          <button className="btn btn-primary" onClick={onAdd}>Add Company</button>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div className="d-flex align-items-center gap-2">
            Show
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="form-select form-select-sm w-auto"
            >
              {[5, 10, 25].map(val => <option key={val} value={val}>{val}</option>)}
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
            <strong>Search Results:</strong> Found {filteredCompanies.length} company(s) matching "{searchTerm}"
          </div>
        )}

        {loading ? (
          <div className="text-center my-3">
            <div className="spinner-border text-primary"></div>
            <p>Loading companies...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <>
            <div className="table-responsive mb-4">
              <table className="table">
                <thead className="product-table-header">
                  <tr>
                    <th>S.No</th>
                    <th>ID</th>
                    <th>Company Name</th>
                    <th>CR Number</th>
                    <th>VAT Number</th>
                    <th>Service Email</th>
                    <th>GM Email</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCompanies.length > 0 ? (
                    currentCompanies.map((company, index) => (
                      <tr key={company.company_id}>
                        <td>{indexOfFirstEntry + index + 1}</td>
                        <td>{company.company_id}</td>
                        <td>{company.company_name}</td>
                        <td>{company.cr_number}</td>
                        <td>{company.vat_number}</td>
                        <td>{company.service_email}</td>
                        <td>{company.gm_email}</td>
                        <td>
                          <span className={`badge ${company.status === "Active" ? "bg-success" :
                            company.status === "Inactive" ? "bg-warning text-dark" : "bg-danger"}`}>
                            {company.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-icons">
                            <FaEye
                              title="View"
                              onClick={() => navigate(`/companies/view/${company.company_id}`)}
                              className="action-icon view-icon"
                            />
                            <FaEdit
                              title="Edit"
                              onClick={() => onEdit(company)}
                              className="action-icon edit-icon"
                            />
                            <FaTrash
                              title="Delete"
                              onClick={() => handleDelete(company.company_id)}
                              className="action-icon delete-icon"
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center">
                        {searchTerm ? `No companies found matching "${searchTerm}"` : 'No companies found.'}
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
                  onClick={() => setCurrentPage(prev => prev - 1)}
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
                  onClick={() => setCurrentPage(prev => prev + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CompanyTable;
