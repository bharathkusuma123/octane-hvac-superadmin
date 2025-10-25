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








import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from "../AuthContext/AuthContext";
import axios from 'axios';
import Swal from 'sweetalert2';
import baseURL from '../ApiUrl/Apiurl';

const SurveyQuestions = () => {
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const questionData = location.state?.question || null;

  const [questionText, setQuestionText] = useState('');
  const [ratingType, setRatingType] = useState('Rating');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!questionData;

  // Rating type options based on your model
  const ratingTypeOptions = [
    { value: 'Rating', label: 'Rating (1-5)' },
    { value: 'YesNo', label: 'Yes/No' },
    { value: 'Scale', label: 'Scale (1-10)' },
  ];

  useEffect(() => {
    if (isEditMode && questionData) {
      setQuestionText(questionData.question_text);
      setRatingType(questionData.rating_type || 'Rating');
    }
  }, [questionData, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!questionText.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please enter question text",
      });
      return;
    }

    setIsSubmitting(true);

    const data = {
      question_text: questionText.trim(),
      rating_type: ratingType,
      updated_by: userId,
      created_by: isEditMode ? questionData.created_by : userId
    };

    try {
      if (isEditMode) {
        await axios.put(`${baseURL}/survey-questions/${questionData.question_id}/`, data);
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Survey question updated successfully!",
        });
      } else {
        await axios.post(`${baseURL}/survey-questions/`, data);
        Swal.fire({
          icon: "success",
          title: "Added!",
          text: "Survey question added successfully!",
        });
      }
      navigate(-1);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Could not save the question. Try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => navigate(-1);

  return (
    <div className="container mt-4 service-request-form">
      <div className="card">
        <div className="card-header">
          <h5>{isEditMode ? "Edit" : "Add"} Survey Question</h5>
          <h6 style={{ color: 'white' }}>
            {isEditMode ? "Update question details below" : "Fill in the survey question details below"}
          </h6>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="questionText" className="form-label">
                  Question Text <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="questionText"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="Enter your survey question"
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="ratingType" className="form-label">
                  Rating Type <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  id="ratingType"
                  value={ratingType}
                  onChange={(e) => setRatingType(e.target.value)}
                  required
                >
                  {ratingTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="form-text">
                  Choose how users will respond to this question
                </div>
              </div>

              <div className="d-flex justify-content-center mt-3 gap-3">
                <button 
                  type="submit" 
                  className="submit-btn" 
                  disabled={isSubmitting || !questionText.trim()}
                >
                  {isSubmitting ? 'Submitting...' : (isEditMode ? 'Update Question' : 'Submit Question')}
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

