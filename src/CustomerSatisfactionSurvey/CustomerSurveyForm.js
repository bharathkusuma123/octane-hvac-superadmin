import React from "react";
import "./CustomerSatisfactionSurvey.css";

const CustomerSurveyForm = ({ onCancel, onSave }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(); // Here you'd normally handle form data
  };

  return (
    <div className="container my-4">
      <div className="p-4 shadow-sm rounded bg-light">
        <h2>Customer Survey</h2>
        <p>Fill in the feedback details below</p>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Service Order</label>
              <select className="form-select">
                <option>Select Service Order</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Service Engineer</label>
              <select className="form-select">
                <option>Select Engineer</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Engineer Rating (1-10)</label>
              <input type="number" className="form-control" min={1} max={10} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Service Rating (1-10)</label>
              <input type="number" className="form-control" min={1} max={10} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Engineer Rating Reason</label>
              <textarea className="form-control" rows="3" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Service Rating Reason</label>
              <textarea className="form-control" rows="3" />
            </div>
            <div className="col-12">
              <label className="form-label">Suggestions</label>
              <textarea className="form-control" rows="3" />
            </div>
          </div>
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Survey
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerSurveyForm;
