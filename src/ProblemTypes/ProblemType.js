import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import baseURL from "../ApiUrl/Apiurl";
import { AuthContext } from "../AuthContext/AuthContext";
import "./ProblemType.css";

const ProblemType = () => {
  const [problemTypes, setProblemTypes] = useState([]);
  const [filteredProblemTypes, setFilteredProblemTypes] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const { userId } = useContext(AuthContext);
  const companyId = "COMP1";

  // Fetch all problem types - CORRECTED
  const fetchProblemTypes = async () => {
    try {
      const response = await axios.get(`${baseURL}/problem-types/`);
      console.log("API Response:", response.data); // Debug log
      
      // Extract data from the response structure
      const apiData = response.data.data || [];
      const sortedData = Array.isArray(apiData) 
        ? apiData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        : [];
      
      console.log("Processed Data:", sortedData); // Debug log
      setProblemTypes(sortedData);
      setFilteredProblemTypes(sortedData);
    } catch (error) {
      console.error("Error fetching problem types:", error);
      alert("Failed to fetch problem types");
    }
  };

  useEffect(() => {
    fetchProblemTypes();
  }, []);

  // Handle input change - FIXED: Added proper event handling
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle create/update - CORRECTED for API response structure
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.description.trim()) {
      alert("Please enter both name and description");
      return;
    }

    if (!userId) {
      alert("User ID not found. Please login again.");
      return;
    }

    if (!companyId) {
      alert("Company ID not found. Please select a company.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        user_id: userId,
        company_id: companyId
      };

      if (editing) {
        // UPDATE
        payload.problem_type_id = editing.problem_type_id;
        const response = await axios.put(`${baseURL}/problem-types/${editing.problem_type_id}/`, payload);
        if (response.data.status === "success") {
          alert("Problem Type updated successfully!");
        } else {
          throw new Error(response.data.message || "Update failed");
        }
      } else {
        // CREATE
        const response = await axios.post(`${baseURL}/problem-types/`, payload);
        if (response.data.status === "success") {
          alert("Problem Type added successfully!");
        } else {
          throw new Error(response.data.message || "Creation failed");
        }
      }

      setFormData({ name: "", description: "" });
      setEditing(null);
      setIsFormVisible(false);
      fetchProblemTypes();
    } catch (error) {
      console.error("Error saving problem type:", error);
      alert(error.message || "Failed to save problem type");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete - CORRECTED for API response structure
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this problem type?")) return;

    try {
      const response = await axios.delete(`${baseURL}/problem-types/${id}/?user_id=${userId}`);
      if (response.data.status === "success") {
        alert("Problem Type deleted successfully!");
      } else {
        throw new Error(response.data.message || "Delete failed");
      }
      fetchProblemTypes();
    } catch (error) {
      console.error("Error deleting problem type:", error);
      alert(error.message || "Failed to delete problem type");
    }
  };

  // Handle edit - FIXED: Properly set form data
  const handleEdit = (problemType) => {
    setFormData({
      name: problemType.name || "",
      description: problemType.description || "",
    });
    setEditing(problemType);
    setIsFormVisible(true);
  };

  // Handle add new - FIXED: Reset form data properly
  const handleAdd = () => {
    setFormData({ name: "", description: "" });
    setEditing(null);
    setIsFormVisible(true);
  };

  // Handle cancel
  const handleCancel = () => {
    setFormData({ name: "", description: "" });
    setEditing(null);
    setIsFormVisible(false);
  };

  // Search and filter
  useEffect(() => {
    const filtered = problemTypes.filter((pt) =>
      Object.values(pt)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredProblemTypes(filtered);
    setCurrentPage(1);
  }, [searchTerm, problemTypes]);

  // Format date time
  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata'
    });
  };

  // Pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentProblemTypes = filteredProblemTypes.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredProblemTypes.length / entriesPerPage);

  // Form Component - FIXED: Added proper form structure
  const ProblemTypeForm = () => (
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
                  onClick={handleCancel}
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

  // Table Component
  const ProblemTypeTable = () => (
    <div className="problem-type-management-container">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <div>
          <h2 className="problem-type-management-title mb-0">Problem Type Management</h2>
          <p className="problem-type-management-subtitle mb-0 text-muted">
            Manage problem types | User: <strong>{userId}</strong> | Company: <strong>{companyId}</strong>
          </p>
        </div>
        <button 
          onClick={handleAdd} 
          className="btn btn-primary"
          disabled={!userId || !companyId}
        >
          Add New Problem Type
        </button>
      </div>

      {(!userId || !companyId) && (
        <div className="alert alert-warning">
          <strong>Warning:</strong> {!userId ? "User ID not found. Please login again." : "Company ID not found. Please select a company."}
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <div className="d-flex align-items-center gap-2">
          Show
          <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="form-select form-select-sm w-auto"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
          entries
        </div>
        <input
          type="text"
          placeholder="Search problem types..."
          className="form-control w-auto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-responsive mb-4">
        <table className="table">
          <thead className="product-table-header">
            <tr>
              <th>S.No</th>
              <th>Problem Type ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProblemTypes.length > 0 ? (
              currentProblemTypes.map((problemType, index) => (
                <tr key={problemType.problem_type_id}>
                  <td>{indexOfFirstEntry + index + 1}</td>
                  <td>{problemType.problem_type_id}</td>
                  <td>{problemType.name}</td>
                  <td>{problemType.description}</td>
                  <td>{formatDateTime(problemType.created_at)}</td>
                  <td>{formatDateTime(problemType.updated_at)}</td>
                  <td>
                    <div className="action-icons">
                      <FaEdit
                        title="Edit"
                        onClick={() => handleEdit(problemType)}
                        className="action-icon edit-icon"
                      />
                      <FaTrash
                        title="Delete"
                        onClick={() => handleDelete(problemType.problem_type_id)}
                        className="action-icon delete-icon"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No problem types found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination-controls d-flex justify-content-center mt-3">
        <button
          className="btn btn-outline-primary me-2"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span className="align-self-center mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-outline-primary ms-2"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );

  return isFormVisible ? <ProblemTypeForm /> : <ProblemTypeTable />;
};

export default ProblemType;