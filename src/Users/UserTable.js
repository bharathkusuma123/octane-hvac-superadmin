// import React, { useEffect, useState } from "react";
// import "./UserManagement.css";

// const UserTable = ({ onAdd }) => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [entriesPerPage, setEntriesPerPage] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     fetch("http://175.29.21.7:8006/users/")
//       .then((response) => {
//         if (!response.ok) throw new Error("Failed to fetch users");
//         return response.json();
//       })
//       .then((data) => {
//         const sortedData = data.sort(
//           (a, b) => new Date(b.created_at) - new Date(a.created_at)
//         );
//         setUsers(sortedData);
//         setFilteredUsers(sortedData);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//       });
//   }, []);

//   useEffect(() => {
//     const filtered = users.filter((user) =>
//       Object.values(user)
//         .join(" ")
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//     );
//     setFilteredUsers(filtered);
//     setCurrentPage(1); // reset to page 1 on new search
//   }, [searchTerm, users]);

//   const indexOfLastEntry = currentPage * entriesPerPage;
//   const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirstEntry, indexOfLastEntry);
//   const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);

//   return (
//     <div className="container my-4">
//       <div className="user-management-box p-4">
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h2 className="user-management-title">User List</h2>
//           <button className="btn btn-primary" onClick={onAdd}>Add User</button>
//         </div>

//         <div className="table-controls d-flex justify-content-between align-items-center mb-3 flex-wrap">
//           <div className="entries-selector d-flex align-items-center gap-2">
//             Show
//             <select
//               value={entriesPerPage}
//               onChange={(e) => setEntriesPerPage(Number(e.target.value))}
//               className="form-select form-select-sm w-auto"
//             >
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={20}>20</option>
//             </select>
//             entries
//           </div>

//           <input
//             type="text"
//             placeholder="Search users..."
//             className="form-control search-input w-auto"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <div className="table-responsive">
//           <table className="table table-bordered table-hover">
//             <thead className="table-light">
//               <tr>
//                 <th>S.No</th>
//                 <th>User ID</th>
//                 <th>Username</th>
//                 <th>Full Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Telephone</th>
//                 <th>City</th>
//                 <th>Country Code</th>
//                 <th>Status</th>
//                 <th>Remarks</th>
//                 <th>Role</th>
//                 <th>Hourly Rate</th>
//                 <th>Address</th>
//                 <th>Created At</th>
//                 <th>Updated At</th>
//                 <th>Created By</th>
//                 <th>Updated By</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentUsers.map((user, idx) => (
//                 <tr key={idx}>
//                   <td>{indexOfFirstEntry + idx + 1}</td> {/* S.No */}
//                   <td>{user.user_id}</td>
//                   <td>{user.username}</td>
//                   <td>{user.full_name}</td>
//                   <td>{user.email}</td>
//                   <td>{user.mobile_no}</td>
//                   <td>{user.telephone}</td>
//                   <td>{user.city}</td>
//                   <td>{user.country_code}</td>
//                   <td>{user.status}</td>
//                   <td>{user.remarks}</td>
//                   <td>{user.role}</td>
//                   <td>{user.hourly_rate}</td>
//                   <td>{user.address}</td>
//                   <td>{user.created_at}</td>
//                   <td>{user.updated_at}</td>
//                   <td>{user.created_by}</td>
//                   <td>{user.updated_by}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {filteredUsers.length === 0 && (
//             <div className="text-center p-3">No users found.</div>
//           )}
//         </div>

//         {/* Pagination Controls */}
//         <div className="pagination-controls d-flex justify-content-center mt-3">
//           <button
//             className="btn btn-outline-primary me-2"
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((prev) => prev - 1)}
//           >
//             Previous
//           </button>
//           <span className="align-self-center mx-2">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             className="btn btn-outline-primary ms-2"
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage((prev) => prev + 1)}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserTable;




// import React, { useEffect, useState } from "react";
// import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// import "./UserManagement.css";
// import { useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';

