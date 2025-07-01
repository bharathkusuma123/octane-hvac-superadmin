// import React, { useState, useContext } from 'react';
// import { AuthContext } from "../AuthContext/AuthContext";
// import axios from 'axios';

// const SurveyQuestions = () => {
//   const { userId } = useContext(AuthContext);
//   const [questionText, setQuestionText] = useState('');
//   const [responseMessage, setResponseMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = {
//       question_text: questionText,
//       rating_type: "Rating",
//       created_by: userId,
//       updated_by: userId,
//     };

//     try {
//       const res = await axios.post('http://175.29.21.7:8006/survey-questions/', data);
//       setResponseMessage("Survey question added successfully!");
//       setQuestionText('');
//     } catch (error) {
//       setResponseMessage("Error adding question. Check console.");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Add Survey Question</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="questionText" className="form-label">Question Text</label>
//           <input
//             type="text"
//             className="form-control"
//             id="questionText"
//             value={questionText}
//             onChange={(e) => setQuestionText(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">Submit</button>
//       </form>
//       {responseMessage && <p className="mt-3">{responseMessage}</p>}
//     </div>
//   );
// };

// export default SurveyQuestions;








import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../AuthContext/AuthContext";
import axios from 'axios';
import Swal from 'sweetalert2';
// import './CompanyInformation.css';

const SurveyQuestions = () => {
  const { userId } = useContext(AuthContext);
  const [questionText, setQuestionText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      question_text: questionText,
      rating_type: "Rating",
      created_by: userId,
      updated_by: userId,
    };

    try {
      await axios.post('http://175.29.21.7:8006/survey-questions/', data);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Survey question added successfully!",
        confirmButtonColor: "#3085d6",
      }).then(() => navigate(-1)); // Go back on confirmation
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to add survey question. Please try again.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go back
  };

  return (
    <div className="container-fluid mt-4 service-request-form">
      <div className="card">
        <div className="card-header">
          <h5 className="mb-1">Add Survey Question</h5>
          <h6 style={{ color: 'white' }}>Fill in the survey question details below</h6>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-12">
                <label htmlFor="questionText" className="form-label">Question Text</label>
                <input
                  type="text"
                  className="form-control"
                  id="questionText"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  required
                />
              </div>

              <div className="d-flex justify-content-center mt-3 gap-3">
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Question'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SurveyQuestions;
