import React, { useState } from "react";
import "./CompanyInformation.css";

const CompanyForm = ({ onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    crNumber: "",
    vatNumber: "",
    serviceEmail: "",
    gmEmail: "",
    currencyCode: "",
    timeZone: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Company Submitted: ", formData);
    onSave();
  };

  return (
    <div className="container my-4">
      <div className="company-form-box p-4">
        <h2 className="company-form-heading">Company Information</h2>
        <p className="company-form-subtitle">Fill in the company details below</p>

        <form onSubmit={handleSubmit}>
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label">Company Name</label>
              <input type="text" name="companyName" className="form-control" onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">C.R Number</label>
              <input type="text" name="crNumber" className="form-control" onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">VAT Number</label>
              <input type="text" name="vatNumber" className="form-control" onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Service Email</label>
              <input type="email" name="serviceEmail" className="form-control" onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">GM Email</label>
              <input type="email" name="gmEmail" className="form-control" onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Currency Code</label>
              <input type="text" name="currencyCode" className="form-control" onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Time Zone</label>
              <input type="text" name="timeZone" className="form-control" onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Status</label>
              <select name="status" className="form-select" onChange={handleChange}>
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 flex-wrap">
            <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyForm;
