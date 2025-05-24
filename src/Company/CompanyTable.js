import React from "react";
import "./CompanyInformation.css";

const CompanyTable = ({ onAdd }) => {
  const dummyData = [
    {
      company_id: 1,
      company_name: "ABC Corp",
      cr_number: "1234567890",
      vat_number: "VAT987654321",
      service_email: "service@abc.com",
      gm_email: "gm@abc.com",
      currency_code: "USD",
      time_zone: "America/New_York",
      status: "Active",
      created_at: "2024-01-01 10:00:00",
      updated_at: "2024-05-01 15:00:00",
      created_by: "admin",
      updated_by: "manager"
    }
  ];

  return (
    <div className="container my-4">
      <div className="company-table-box p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="company-form-heading">Company List</h2>
          <button className="btn btn-primary" onClick={onAdd}>Add Company</button>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Company Name</th>
                <th>CR Number</th>
                <th>VAT Number</th>
                <th>Service Email</th>
                <th>GM Email</th>
                <th>Currency</th>
                <th>Time Zone</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Created By</th>
                <th>Updated By</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((company, index) => (
                <tr key={index}>
                  <td>{company.company_id}</td>
                  <td>{company.company_name}</td>
                  <td>{company.cr_number}</td>
                  <td>{company.vat_number}</td>
                  <td>{company.service_email}</td>
                  <td>{company.gm_email}</td>
                  <td>{company.currency_code}</td>
                  <td>{company.time_zone}</td>
                  <td>{company.status}</td>
                  <td>{company.created_at}</td>
                  <td>{company.updated_at}</td>
                  <td>{company.created_by}</td>
                  <td>{company.updated_by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompanyTable;
