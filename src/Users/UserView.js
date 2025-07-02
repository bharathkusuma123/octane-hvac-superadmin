


import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./UserView.css";

const UserView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  if (!user) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">No user data found.</div>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4 service-request-formview">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-1">View User</h5>
            <h6 className="text-white mb-0">Detailed user information</h6>
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
                  <th>User ID</th>
                  <td>{user.user_id}</td>
                </tr>
                <tr>
                  <th>Username</th>
                  <td>{user.username}</td>
                </tr>
                <tr>
                  <th>Full Name</th>
                  <td>{user.full_name}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <th>Role</th>
                  <td>{user.role}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>
                    <span
                      className={`badge ${
                        user.status === "Active"
                          ? "bg-success"
                          : user.status === "Inactive"
                          ? "bg-warning text-dark"
                          : "bg-danger"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>Mobile</th>
                  <td>{user.mobile}</td>
                </tr>
                <tr>
                  <th>Telephone</th>
                  <td>{user.telephone}</td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>{user.address}</td>
                </tr>
                <tr>
                  <th>City</th>
                  <td>{user.city}</td>
                </tr>
                <tr>
                  <th>Country Code</th>
                  <td>{user.country_code}</td>
                </tr>
                <tr>
                  <th>Default Company</th>
                  <td>{user.default_company}</td>
                </tr>
                <tr>
                  <th>Accessible Companies</th>
                  <td>{user.companies && user.companies.join(", ")}</td>
                </tr>
                <tr>
                  <th>Created By</th>
                  <td>{user.created_by}</td>
                </tr>
                <tr>
                  <th>Updated By</th>
                  <td>{user.updated_by}</td>
                </tr>
                <tr>
                  <th>Remarks</th>
                  <td>{user.remarks}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserView;
