import React, { useEffect,useState, useContext } from "react";
import "./UserManagement.css";
import { AuthContext } from "../AuthContext/AuthContext";

const SECURITY_QUESTION_CHOICES = [
  "What is your mother’s maiden name?",
  "What was the name of your first pet?",
  "What was your first car?",
  "What is the name of the town where you were born?",
  "What was your childhood nickname?",
];

const UserForm = ({ onCancel, onSave }) => {
  const { userId, userRole } = useContext(AuthContext);
const [formData, setFormData] = useState({
  username: "",
  full_name: "",
  email: "",
  role: "Admin",
  mobile: "",            
  telephone: "",       
  city: "",
  country_code: "",
  address: "",
  current_password: "",
  last_password: "",
  status: "Active",
  remarks: "",
   default_company: "",
    switch_company_allowed: false,
    company: [], 
});
const [companies, setCompanies] = useState([]);


  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? value.trim() : value,
    }));
  };

  useEffect(() => {
  const fetchCompanies = async () => {
    try {
      const response = await fetch("http://175.29.21.7:8006/companies/");
      const data = await response.json();
      if (data.status === "success") {
        setCompanies(data.data);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  fetchCompanies();
}, []);


  const handleStatusChange = (e) => {
    setFormData((prev) => ({ ...prev, status: e.target.value }));
  };





  const handleSubmit = async (e) => {
    e.preventDefault();

    const generateUserId = async () => {
      const response = await fetch('http://175.29.21.7:8006/users/');
      const users = await response.json();

      const userIds = users.map(u => u.user_id).filter(id => /^USRID\d+$/.test(id));
      const numbers = userIds.map(id => parseInt(id.replace('USRID', ''), 10));
      const max = Math.max(...numbers, 0);
      const newId = `USRID${(max + 1).toString().padStart(4, '0')}`;

      return newId;
    };

    const user_id = await generateUserId();  // ✅ Now user_id is defined

    const safeTrim = (val) => (val && typeof val === "string" ? val.trim() : "");

const payload = {
  user_id,
  companies: formData.company && formData.company.length > 0 ? formData.company : [],
  username: safeTrim(formData.username) || null,
  full_name: safeTrim(formData.full_name) || null,
  email: safeTrim(formData.email) || null,
  role: formData.role || null,
  default_company: formData.default_company || null,
  mobile: safeTrim(formData.mobile) || null,           
  telephone: safeTrim(formData.telephone) || null,   
  city: safeTrim(formData.city) || null,
  country_code: safeTrim(formData.country_code) || null,
  address: safeTrim(formData.address) || null,
  last_password: formData.last_password || null,
  password: formData.current_password || null,
  status: formData.status || "Active",
  remarks: safeTrim(formData.remarks) || null,
  created_by: userId ,
updated_by: userId ,

   switch_company_allowed: formData.switch_company_allowed,
};


    console.log("Sending payload", payload);

    try {
      const response = await fetch("http://175.29.21.7:8006/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Failed: ${response.status} - ${JSON.stringify(errorData)}`);
        return;
      }

      alert("User saved successfully!");
      onSave();
    } catch (error) {
      alert("Error while saving user: " + error.message);
    }
  };



  return (
<div className="container mt-4  service-request-form">
  <div className="card">
    <div className="card-header">
      <h5 className="mb-1">User Management</h5>
      <h6 className="text" style={{ color: "white" }}>
        Add, view and manage user accounts
      </h6>

       <h6 className="text" style={{ color: "white" }}>
  Logged in as: <strong>{userId},{userRole}</strong>
</h6>
    </div>
    <div className="card-body">
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          {/* Basic Information */}
          <div className="col-md-4">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="full_name"
              placeholder="Enter full name"
              className="form-control"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="user@example.com"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Role </label>
            <input
              type="text"
              name="role"
              className="form-control"
              value="Admin"
              readOnly
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Default Company</label>
            <select
              name="default_company"
              className="form-control"
              value={formData.default_company}
              onChange={handleChange}
              required
            >
              <option value="">Select a company</option>
              {companies.map((company) => (
                <option key={company.company_id} value={company.company_id}>
                  {company.company_name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4 d-flex align-items-center mt-2">
  <div className="col-md-4 mt-2">
  <label className="form-label me-2">Switch Company</label>
  <div className="d-flex gap-4">
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        name="switchCompany"
        id="switchYes"
        value="yes"
        checked={formData.switch_company_allowed === true}
        onChange={() =>
          setFormData((prev) => ({
            ...prev,
            switch_company_allowed: true,
          }))
        }
      />
      <label className="form-check-label" htmlFor="switchYes">
        Yes
      </label>
    </div>

    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        name="switchCompany"
        id="switchNo"
        value="no"
        checked={formData.switch_company_allowed === false}
        onChange={() =>
          setFormData((prev) => ({
            ...prev,
            switch_company_allowed: false,
          }))
        }
      />
      <label className="form-check-label" htmlFor="switchNo">
        No
      </label>
    </div>
  </div>
</div>






</div>


{formData.switch_company_allowed && (
  <div className="col-md-4 mt-2">
    <label className="form-label">Select Companies</label>
    <select
      multiple
      className="form-control"
      style={{ height: "120px" }} // optional for better UI
      value={formData.company}
      onChange={(e) => {
        const selected = Array.from(e.target.selectedOptions, (option) => option.value);
        setFormData((prev) => ({
          ...prev,
          company: selected,
        }));
      }}
    >
      {companies.map((company) => (
        <option key={company.company_id} value={company.company_id}>
          {company.company_name}
        </option>
      ))}
    </select>
  </div>
)}



          {/* Contact Information */}
          <div className="col-md-4">
            <label className="form-label">Mobile</label>
            <input
              type="text"
              name="mobile"
              placeholder="Mobile (e.g., +1 123-456-7890)"
              className="form-control"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Telephone</label>
            <input
              type="text"
              name="telephone"
              placeholder="Telephone"
              className="form-control"
              value={formData.telephone}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">City</label>
            <input
              type="text"
              name="city"
              placeholder="City"
              className="form-control"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Country Code</label>
            <input
              type="text"
              name="country_code"
              placeholder="Country Code (e.g., +966)"
              className="form-control"
              value={formData.country_code}
              onChange={handleChange}
              required
            />
          </div>

          {/* Address */}
          <div className="col-12">
            <label className="form-label">Address</label>
            <textarea
              name="address"
              className="form-control"
              placeholder="Enter complete postal address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* Account Settings */}
          <div className="col-md-4">
            <label className="form-label">Current Password</label>
            <input
              type="password"
              name="current_password"
              placeholder="Enter password"
              className="form-control"
              value={formData.current_password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="last_password"
              placeholder="Confirm password"
              className="form-control"
              value={formData.last_password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Status</label>
            <div className="d-flex gap-3">
              {["Active", "Inactive", "Blocked"].map((s) => (
                <div key={s} className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="status"
                    value={s}
                    checked={formData.status === s}
                    onChange={handleStatusChange}
                  />
                  <label className="form-check-label">{s}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div className="col-12">
            <label className="form-label">Additional Notes</label>
            <textarea
              name="remarks"
              className="form-control"
              placeholder="Optional remarks or notes"
              value={formData.remarks}
              onChange={handleChange}
            />
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-center mt-3 gap-3">
            <button type="submit" className="submit-btn">
              Save User
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

export default UserForm;
