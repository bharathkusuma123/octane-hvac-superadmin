import React from "react";
import "./ServiceCompletion.css";

const ServiceCompletionTable = ({ onAdd }) => {
  const dummyData = [
    {
      component_entry_id: 1,
      service_item_id: 101,
      component_id: "CMP001",
      component_serial_number: "SN123456789",
      warranty_start_date: "2024-01-01",
      warranty_end_date: "2025-01-01",
      vendor_id: "VEND009",
      created_at: "2024-05-01 08:00:00",
      updated_at: "2024-05-10 12:00:00",
      created_by: "admin",
      updated_by: "tech_lead",
    },
  ];

  return (
    <div className="container my-4">
      <div className="service-wrapper p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="service-title">Service Item Components</h2>
          <button className="btn btn-primary" onClick={onAdd}>
            Add Completion
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Service Item ID</th>
                <th>Component ID</th>
                <th>Serial Number</th>
                <th>Warranty Start</th>
                <th>Warranty End</th>
                <th>Vendor ID</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Created By</th>
                <th>Updated By</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((entry, idx) => (
                <tr key={idx}>
                  <td>{entry.component_entry_id}</td>
                  <td>{entry.service_item_id}</td>
                  <td>{entry.component_id}</td>
                  <td>{entry.component_serial_number}</td>
                  <td>{entry.warranty_start_date}</td>
                  <td>{entry.warranty_end_date}</td>
                  <td>{entry.vendor_id}</td>
                  <td>{entry.created_at}</td>
                  <td>{entry.updated_at}</td>
                  <td>{entry.created_by}</td>
                  <td>{entry.updated_by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServiceCompletionTable;
