import React, { useState } from "react";
import "./ServiceCompletion.css";

const ServiceCompletionForm = ({ onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    startDateTime: "",
    endDateTime: "",
    materialCost: "",
    labourHours: "",
    labourCost: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    onSave();
  };

  return (
    <div className="container my-4">
      <div className="service-wrapper p-4">
        <h3 className="service-title">Service Completion</h3>
        <p className="service-subtitle">
          Fill in the service assignment details below
        </p>
        <hr />

        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Act Start Date & Time</label>
              <input
                type="datetime-local"
                name="startDateTime"
                className="form-control"
                value={formData.startDateTime}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Act End Date & Time</label>
              <input
                type="datetime-local"
                name="endDateTime"
                className="form-control"
                value={formData.endDateTime}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Act Material Cost</label>
              <input
                type="number"
                name="materialCost"
                className="form-control"
                value={formData.materialCost}
                onChange={handleChange}
                placeholder="21.20"
              />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-4">
              <label className="form-label">Act Labour Hours</label>
              <input
                type="number"
                name="labourHours"
                className="form-control"
                value={formData.labourHours}
                onChange={handleChange}
                placeholder="1.5"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Act Labour Cost</label>
              <input
                type="number"
                name="labourCost"
                className="form-control"
                value={formData.labourCost}
                onChange={handleChange}
                placeholder="21.20"
              />
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 flex-wrap">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Service Completion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceCompletionForm;
