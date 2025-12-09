// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const QuestionsView = () => {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate(); // Hook to navigate

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const res = await axios.get('http://175.29.21.7:8006/survey-questions/');
//         if (res.data.status === "success") {
//           const sortedQuestions = res.data.data.sort(
//             (a, b) => new Date(b.created_at) - new Date(a.created_at)
//           );
//           setQuestions(sortedQuestions);
//         }
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuestions();
//   }, []);

//   const formatDate = (isoString) => {
//     const date = new Date(isoString);
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2>Survey Questions</h2>
//         <button
//           className="btn btn-primary"
//           onClick={() => navigate('/superadmin/survey-questions')}
//         >
//           Add Survey Questions
//         </button>
//       </div>

//       {loading ? (
//         <p>Loading questions...</p>
//       ) : (
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//                 <th>S.No</th>
//               <th>Question ID</th>
//               <th>Question Text</th>
//               <th>Rating Type</th>
//               <th>Created By</th>
//               <th>Updated By</th>
//               <th>Created At</th>
//               {/* <th>Updated At</th> */}
//             </tr>
//           </thead>
//           <tbody>
//             {questions.map((q,index) => (
//               <tr key={q.question_id}>
//                 <td>{index+1}</td>
//                 <td>{q.question_id}</td>
//                 <td>{q.question_text}</td>
//                 <td>{q.rating_type}</td>
//                 <td>{q.created_by}</td>
//                 <td>{q.updated_by}</td>
//                 <td>{formatDate(q.created_at)}</td>
//                 {/* <td>{formatDate(q.updated_at)}</td> */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default QuestionsView;

//===============================================================
// After fixing filter -Global search issue 



// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Questions.css';
// import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
// import Swal from 'sweetalert2';
// import baseURL from '../ApiUrl/Apiurl';

// const QuestionsView = () => {
//   const [questions, setQuestions] = useState([]);
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [users, setUsers] = useState([]); // New state for users
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [entriesPerPage, setEntriesPerPage] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch both questions and users
//         const [questionsRes, usersRes] = await Promise.all([
//           axios.get(`${baseURL}/survey-questions/`),
//           axios.get(`${baseURL}/users/`)
//         ]);

//         if (questionsRes.data.status === "success") {
//           const sorted = questionsRes.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//           setQuestions(sorted);
//           setFilteredQuestions(sorted);
//         }

//         if (usersRes.data) {
//           setUsers(usersRes.data);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Function to get username by user ID
//   const getUsernameById = (userId) => {
//     if (!userId) return 'N/A';
//     const user = users.find(u => u.user_id === userId);
//     return user ? user.username : userId; // Return username if found, otherwise return the original ID
//   };

//   useEffect(() => {
//     const filtered = questions.filter(q =>
//       Object.values(q).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredQuestions(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, questions]);

//   const formatDate = (isoString) => {
//     const date = new Date(isoString);
//     return `${date.getDate().toString().padStart(2, '0')}/${
//       (date.getMonth() + 1).toString().padStart(2, '0')
//     }/${date.getFullYear()}`;
//   };

//   const indexOfLastEntry = currentPage * entriesPerPage;
//   const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
//   const currentQuestions = filteredQuestions.slice(indexOfFirstEntry, indexOfLastEntry);
//   const totalPages = Math.ceil(filteredQuestions.length / entriesPerPage);

//   const handleEdit = (question) => {
//     navigate("/superadmin/survey-questions", { state: { question } });
//   };

//   const handleDelete = async (questionId) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'This question will be permanently deleted!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(`${baseURL}/survey-questions/${questionId}/`);
//           const updatedQuestions = questions.filter(q => q.question_id !== questionId);
//           setQuestions(updatedQuestions);
//           setFilteredQuestions(updatedQuestions);

//           Swal.fire({
//             icon: 'success',
//             title: 'Deleted!',
//             text: 'Survey question deleted successfully.',
//             confirmButtonColor: '#3085d6'
//           });
//         } catch (error) {
//           console.error("Delete error:", error);
//           Swal.fire({
//             icon: 'error',
//             title: 'Error!',
//             text: 'Failed to delete the question. Please try again.',
//             confirmButtonColor: '#d33'
//           });
//         }
//       }
//     });
//   };

//   return (
//     <div className="container-fluid my-4">
//       <div className="company-table-box p-4">
//         <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
//           <div>
//             <h2 className="company-form-heading mb-0">Survey Questions</h2>
//             <p className="text-muted mb-0">Manage all your survey questions</p>
//           </div>
//           <button
//             className="btn btn-primary"
//             onClick={() => navigate('/superadmin/survey-questions')}
//           >
//             Add Survey Questions
//           </button>
//         </div>

