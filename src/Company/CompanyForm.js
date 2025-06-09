import React, { useState } from "react";
import axios from "axios";
import "./CompanyInformation.css";

const CompanyForm = ({ onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    companyId: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentTime = new Date().toISOString();

    const payload = {
  company_id: formData.companyId,
  company_name: formData.companyName,
  cr_number: formData.crNumber,
  vat_number: formData.vatNumber,
  service_email: formData.serviceEmail,
  gm_email: formData.gmEmail,
  currency_code: formData.currencyCode,
  time_zone: formData.timeZone,
  status: formData.status, // Should be "Active" or "Inactive"
  created_at: currentTime,
  updated_at: currentTime,
  created_by: "Super Admin",
  updated_by: "Super Admin",
};


    try {
      const response = await axios.post("http://175.29.21.7:8006/companies/", payload);
      console.log("Response:", response.data);
      alert("Company added successfully");
      onSave();
    } catch (error) {
      console.error("Error adding company:", error);
      alert("Failed to add company");
    }
  };

  return (
    // <div className="container my-4">
    //   <div className="company-form-box p-4">
    //     <h2 className="company-form-heading">Company Information</h2>
    //     <p className="company-form-subtitle">Fill in the company details below</p>

    //     <form onSubmit={handleSubmit}>
    //       <div className="row g-3 mb-3">
    //         <div className="col-md-6">
    //           <label className="form-label">Company ID</label>
    //           <input
    //             type="text"
    //             name="companyId"
    //             className="form-control"
    //             value={formData.companyId}
    //             onChange={handleChange}
    //             required
    //           />
    //         </div>
    //         <div className="col-md-6">
    //           <label className="form-label">Company Name</label>
    //           <input
    //             type="text"
    //             name="companyName"
    //             className="form-control"
    //             value={formData.companyName}
    //             onChange={handleChange}
    //             required
    //           />
    //         </div>
    //         <div className="col-md-6">
    //           <label className="form-label">C.R Number</label>
    //           <input
    //             type="text"
    //             name="crNumber"
    //             className="form-control"
    //             value={formData.crNumber}
    //             onChange={handleChange}
    //             required
    //           />
    //         </div>
    //         <div className="col-md-6">
    //           <label className="form-label">VAT Number</label>
    //           <input
    //             type="text"
    //             name="vatNumber"
    //             className="form-control"
    //             value={formData.vatNumber}
    //             onChange={handleChange}
    //           />
    //         </div>
    //         <div className="col-md-6">
    //           <label className="form-label">Service Email</label>
    //           <input
    //             type="email"
    //             name="serviceEmail"
    //             className="form-control"
    //             value={formData.serviceEmail}
    //             onChange={handleChange}
    //           />
    //         </div>
    //         <div className="col-md-6">
    //           <label className="form-label">GM Email</label>
    //           <input
    //             type="email"
    //             name="gmEmail"
    //             className="form-control"
    //             value={formData.gmEmail}
    //             onChange={handleChange}
    //           />
    //         </div>
    //         <div className="col-md-6">
    //           <label className="form-label">Currency Code</label>
    //           <input
    //             type="text"
    //             name="currencyCode"
    //             className="form-control"
    //             value={formData.currencyCode}
    //             onChange={handleChange}
    //           />
    //         </div>
    //         <div className="col-md-6">
    //           <label className="form-label">Time Zone</label>
    //           <input
    //             type="text"
    //             name="timeZone"
    //             className="form-control"
    //             value={formData.timeZone}
    //             onChange={handleChange}
    //           />
    //         </div>
    //         <div className="col-md-6">
    //           <label className="form-label">Status</label>
    //           <select
    //             name="status"
    //             className="form-select"
    //             value={formData.status}
    //             onChange={handleChange}
    //             required
    //           >
    //             <option value="">Select Status</option>
    //             <option value="Active">Active</option>
    //             <option value="Inactive">Inactive</option>
    //           </select>
    //         </div>
    //       </div>

    //       <div className="d-flex justify-content-end gap-2 flex-wrap">
    //         <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
    //           Cancel
    //         </button>
    //         <button type="submit" className="btn btn-primary">
    //           Save Company
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>

    <div className="container mt-4 service-request-form">
  <div className="card">
    <div className="card-header">
      <h5 className="mb-1">Company Information</h5>
      <h6 className="text" style={{ color: "white" }}>
        Fill in the company details below
      </h6>
    </div>
    <div className="card-body">
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Company ID</label>
            <input
              type="text"
              name="companyId"
              className="form-control"
              value={formData.companyId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              name="companyName"
              className="form-control"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">C.R Number</label>
            <input
              type="text"
              name="crNumber"
              className="form-control"
              value={formData.crNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">VAT Number</label>
            <input
              type="text"
              name="vatNumber"
              className="form-control"
              value={formData.vatNumber}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Service Email</label>
            <input
              type="email"
              name="serviceEmail"
              className="form-control"
              value={formData.serviceEmail}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">GM Email</label>
            <input
              type="email"
              name="gmEmail"
              className="form-control"
              value={formData.gmEmail}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Currency Code</label>
            <input
              type="text"
              name="currencyCode"
              className="form-control"
              value={formData.currencyCode}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Time Zone</label>
            <input
              type="text"
              name="timeZone"
              className="form-control"
              value={formData.timeZone}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Status</label>
            <select
              name="status"
              className="form-control"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="d-flex justify-content-center mt-3 gap-3">
            <button type="submit" className="submit-btn">
              Save Company
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
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

export default CompanyForm;
