import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuestionsView = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook to navigate

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get('http://175.29.21.7:8006/survey-questions/');
        if (res.data.status === "success") {
          const sortedQuestions = res.data.data.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          setQuestions(sortedQuestions);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Survey Questions</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/superadmin/survey-questions')}
        >
          Add Survey Questions
        </button>
      </div>

      {loading ? (
        <p>Loading questions...</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
                <th>S.No</th>
              <th>Question ID</th>
              <th>Question Text</th>
              <th>Rating Type</th>
              <th>Created By</th>
              <th>Updated By</th>
              <th>Created At</th>
              {/* <th>Updated At</th> */}
            </tr>
          </thead>
          <tbody>
            {questions.map((q,index) => (
              <tr key={q.question_id}>
                <td>{index+1}</td>
                <td>{q.question_id}</td>
                <td>{q.question_text}</td>
                <td>{q.rating_type}</td>
                <td>{q.created_by}</td>
                <td>{q.updated_by}</td>
                <td>{formatDate(q.created_at)}</td>
                {/* <td>{formatDate(q.updated_at)}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default QuestionsView;