// const UserTable = ({ onAdd, onEdit }) => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [entriesPerPage, setEntriesPerPage] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = () => {
//     fetch("http://175.29.21.7:8006/users/")
//       .then((response) => {
//         if (!response.ok) throw new Error("Failed to fetch users");
//         return response.json();
//       })
//       .then((data) => {
//         const sortedData = data.sort(
//           (a, b) => new Date(b.created_at) - new Date(a.created_at)
//         );
//         setUsers(sortedData);
//         setFilteredUsers(sortedData);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//       });
//   };

//   useEffect(() => {
//     const filtered = users.filter((user) =>
//       Object.values(user)
//         .join(" ")
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//     );
//     setFilteredUsers(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, users]);

//   const handleDelete = (userId) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'This user will be permanently deleted!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const response = await fetch(`http://175.29.21.7:8006/users/${userId}/`, {
//             method: "DELETE",
//           });
//           if (!response.ok) throw new Error("Failed to delete user");
//           Swal.fire({
//             icon: 'success',
//             title: 'Deleted!',
//             text: 'User deleted successfully.',
//             confirmButtonColor: '#3085d6'
//           });
//           fetchUsers();
//         } catch (error) {
//           console.error("Error deleting user:", error);
//           Swal.fire({
//             icon: 'error',
//             title: 'Error!',
//             text: 'Failed to delete user. Please try again.',
//             confirmButtonColor: '#d33'
//           });
//         }
//       }
//     });
//   };

//  const handleEdit = (user) => {
//   if (onEdit) onEdit(user);
// };

//   const handleView = (user) => {
//   navigate(`/users/view/${user.user_id}`, { state: { user } });
// };

//   const indexOfLastEntry = currentPage * entriesPerPage;
//   const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirstEntry, indexOfLastEntry);
//   const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);

//   const formatDate = (dateString) => {
//     if (!dateString) return '-';
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
//     <div className="container-fluid user-management-container">
//       <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
//         <div>
//           <h2 className="user-management-title mb-0">User Management</h2>
//           <p className="user-management-subtitle mb-0 text-muted">Manage user records</p>
//         </div>
//         <button className="btn btn-primary" onClick={onAdd}>Add New User</button>
//       </div>

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
//           placeholder="Search users..."
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
//               <th>User ID</th>
//               <th>Username</th>
//               <th>Full Name</th>
//               <th>Email</th>
//               <th>Mobile</th>
//               <th>Telephone</th>
//               <th>City</th>
//               <th>Country Code</th>
//               <th>Status</th>
//               <th>Remarks</th>
//               <th>Role</th>
//               <th>Address</th>
//               <th>Default Company</th>
//               <th>Accesible Companies</th>
//               <th>Created By</th>
//               <th>Updated By</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentUsers.length > 0 ? (
//               currentUsers.map((user, idx) => (
//                 <tr key={idx}>
//                   <td>{indexOfFirstEntry + idx + 1}</td>
//                   <td>{user.user_id}</td>
//                   <td>{user.username}</td>
//                   <td>{user.full_name}</td>
//                   <td>{user.email}</td>
//                   <td>{user.mobile}</td>
//                   <td>{user.telephone}</td>
//                   <td>{user.city}</td>
//                   <td>{user.country_code}</td>
//                   <td>
//                     <span className={`badge ${
//                       user.status === 'Active' ? 'bg-success' :
//                       user.status === 'Inactive' ? 'bg-warning text-dark' :
//                       'bg-danger'
//                     }`}>
//                       {user.status}
//                     </span>
//                   </td>
//                   <td>{user.remarks}</td>
//                   <td>{user.role}</td>
//                   <td>{user.address}</td>
//                   <td>{user.default_company}</td>
//                   <td>{user.companies && user.companies.join(', ')}</td>
//                   <td>{user.created_by}</td>
//                   <td>{user.updated_by}</td>
//                   <td>
//                     <div className="action-icons">
//                  <FaEye
//   title="View"
//   onClick={() => handleView(user)}
//   className="action-icon view-icon"
// />
//                       <FaEdit
//                         title="Edit"
//                         onClick={() => handleEdit(user)}
//                         className="action-icon edit-icon"
//                       />
//                       <FaTrash
//                         title="Delete"
//                         onClick={() => handleDelete(user.user_id)}
//                         className="action-icon delete-icon"
//                       />
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="19" className="text-center">No users found.</td>
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
// };

