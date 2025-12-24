import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditDataRetention = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [retentionDays, setRetentionDays] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ================= FETCH EXISTING DATA ================= */
  useEffect(() => {
    const fetchRetention = async () => {
      try {
        const res = await axios.get(
          `https://octane.air2o.net/data-retention/`
        );

        if (res.data.status === "success") {
          setRetentionDays(res.data.data.retention_days);
        }
      } catch (err) {
        console.error(err);
        alert("Failed to load retention data");
      } finally {
        setLoading(false);
      }
    };

    fetchRetention();
  }, [id]);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!retentionDays || retentionDays <= 0) {
      alert("Retention days must be greater than 0");
      return;
    }

    try {
      setIsSubmitting(true);

      await axios.put(
        `https://octane.air2o.net/data-retention/${id}/`,
        {
          retention_days: Number(retentionDays),
        }
      );

      // ✅ SUCCESS → BACK TO LIST
      navigate("/superadmin/data-retention");
    } catch (err) {
      console.error(err);
      alert("Failed to update retention days");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/superadmin/data-retention");
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-4 service-request-form">
      <div className="card">
        <div className="card-header">
          <h5>Edit Data Retention</h5>
          <h6 style={{ color: "white" }}>
            Update retention period (in days)
          </h6>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label">
                  Retention Days <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={retentionDays}
                  onChange={(e) => setRetentionDays(e.target.value)}
                  min="1"
                  placeholder="Enter retention days"
                  required
                />
                <div className="form-text">
                  Data older than this period will be removed automatically
                </div>
              </div>

              <div className="d-flex justify-content-center mt-4 gap-3">
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update Retention"}
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                  disabled={isSubmitting}
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

export default EditDataRetention;
