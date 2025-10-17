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
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`${baseURL}/survey-questions/`);
        if (res.data.status === "success") {
          const sorted = res.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setQuestions(sorted);
          setFilteredQuestions(sorted);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    const filtered = questions.filter(q =>
      Object.values(q).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredQuestions(filtered);
    setCurrentPage(1);
  }, [searchTerm, questions]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return `${date.getDate().toString().padStart(2, '0')}/${
      (date.getMonth() + 1).toString().padStart(2, '0')
    }/${date.getFullYear()}`;
  };

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

          <input
            type="text"
            placeholder="Search questions..."
            className="form-control w-auto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

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
                        <td>{q.created_by}</td>
                        <td>{q.updated_by}</td>
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
                      <td colSpan="8" className="text-center">No questions found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="pagination-controls d-flex justify-content-center mt-3">
              <button
                className="btn btn-outline-primary me-2"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                Previous
              </button>

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
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionsView;
