import React from "react";
import "./CustomerComplaints.css";

const CustomerComplaintsForm = ({ onCancel, onSave }) => {
  return (
    <div className="complaints-container container mt-4 p-4 rounded shadow-sm">
      <h2 className="complaints-title mb-1">Customer Complaints</h2>
      <p className="complaints-subtitle mb-4">Fill in the Complaints details below</p>
      <hr />

      <form onSubmit={(e) => { e.preventDefault(); onSave(); }}>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label complaints-label">Complaint ID</label>
            <input type="text" className="form-control complaints-input" placeholder="CID001" defaultValue="CID001" />
          </div>

          <div className="col-md-4">
            <label className="form-label complaints-label">Service Order ID</label>
            <input type="text" className="form-control complaints-input" placeholder="e.g. service_order_001" />
          </div>

          <div className="col-md-4">
            <label className="form-label complaints-label">Service Item ID</label>
            <input type="text" className="form-control complaints-input" placeholder="e.g. serviceid_001" />
          </div>

          <div className="col-12">
            <label className="form-label complaints-label">Complaint Details</label>
            <textarea className="form-control complaints-input" placeholder="Add any notes or description..." rows="4" />
          </div>

          <div className="col-12 d-flex justify-content-end gap-2 mt-3">
            <button type="button" className="btn btn-outline-secondary complaints-btn-cancel" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary complaints-btn-save">
              Save Complaint
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomerComplaintsForm;
