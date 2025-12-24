import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import baseURL from "../ApiUrl/Apiurl";

const DataRetentionConfig = () => {
  const navigate = useNavigate();

  const [retentionData, setRetentionData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [editId, setEditId] = useState(null);

  /* ================= FETCH DATA ================= */
  const fetchRetentionData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${baseURL}/data-retention/`
      );

      if (res.data.status === "success") {
        setRetentionData([res.data.data]); // wrap object into array
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRetentionData();
  }, []);

  /* ================= PAGINATION ================= */
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentRows = retentionData.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );
  const totalPages = Math.ceil(retentionData.length / entriesPerPage);

  /* ================= EDIT HANDLERS ================= */
  const handleEditClick = (row) => {
    setEditId(row.id);
    setEditValue(row.retention_days);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${baseURL}/data-retention/${editId}/`,
        {
          retention_days: Number(editValue),
        }
      );

      setShowModal(false);
      fetchRetentionData();
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update retention days");
    }
  };

  return (
    <div className="container-fluid my-4">
      <div className="company-table-box p-4">
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
          <div>
            <h2 className="company-form-heading mb-0">
              Data Retention Configuration
            </h2>
            <p className="text-muted mb-0">
              Manage retained data period
            </p>
          </div>
        </div>

        {/* SHOW ENTRIES */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div className="d-flex align-items-center gap-2">
            Show
            <select
              value={entriesPerPage}
              onChange={(e) =>
                setEntriesPerPage(Number(e.target.value))
              }
              className="form-select form-select-sm w-auto"
            >
              {[5, 10, 25].map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
            entries
          </div>
        </div>

        {/* TABLE */}
        {loading ? (
          <div className="text-center my-3">
            <div className="spinner-border text-primary"></div>
            <p>Loading retention data...</p>
          </div>
        ) : (
          <>
            <div className="table-responsive mb-4">
              <table className="table">
                <thead className="product-table-header">
                  <tr>
                    <th>S.No</th>
                    <th>ID</th>
                    <th>Retention Days</th>
                    <th>Created By</th>
                    <th>Updated By</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {currentRows.length > 0 ? (
                    currentRows.map((row, index) => (
                      <tr key={row.id}>
                        <td>{indexOfFirstEntry + index + 1}</td>
                        <td>{row.id}</td>
                        <td>{row.retention_days}</td>
                        <td>{row.created_by}</td>
                        <td>{row.updated_by}</td>
                        <td>
                          {new Date(row.created_at).toLocaleString()}
                        </td>
                        <td>
                          {new Date(row.updated_at).toLocaleString()}
                        </td>
                        <td>
                          <FaEdit
                            title="Edit"
                            className="action-icon edit-icon"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(`/superadmin/editdatarentention/${row.id}`)}

                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">
                        No data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="pagination-controls d-flex justify-content-center mt-3">
                <button
                  className="btn btn-outline-primary me-2"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => prev - 1)
                  }
                >
                  Previous
                </button>

                <span className="align-self-center mx-2">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  className="btn btn-outline-primary ms-2"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => prev + 1)
                  }
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ================= EDIT MODAL ================= */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-sm modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Retention Days</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <label className="form-label">Retention Days</label>
                <input
                  type="number"
                  className="form-control"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  min="1"
                />
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataRetentionConfig;