// export default UserTable;






//==================================================================================


// import React, { useEffect, useState } from "react";
// import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// import "./UserManagement.css";
// import { useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';
// import baseURL from "../ApiUrl/Apiurl";

// const UserTable = ({ onAdd, onEdit }) => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [entriesPerPage, setEntriesPerPage] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = () => {
//     fetch(`${baseURL}/users/`)
//       .then((response) => {
//         if (!response.ok) throw new Error("Failed to fetch users");
//         return response.json();
//       })
//       .then((data) => {
//         const sortedData = data.sort(
//           (a, b) => new Date(b.created_at) - new Date(a.created_at)
//         );
//         setUsers(sortedData);
//         setFilteredUsers(sortedData);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//       });
//   };

//   useEffect(() => {
//     const filtered = users.filter((user) =>
//       Object.values(user)
//         .join(" ")
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//     );
//     setFilteredUsers(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, users]);

//   const handleDelete = (userId) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'This user will be permanently deleted!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const response = await fetch(`${baseURL}/users/${userId}/`, {
//             method: "DELETE",
//           });
//           if (!response.ok) throw new Error("Failed to delete user");
//           Swal.fire({
//             icon: 'success',
//             title: 'Deleted!',
//             text: 'User deleted successfully.',
//             confirmButtonColor: '#3085d6'
//           });
//           fetchUsers();
//         } catch (error) {
//           console.error("Error deleting user:", error);
//           Swal.fire({
//             icon: 'error',
//             title: 'Error!',
//             text: 'Failed to delete user. Please try again.',
//             confirmButtonColor: '#d33'
//           });
//         }
//       }
//     });
//   };

//   const handleEdit = (user) => {
//     if (onEdit) onEdit(user);
//   };

//   const handleView = (user) => {
//     navigate(`/users/view/${user.user_id}`, { state: { user } });
//   };

//   const indexOfLastEntry = currentPage * entriesPerPage;
//   const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirstEntry, indexOfLastEntry);
//   const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);

//   const formatDate = (dateString) => {
//     if (!dateString) return '-';
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
//     <div className="container-fluid user-management-container">
//       <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
//         <div>
//           <h2 className="user-management-title mb-0">User Management</h2>
//           <p className="user-management-subtitle mb-0 text-muted">Manage user records</p>
//         </div>
//         <button className="btn btn-primary" onClick={onAdd}>Add New User</button>
//       </div>

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
//           placeholder="Search users..."
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
//               <th>User ID</th>
//               <th>Username</th>
//               <th>Email</th>
//               <th>Mobile</th>
//               <th>Role</th>
//               <th>Default Company</th>
//               <th>Accessible Companies</th>
//                             <th>Status</th>

//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentUsers.length > 0 ? (
//               currentUsers.map((user, idx) => (
//                 <tr key={idx}>
//                   <td>{indexOfFirstEntry + idx + 1}</td>
//                   <td>{user.user_id}</td>
//                   <td>{user.username}</td>
//                   <td>{user.email}</td>
//                   <td>{user.mobile}</td>
                 
//                   <td>{user.role}</td>
//                   <td>{user.default_company}</td>
//                   <td>{user.companies && user.companies.join(', ')}</td>
//                    <td>
//                     <span className={`badge ${
//                       user.status === 'Active' ? 'bg-success' :
//                       user.status === 'Inactive' ? 'bg-warning text-dark' :
//                       'bg-danger'
//                     }`}>
//                       {user.status}
//                     </span>
//                   </td>
//                   <td>
//                     <div className="action-icons">
//                       <FaEye
//                         title="View"
//                         onClick={() => handleView(user)}
//                         className="action-icon view-icon"
//                       />
//                       <FaEdit
//                         title="Edit"
//                         onClick={() => handleEdit(user)}
//                         className="action-icon edit-icon"
//                       />
//                       <FaTrash
//                         title="Delete"
//                         onClick={() => handleDelete(user.user_id)}
//                         className="action-icon delete-icon"
//                       />
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="10" className="text-center">No users found.</td>
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
// };