//         <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
//           <div className="d-flex align-items-center gap-2">
//             Show
//             <select
//               value={entriesPerPage}
//               onChange={(e) => setEntriesPerPage(Number(e.target.value))}
//               className="form-select form-select-sm w-auto"
//             >
//               {[5, 10, 25].map((val) => (
//                 <option key={val} value={val}>{val}</option>
//               ))}
//             </select>
//             entries
//           </div>

//           <input
//             type="text"
//             placeholder="Search questions..."
//             className="form-control w-auto"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         {loading ? (
//           <div className="text-center my-3">
//             <div className="spinner-border text-primary"></div>
//             <p>Loading questions...</p>
//           </div>
//         ) : (
//           <>
//             <div className="table-responsive mb-4">
//               <table className="table ">
//                 <thead className="product-table-header">
//                   <tr>
//                     <th>S.No</th>
//                     <th>Question ID</th>
//                     <th>Question Text</th>
//                     <th>Rating Type</th>
//                     <th>Created By</th>
//                     <th>Updated By</th>
//                     <th>Created At</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentQuestions.length > 0 ? (
//                     currentQuestions.map((q, index) => (
//                       <tr key={q.question_id}>
//                         <td>{indexOfFirstEntry + index + 1}</td>
//                         <td>{q.question_id}</td>
//                         <td>{q.question_text}</td>
//                         <td>{q.rating_type}</td>
//                         <td>{getUsernameById(q.created_by)}</td>
//                         <td>{getUsernameById(q.updated_by)}</td>
//                         <td>{formatDate(q.created_at)}</td>
//                         <td>
//                           <div className="action-icons d-flex gap-2">
//                             <FaEdit
//                               title="Edit"
//                               className="action-icon edit-icon"
//                               style={{ cursor: 'pointer' }}
//                               onClick={() => handleEdit(q)}
//                             />
//                             <FaTrash
//                               title="Delete"
//                               className="action-icon delete-icon"
//                               style={{ cursor: 'pointer' }}
//                               onClick={() => handleDelete(q.question_id)}
//                             />
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="8" className="text-center">No questions found.</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             <div className="pagination-controls d-flex justify-content-center mt-3">
//               <button
//                 className="btn btn-outline-primary me-2"
//                 disabled={currentPage === 1}
//                 onClick={() => setCurrentPage(prev => prev - 1)}
//               >
//                 Previous
//               </button>

//               <span className="align-self-center mx-2">
//                 Page {currentPage} of {totalPages}
//               </span>

//               <button
//                 className="btn btn-outline-primary ms-2"
//                 disabled={currentPage === totalPages}
//                 onClick={() => setCurrentPage(prev => prev + 1)}
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QuestionsView;


//===============================================================
// After fixing filter -Global search issue 



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Questions.css';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import baseURL from '../ApiUrl/Apiurl';

