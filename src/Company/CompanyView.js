import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CompanyView.css";

const CompanyView = () => {
  const { company_id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`http://175.29.21.7:8006/companies/${company_id}/`);
        setCompany(response.data.data);
      } catch (error) {
        console.error("Error fetching company:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [company_id]);

  if (loading)
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary"></div>
        <p>Loading company details...</p>
      </div>
    );

  if (!company)
    return <div className="alert alert-danger">Company not found</div>;

  return (
    <div className="container mt-4 service-request-formview">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-1">View Company</h5>
            <h6 className="text-white mb-0">Detailed company information</h6>
          </div>
          <button className="btn btn-light btn-sm" onClick={() => navigate(-1)}>
            &larr; Back
          </button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <tbody>
                <tr>
                  <th>Company ID</th>
                  <td>{company.company_id}</td>
                </tr>
                <tr>
                  <th>Company Name</th>
                  <td>{company.company_name}</td>
                </tr>
                <tr>
                  <th>C.R Number</th>
                  <td>{company.cr_number}</td>
                </tr>
                <tr>
                  <th>VAT Number</th>
                  <td>{company.vat_number}</td>
                </tr>
                <tr>
                  <th>Service Email</th>
                  <td>{company.service_email}</td>
                </tr>
                <tr>
                  <th>GM Email</th>
                  <td>{company.gm_email}</td>
                </tr>
                <tr>
                  <th>Currency Code</th>
                  <td>{company.currency_code}</td>
                </tr>
                <tr>
                  <th>Time Zone</th>
                  <td>{company.time_zone}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>
                    <span
                      className={`badge ${
                        company.status === "Active"
                          ? "bg-success"
                          : company.status === "Inactive"
                          ? "bg-warning text-dark"
                          : "bg-danger"
                      }`}
                    >
                      {company.status}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>Created At</th>
                  <td>{new Date(company.created_at).toLocaleString()}</td>
                </tr>
                <tr>
                  <th>Updated At</th>
                  <td>{new Date(company.updated_at).toLocaleString()}</td>
                </tr>
                <tr>
                  <th>Created By</th>
                  <td>{company.created_by}</td>
                </tr>
                <tr>
                  <th>Updated By</th>
                  <td>{company.updated_by}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyView;