// export default UserTable;

//===============================================================
// After fixing filter -Global search issue 


// import React, { useEffect, useState } from "react";
// import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// import "./UserManagement.css";
// import { useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';
// import baseURL from "../ApiUrl/Apiurl";

// const UserTable = ({ onAdd, onEdit }) => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [entriesPerPage, setEntriesPerPage] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [companiesData, setCompaniesData] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   // Fetch companies data
//   const fetchCompanies = async () => {
//     try {
//       const response = await fetch(`${baseURL}/companies/`);
//       const data = await response.json();
//       if (data.status === "success") {
//         setCompaniesData(data.data);
//         // Once companies are loaded, fetch users
//         fetchUsers();
//       }
//     } catch (error) {
//       console.error("Failed to load companies data", error);
//       // Even if companies fail, still fetch users
//       fetchUsers();
//     }
//   };

//   // Function to get company name
//   const getCompanyName = (companyId) => {
//     if (!companiesData || companiesData.length === 0) return companyId;
    
//     const company = companiesData.find(comp => comp.company_id === companyId);
//     return company ? company.company_name : companyId;
//   };

//   // Function to get company names for multiple companies
//   const getCompanyNames = (companyIds) => {
//     if (!Array.isArray(companyIds) || companyIds.length === 0) return "None";
    
//     return companyIds.map(companyId => getCompanyName(companyId)).join(', ');
//   };

//   const fetchUsers = () => {
//     fetch(`${baseURL}/users/`)
//       .then((response) => {
//         if (!response.ok) throw new Error("Failed to fetch users");
//         return response.json();
//       })
//       .then((data) => {
//         const sortedData = data.sort(
//           (a, b) => new Date(b.created_at) - new Date(a.created_at)
//         );
//         setUsers(sortedData);
//         setFilteredUsers(sortedData);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//       });
//   };

//   useEffect(() => {
//     const filtered = users.filter((user) =>
//       Object.values(user)
//         .join(" ")
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//     );
//     setFilteredUsers(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, users]);

//   const handleDelete = (userId) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'This user will be permanently deleted!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const response = await fetch(`${baseURL}/users/${userId}/`, {
//             method: "DELETE",
//           });
//           if (!response.ok) throw new Error("Failed to delete user");
//           Swal.fire({
//             icon: 'success',
//             title: 'Deleted!',
//             text: 'User deleted successfully.',
//             confirmButtonColor: '#3085d6'
//           });
//           fetchUsers();
//         } catch (error) {
//           console.error("Error deleting user:", error);
//           Swal.fire({
//             icon: 'error',
//             title: 'Error!',
//             text: 'Failed to delete user. Please try again.',
//             confirmButtonColor: '#d33'
//           });
//         }
//       }
//     });
//   };

//   const handleEdit = (user) => {
//     if (onEdit) onEdit(user);
//   };

//   const handleView = (user) => {
//     navigate(`/users/view/${user.user_id}`, { state: { user } });
//   };

//   const indexOfLastEntry = currentPage * entriesPerPage;
//   const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirstEntry, indexOfLastEntry);
//   const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);

