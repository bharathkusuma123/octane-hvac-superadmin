import React, { useState, useContext } from 'react';
import { AuthContext } from "../AuthContext/AuthContext";
import axios from 'axios';

const SurveyQuestions = () => {
  const { userId } = useContext(AuthContext);
  const [questionText, setQuestionText] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      question_text: questionText,
      rating_type: "Rating",
      created_by: userId,
      updated_by: userId,
    };

    try {
      const res = await axios.post('http://175.29.21.7:8006/survey-questions/', data);
      setResponseMessage("Survey question added successfully!");
      setQuestionText('');
    } catch (error) {
      setResponseMessage("Error adding question. Check console.");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Survey Question</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
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
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {responseMessage && <p className="mt-3">{responseMessage}</p>}
    </div>
  );
};

export default SurveyQuestions;
