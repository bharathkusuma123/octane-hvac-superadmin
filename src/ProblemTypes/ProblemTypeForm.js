import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";

const ProblemTypeForm = ({ 
  editing, 
  onCancel, 
  onSubmit, 
  loading 
}) => {
  const { userId, companyId } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({ 
    name: editing?.name || "", 
    description: editing?.description || "" 
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="container mt-4 service-request-form">
      <div className="card">
        <div className="card-header">
          <h5 className="mb-1">{editing ? "Edit Problem Type" : "Add Problem Type"}</h5>
          <h6 className="text" style={{ color: "white" }}>
            Fill in problem type details below
          </h6>
          <h6 className="text" style={{ color: "white", fontSize: "14px", marginTop: "5px" }}>
            User: <strong>{userId}</strong> | Company: <strong>{companyId}</strong>
          </h6>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Problem Type Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter Problem Type Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Description *</label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  placeholder="Enter Description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="col-12">
                <div className="alert alert-info" style={{ fontSize: "14px" }}>
                  <strong>Note:</strong> This problem type will be created with User ID: <strong>{userId}</strong> and Company ID: <strong>{companyId}</strong>
                </div>
              </div>

              <div className="d-flex justify-content-center mt-3 gap-3">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading || !userId || !companyId}
                >
                  {loading ? (editing ? 'Updating...' : 'Submitting...') : (editing ? 'Update' : 'Submit')}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onCancel}
                  disabled={loading}
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

export default ProblemTypeForm;