//   const formatDate = (dateString) => {
//     if (!dateString) return '-';
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
//     <div className="container-fluid user-management-container">
//       <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
//         <div>
//           <h2 className="user-management-title mb-0">User Management</h2>
//           <p className="user-management-subtitle mb-0 text-muted">Manage user records</p>
//         </div>
//         <button className="btn btn-primary" onClick={onAdd}>Add New User</button>
//       </div>

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
//           placeholder="Search users..."
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
//               <th>User ID</th>
//               <th>Username</th>
//               <th>Email</th>
//               <th>Mobile</th>
//               <th>Role</th>
//               <th>Default Company</th>
//               <th>Accessible Companies</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentUsers.length > 0 ? (
//               currentUsers.map((user, idx) => (
//                 <tr key={idx}>
//                   <td>{indexOfFirstEntry + idx + 1}</td>
//                   <td>{user.user_id}</td>
//                   <td>{user.username}</td>
//                   <td>{user.email}</td>
//                   <td>{user.mobile}</td>
//                   <td>{user.role}</td>
//                   <td title={user.default_company}>
//                     {getCompanyName(user.default_company)}
//                   </td>
//                   <td title={user.companies && user.companies.join(', ')}>
//                     {getCompanyNames(user.companies)}
//                   </td>
//                   <td>
//                     <span className={`badge ${
//                       user.status === 'Active' ? 'bg-success' :
//                       user.status === 'Inactive' ? 'bg-warning text-dark' :
//                       'bg-danger'
//                     }`}>
//                       {user.status}
//                     </span>
//                   </td>
//                   <td>
//                     <div className="action-icons">
//                       <FaEye
//                         title="View"
//                         onClick={() => handleView(user)}
//                         className="action-icon view-icon"
//                       />
//                       <FaEdit
//                         title="Edit"
//                         onClick={() => handleEdit(user)}
//                         className="action-icon edit-icon"
//                       />
//                       <FaTrash
//                         title="Delete"
//                         onClick={() => handleDelete(user.user_id)}
//                         className="action-icon delete-icon"
//                       />
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="10" className="text-center">No users found.</td>
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
// };

// export default UserTable;




//===============================================================
// After fixing filter -Global search issue 



import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "./UserManagement.css";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import baseURL from "../ApiUrl/Apiurl";