const QuestionsView = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [questionsRes, usersRes] = await Promise.all([
          axios.get(`${baseURL}/survey-questions/`),
          axios.get(`${baseURL}/users/`)
        ]);

        if (questionsRes.data.status === "success") {
          const sorted = questionsRes.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setQuestions(sorted);
          setFilteredQuestions(sorted);
        }

        if (usersRes.data) {
          setUsers(usersRes.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to get username by user ID
  const getUsernameById = (userId) => {
    if (!userId) return 'N/A';
    const user = users.find(u => u.user_id === userId);
    return user ? user.username : userId;
  };

  // Function to get user details for search (both ID and username)
  const getUserSearchData = (userId) => {
    if (!userId) return '';
    const user = users.find(u => u.user_id === userId);
    return user ? `${userId} ${user.username}` : userId;
  };

  // Function to format date for display
  const formatDate = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return `${date.getDate().toString().padStart(2, '0')}/${
      (date.getMonth() + 1).toString().padStart(2, '0')
    }/${date.getFullYear()}`;
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
      setFilteredQuestions(questions);
      setCurrentPage(1);
      return;
    }

    const searchLower = searchTerm.toLowerCase().trim();
    
    const filtered = questions.filter((question) => {
      // Get user data for search
      const createdBySearch = getUserSearchData(question.created_by);
      const updatedBySearch = getUserSearchData(question.updated_by);
      
      // Get dates in multiple formats for search
      const createdDateFormats = formatDateForSearch(question.created_at);
      const updatedDateFormats = formatDateForSearch(question.updated_at);
      
      // Create a comprehensive search string
      const searchableText = [
        // Raw question data
        question.question_id || '',
        question.question_text || '',
        question.rating_type || '',
        question.created_by || '',
        question.updated_by || '',
        question.created_at || '',
        question.updated_at || '',
        question.survey_type || '',
        question.question_category || '',
        question.is_active !== undefined ? String(question.is_active) : '',
        question.question_order !== undefined ? String(question.question_order) : '',
        
        // Formatted user data for search
        createdBySearch,
        updatedBySearch,
        
        // Dates in multiple formats
        createdDateFormats,
        updatedDateFormats,
        
        // Display values (exactly as shown in table)
        formatDate(question.created_at),
        getUsernameById(question.created_by),
        getUsernameById(question.updated_by),
        
        // Rating type variations for better search
        question.rating_type === '1-5' ? '1-5 1 to 5 1 2 3 4 5 one to five' : '',
        question.rating_type === '1-10' ? '1-10 1 to 10 1 2 3 4 5 6 7 8 9 10 one to ten' : '',
        question.rating_type === 'Yes/No' ? 'Yes/No Yes No YesNo yes no' : '',
        question.rating_type === 'Agree/Disagree' ? 'Agree/Disagree Agree Disagree agree disagree' : '',
        question.rating_type === 'Satisfaction' ? 'Satisfaction satisfied unsatisfied happy unhappy' : '',
        
        // Survey type variations if exists
        question.survey_type ? `${question.survey_type} survey` : '',
        
        // Category variations if exists
        question.question_category ? `${question.question_category} category` : '',
        
        // Active/Inactive variations
        question.is_active === true ? 'active true yes enabled' : '',
        question.is_active === false ? 'inactive false no disabled' : '',
        
        // Add any other properties that might exist
        ...Object.values(question).filter(val => 
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
    
    setFilteredQuestions(filtered);
    setCurrentPage(1);
  }, [searchTerm, questions, users]);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentQuestions = filteredQuestions.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredQuestions.length / entriesPerPage);

  const handleEdit = (question) => {
    navigate("/superadmin/survey-questions", { state: { question } });
  };

  const handleDelete = async (questionId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This question will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${baseURL}/survey-questions/${questionId}/`);
          const updatedQuestions = questions.filter(q => q.question_id !== questionId);
          setQuestions(updatedQuestions);
          setFilteredQuestions(updatedQuestions);

          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Survey question deleted successfully.',
            confirmButtonColor: '#3085d6'
          });
        } catch (error) {
          console.error("Delete error:", error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to delete the question. Please try again.',
            confirmButtonColor: '#d33'
          });
        }
      }
    });
  };

  return (
    <div className="container-fluid my-4">
      <div className="company-table-box p-4">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
          <div>
            <h2 className="company-form-heading mb-0">Survey Questions</h2>
            <p className="text-muted mb-0">Manage all your survey questions</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/superadmin/survey-questions')}
          >
            Add Survey Questions
          </button>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div className="d-flex align-items-center gap-2">
            Show
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="form-select form-select-sm w-auto"
            >
              {[5, 10, 25].map((val) => (
                <option key={val} value={val}>{val}</option>
              ))}
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
            <strong>Search Results:</strong> Found {filteredQuestions.length} question(s) matching "{searchTerm}"
          </div>
        )}

        {loading ? (
          <div className="text-center my-3">
            <div className="spinner-border text-primary"></div>
            <p>Loading questions...</p>
          </div>
        ) : (
          <>
            <div className="table-responsive mb-4">
              <table className="table ">
                <thead className="product-table-header">
                  <tr>
                    <th>S.No</th>
                    <th>Question ID</th>
                    <th>Question Text</th>
                    <th>Rating Type</th>
                    <th>Created By</th>
                    <th>Updated By</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentQuestions.length > 0 ? (
                    currentQuestions.map((q, index) => (
                      <tr key={q.question_id}>
                        <td>{indexOfFirstEntry + index + 1}</td>
                        <td>{q.question_id}</td>
                        <td>{q.question_text}</td>
                        <td>{q.rating_type}</td>
                        <td>{getUsernameById(q.created_by)}</td>
                        <td>{getUsernameById(q.updated_by)}</td>
                        <td>{formatDate(q.created_at)}</td>
                        <td>
                          <div className="action-icons d-flex gap-2">
                            <FaEdit
                              title="Edit"
                              className="action-icon edit-icon"
                              style={{ cursor: 'pointer' }}
                              onClick={() => handleEdit(q)}
                            />
                            <FaTrash
                              title="Delete"
                              className="action-icon delete-icon"
                              style={{ cursor: 'pointer' }}
                              onClick={() => handleDelete(q.question_id)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">
                        {searchTerm ? `No questions found matching "${searchTerm}"` : 'No questions found.'}
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

export default QuestionsView;