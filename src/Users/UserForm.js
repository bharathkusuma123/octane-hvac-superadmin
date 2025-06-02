import React, { useEffect,useState } from "react";
import "./UserManagement.css";

const SECURITY_QUESTION_CHOICES = [
  "What is your mother’s maiden name?",
  "What was the name of your first pet?",
  "What was your first car?",
  "What is the name of the town where you were born?",
  "What was your childhood nickname?",
];

const UserForm = ({ onCancel, onSave }) => {
const [formData, setFormData] = useState({
  username: "",
  full_name: "",
  email: "",
  role: "Admin",
  phone: "",            
  telephone: "",       
  city: "",
  country_code: "",
  address: "",
  current_password: "",
  last_password: "",
  status: "Active",
  remarks: "",
  created_by: "Admin",
  updated_by: "Admin",
   company: "",
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
  username: safeTrim(formData.username) || null,
  full_name: safeTrim(formData.full_name) || null,
  email: safeTrim(formData.email) || null,
  role: formData.role || null,
  company: formData.company || null,
  phone: safeTrim(formData.phone) || null,           
  telephone: safeTrim(formData.telephone) || null,   
  city: safeTrim(formData.city) || null,
  country_code: safeTrim(formData.country_code) || null,
  address: safeTrim(formData.address) || null,
  last_password: formData.last_password || null,
  password: formData.current_password || null,
  status: formData.status || "Active",
  remarks: safeTrim(formData.remarks) || null,
  created_by: formData.created_by || "admin",
  updated_by: formData.updated_by || "admin",
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
    <div className="user-management-container">
      <h2 className="user-management-title">User Management</h2>
      <p className="user-management-subtitle">
        Add, view and manage user accounts
      </p>

      <form className="user-management-form" onSubmit={handleSubmit}>
        {/* Basic Information */}
        <section className="user-management-section">
          <h3>Basic Information</h3>
          <div className="user-management-row">
            <label> UserName
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                className="user-management-input"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </label>
            <label> Full Name
              <input
                type="text"
                name="full_name"
                placeholder="Enter full name"
                className="user-management-input"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </label>
            <label> Email
              <input
                type="email"
                name="email"
                placeholder="user@example.com"
                className="user-management-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Role Type
              <input
                type="text"
                name="role"
                className="user-management-input"
                value="Admin"
                readOnly
              />
            </label>

            <label>
  Company
  <select
    name="company"
    className="user-management-input"
    value={formData.company}
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
</label>
          </div>
        </section>

        {/* Contact Information */}
        <section className="user-management-section">
          <h3>Contact Information</h3>
          <div className="user-management-row">
            <label> Mobile
              <input
                type="text"
                name="phone"
                placeholder="Mobile (e.g., +1 123-456-7890)"
                className="user-management-input"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </label>
            <label> Telephone
              <input
                type="text"
                name="telephone"
                placeholder="Telephone"
                className="user-management-input"
                value={formData.telephone}
                onChange={handleChange}
              />
            </label>
            <label> City
              <input
                type="text"
                name="city"
                placeholder="City"
                className="user-management-input"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </label>
            <label> Country
              <input
                type="text"
                name="country_code"
                placeholder="Country Code (e.g., +966)"
                className="user-management-input"
                value={formData.country_code}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        </section>

        {/* Address */}
        <section className="user-management-section">
          <h3>Address</h3>
          <textarea
            name="address"
            className="user-management-textarea"
            placeholder="Enter complete postal address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </section>

        {/* Account Settings */}
        <section className="user-management-section">
          <h3>Account Settings</h3>

          <div className="user-management-row">
            <label> Current Password
              <input
                type="password"
                name="current_password"
                placeholder="Enter password"
                className="user-management-input"
                value={formData.current_password}
                onChange={handleChange}
                required
              />
            </label>
            <label> Confirm Password
              <input
                type="password"
                name="last_password"
                placeholder="Confirm password"
                className="user-management-input"
                value={formData.last_password}
                onChange={handleChange}
                required
              />
            </label>
            <div className="user-management-status">
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Active"
                  checked={formData.status === "Active"}
                  onChange={handleStatusChange}
                />{" "}
                Active
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Inactive"
                  checked={formData.status === "Inactive"}
                  onChange={handleStatusChange}
                />{" "}
                Inactive
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Blocked"
                  checked={formData.status === "Blocked"}
                  onChange={handleStatusChange}
                />{" "}
                Blocked
              </label>
            </div>
            {/* <label> Hourly Rate
            <input
              type="number"
              step="0.01"
              name="hourly_rate"
              placeholder="Hourly Rate (e.g., 0.00)"
              className="user-management-input"
              value={formData.hourly_rate}
              onChange={handleChange}
            />
            </label> */}
          </div>
        </section>

        {/* Security Questions */}
        {/* <section className="user-management-section">
          <h3>Security Questions</h3>
          <div className="user-management-row">
            <select
              name="security_question1"
              className="user-management-input"
              value={formData.security_question1}
              onChange={handleChange}
              required
            >
              <option value="">Select a security question</option>
              {SECURITY_QUESTION_CHOICES.map((q, i) => (
                <option key={i} value={q}>
                  {q}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="answer1"
              placeholder="Answer"
              className="user-management-input"
              value={formData.answer1}
              onChange={handleChange}
              required
            />
            <select
              name="security_question2"
              className="user-management-input"
              value={formData.security_question2}
              onChange={handleChange}
              required
            >
              <option value="">Select a security question</option>
              {SECURITY_QUESTION_CHOICES.map((q, i) => (
                <option key={i} value={q}>
                  {q}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="answer2"
              placeholder="Answer"
              className="user-management-input"
              value={formData.answer2}
              onChange={handleChange}
              required
            />
          </div>
        </section> */}

        {/* Additional Notes */}
        <section className="user-management-section">
          <h3>Additional Notes</h3>
          <textarea
            name="remarks"
            className="user-management-textarea"
            placeholder="Optional remarks or notes"
            value={formData.remarks}
            onChange={handleChange}
          />
        </section>

        {/* Buttons */}
        <div className="user-management-buttons">
          <button
            type="button"
            className="btn btn-outline-secondary user-management-cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary user-management-save-btn"
          >
            Save User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