const UserTable = ({ onAdd, onEdit }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [companiesData, setCompaniesData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Fetch companies data
  const fetchCompanies = async () => {
    try {
      const response = await fetch(`${baseURL}/companies/`);
      const data = await response.json();
      if (data.status === "success") {
        setCompaniesData(data.data);
        fetchUsers();
      }
    } catch (error) {
      console.error("Failed to load companies data", error);
      fetchUsers();
    }
  };

  // Function to get company name
  const getCompanyName = (companyId) => {
    if (!companiesData || companiesData.length === 0) return companyId;
    
    const company = companiesData.find(comp => comp.company_id === companyId);
    return company ? company.company_name : companyId;
  };

  // Function to get company ID and name for search
  const getCompanySearchData = (companyId) => {
    if (!companyId) return '';
    if (!companiesData || companiesData.length === 0) return companyId;
    
    const company = companiesData.find(comp => comp.company_id === companyId);
    return company ? `${company.company_id} ${company.company_name}` : companyId;
  };

  // Function to get company names for multiple companies (for display)
  const getCompanyNames = (companyIds) => {
    if (!Array.isArray(companyIds) || companyIds.length === 0) return "None";
    
    return companyIds.map(companyId => getCompanyName(companyId)).join(', ');
  };

  // Function to get company search data for multiple companies
  const getCompaniesSearchData = (companyIds) => {
    if (!Array.isArray(companyIds) || companyIds.length === 0) return '';
    
    const companyData = companyIds.map(companyId => {
      if (!companiesData || companiesData.length === 0) return companyId;
      
      const company = companiesData.find(comp => comp.company_id === companyId);
      return company ? `${company.company_id} ${company.company_name}` : companyId;
    });
    
    return companyData.join(' ');
  };

  const fetchUsers = () => {
    fetch(`${baseURL}/users/`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch users");
        return response.json();
      })
      .then((data) => {
        const sortedData = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setUsers(sortedData);
        setFilteredUsers(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  // Function to format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid date';

      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    } catch (e) {
      return 'Invalid date';
    }
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
      setFilteredUsers(users);
      setCurrentPage(1);
      return;
    }

    const searchLower = searchTerm.toLowerCase().trim();
    
    const filtered = users.filter((user) => {
      // Get company data for search
      const defaultCompanySearch = getCompanySearchData(user.default_company);
      const accessibleCompaniesSearch = getCompaniesSearchData(user.companies);
      
      // Get dates in multiple formats for search
      const createdDateFormats = formatDateForSearch(user.created_at);
      const updatedDateFormats = formatDateForSearch(user.updated_at);
      
      // Create a comprehensive search string
      const searchableText = [
        // Raw user data
        user.user_id || '',
        user.username || '',
        user.email || '',
        user.mobile || '',
        user.role || '',
        user.status || '',
        user.default_company || '',
        user.companies ? user.companies.join(' ') : '',
        user.created_at || '',
        user.updated_at || '',
        user.full_name || '',
        user.telephone || '',
        user.city || '',
        user.country_code || '',
        user.address || '',
        user.postal_code || '',
        
        // Formatted company data for search
        defaultCompanySearch,
        accessibleCompaniesSearch,
        
        // Dates in multiple formats
        createdDateFormats,
        updatedDateFormats,
        
        // Display values (exactly as shown in table)
        formatDate(user.created_at),
        formatDate(user.updated_at),
        getCompanyName(user.default_company),
        getCompanyNames(user.companies),
        
        // Status with badge text multiple times for better search
        user.status === 'Active' ? 'Active Active Active' : '',
        user.status === 'Inactive' ? 'Inactive Inactive Inactive' : '',
        user.status === 'Pending' ? 'Pending Pending Pending' : '',
        user.status === 'Suspended' ? 'Suspended Suspended Suspended' : '',
        
        // Role variations for better search
        user.role === 'Service Manager' ? 'Service Manager Manager ServiceManager' : '',
        user.role === 'Service Engineer' ? 'Service Engineer Engineer ServiceEngineer' : '',
        user.role === 'Customer' ? 'Customer Customer' : '',
        user.role === 'Admin' ? 'Admin Admin Administrator' : '',
        user.role === 'Super Admin' ? 'Super Admin SuperAdmin Admin' : '',
        
        // Email variations (username part)
        user.email ? user.email.split('@')[0] : '',
        
        // Mobile number variations (without country code if present)
        user.mobile ? user.mobile.replace(/[+\s-]/g, '') : '',
        user.mobile ? user.mobile.replace(/\D/g, '') : '',
        
        // Add any other properties that might exist
        ...Object.values(user).filter(val => 
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
    
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, users, companiesData]);

  const handleDelete = (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This user will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${baseURL}/users/${userId}/`, {
            method: "DELETE",
          });
          if (!response.ok) throw new Error("Failed to delete user");
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'User deleted successfully.',
            confirmButtonColor: '#3085d6'
          });
          fetchUsers();
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to delete user. Please try again.',
            confirmButtonColor: '#d33'
          });
        }
      }
    });
  };

  const handleEdit = (user) => {
    if (onEdit) onEdit(user);
  };

  const handleView = (user) => {
    navigate(`/users/view/${user.user_id}`, { state: { user } });
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);

  return (
    <div className="container-fluid user-management-container">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <div>
          <h2 className="user-management-title mb-0">User Management</h2>
          <p className="user-management-subtitle mb-0 text-muted">Manage user records</p>
        </div>
        <button className="btn btn-primary" onClick={onAdd}>Add New User</button>
      </div>

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
          <strong>Search Results:</strong> Found {filteredUsers.length} user(s) matching "{searchTerm}"
        </div>
      )}

      <div className="table-responsive mb-4">
        <table className="table">
          <thead className="product-table-header">
            <tr>
              <th>S.No</th>
              <th>User ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Role</th>
              <th>Default Company</th>
              <th>Accessible Companies</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user, idx) => (
                <tr key={idx}>
                  <td>{indexOfFirstEntry + idx + 1}</td>
                  <td>{user.user_id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.role}</td>
                  <td title={user.default_company}>
                    {getCompanyName(user.default_company)}
                  </td>
                  <td title={user.companies && user.companies.join(', ')}>
                    {getCompanyNames(user.companies)}
                  </td>
                  <td>
                    <span className={`badge ${
                      user.status === 'Active' ? 'bg-success' :
                      user.status === 'Inactive' ? 'bg-warning text-dark' :
                      'bg-danger'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-icons">
                      <FaEye
                        title="View"
                        onClick={() => handleView(user)}
                        className="action-icon view-icon"
                      />
                      <FaEdit
                        title="Edit"
                        onClick={() => handleEdit(user)}
                        className="action-icon edit-icon"
                      />
                      <FaTrash
                        title="Delete"
                        onClick={() => handleDelete(user.user_id)}
                        className="action-icon delete-icon"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  {searchTerm ? `No users found matching "${searchTerm}"` : 'No users found.'}
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
};

export default UserTable;