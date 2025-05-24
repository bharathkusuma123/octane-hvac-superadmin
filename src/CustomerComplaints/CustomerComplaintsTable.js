import React from "react";
import "./CustomerComplaints.css";

const CustomerComplaintsTable = ({ onAdd }) => {
  const dummyData = [
    {
      complaint_id: "C1001",
      customer_id: 501,
      service_item_id: 1001,
      complaint_details: "Machine making unusual noise",
      complaint_date: "2024-05-22 10:30:00",
      status: "Open",
      escalation_level: "None",
      service_manager_email: "",
      gm_email: "",
      resolution_details: "",
      resolved_at: null,
      created_by: "cust_user",
      updated_at: "2024-05-23 08:45:00"
    }
  ];

  return (
    <div className="container my-4">
      <div className="complaints-container p-4 rounded shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="complaints-title">Complaint Records</h2>
          <button className="btn btn-primary" onClick={onAdd}>
            Add Complaint
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Complaint ID</th>
                <th>Customer ID</th>
                <th>Service Item ID</th>
                <th>Complaint Details</th>
                <th>Complaint Date</th>
                <th>Status</th>
                <th>Escalation</th>
                <th>Manager Email</th>
                <th>GM Email</th>
                <th>Resolution</th>
                <th>Resolved At</th>
                <th>Created By</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.complaint_id}</td>
                  <td>{item.customer_id}</td>
                  <td>{item.service_item_id}</td>
                  <td>{item.complaint_details}</td>
                  <td>{item.complaint_date}</td>
                  <td>{item.status}</td>
                  <td>{item.escalation_level}</td>
                  <td>{item.service_manager_email}</td>
                  <td>{item.gm_email}</td>
                  <td>{item.resolution_details}</td>
                  <td>{item.resolved_at || "-"}</td>
                  <td>{item.created_by}</td>
                  <td>{item.updated_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerComplaintsTable;
