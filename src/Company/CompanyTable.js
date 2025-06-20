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












import React, { useState, useEffect } from "react";
import "./CompanyInformation.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const CompanyTable = ({ onAdd, onEdit }) => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCompanies = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://175.29.21.7:8006/companies/");
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

  useEffect(() => {
    const filtered = companies.filter((comp) =>
      Object.values(comp).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCompanies(filtered);
    setCurrentPage(1);
  }, [searchTerm, companies]);

  const handleDelete = async (company_id) => {
    if (!window.confirm("Are you sure you want to delete this company?")) return;

    try {
      await axios.delete(`http://175.29.21.7:8006/companies/${company_id}/`);
      toast.success("Company deleted successfully!");
      fetchCompanies(); // Refresh table
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete company.");
    }
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredCompanies.length / entriesPerPage);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid date" : `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
  };

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
          <input
            type="text"
            placeholder="Search companies..."
            className="form-control w-auto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

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
                    <th>Currency</th>
                    <th>Time Zone</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Created By</th>
                    <th>Updated By</th>
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
                        <td>{company.currency_code}</td>
                        <td>{company.time_zone}</td>
                        <td>
                          <span className={`badge ${
                            company.status === "Active" ? "bg-success"
                            : company.status === "Inactive" ? "bg-warning text-dark"
                            : "bg-danger"
                          }`}>
                            {company.status}
                          </span>
                        </td>
                        <td>{formatDate(company.created_at)}</td>
                        <td>{formatDate(company.updated_at)}</td>
                        <td>{company.created_by}</td>
                        <td>{company.updated_by}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => onEdit(company)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(company.company_id)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="15" className="text-center">No companies found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="pagination-controls d-flex justify-content-center mt-3">
              <button
                className="btn btn-outline-primary me-2"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >Previous</button>
              <span className="align-self-center mx-2">Page {currentPage} of {totalPages}</span>
              <button
                className="btn btn-outline-primary ms-2"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >Next</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CompanyTable;
