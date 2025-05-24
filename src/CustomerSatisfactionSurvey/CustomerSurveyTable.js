import React from "react";
import "./CustomerSatisfactionSurvey.css";

const CustomerSurveyTable = ({ onAdd }) => {
  const dummyData = [
    {
      survey_id: 1,
      service_order_id: 2001,
      customer_id: 501,
      service_engineer_id: 302,
      rating_engineer: 9,
      rating_service: 8,
      engineer_rating_reason: "Very professional",
      service_rating_reason: "Satisfactory work",
      suggestions: "Improve response time",
      submitted_at: "2024-05-20 09:30:00",
      created_by: "customer123",
      updated_at: "2024-05-21 10:45:00"
    }
  ];

  return (
    <div className="container my-4">
      <div className="p-4 shadow-sm rounded ">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Customer Surveys</h2>
          <button className="btn btn-primary" onClick={onAdd}>
            Add Survey
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Survey ID</th>
                <th>Order ID</th>
                <th>Customer ID</th>
                <th>Engineer ID</th>
                <th>Eng. Rating</th>
                <th>Service Rating</th>
                <th>Eng. Reason</th>
                <th>Service Reason</th>
                <th>Suggestions</th>
                <th>Submitted At</th>
                <th>Created By</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((entry, idx) => (
                <tr key={idx}>
                  <td>{entry.survey_id}</td>
                  <td>{entry.service_order_id}</td>
                  <td>{entry.customer_id}</td>
                  <td>{entry.service_engineer_id}</td>
                  <td>{entry.rating_engineer}</td>
                  <td>{entry.rating_service}</td>
                  <td>{entry.engineer_rating_reason}</td>
                  <td>{entry.service_rating_reason}</td>
                  <td>{entry.suggestions}</td>
                  <td>{entry.submitted_at}</td>
                  <td>{entry.created_by}</td>
                  <td>{entry.updated_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerSurveyTable;
