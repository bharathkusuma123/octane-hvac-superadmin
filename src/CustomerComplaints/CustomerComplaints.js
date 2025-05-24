import React, { useState } from "react";
import CustomerComplaintsForm from "./CustomerComplaintsForm";
import CustomerComplaintsTable from "./CustomerComplaintsTable";

const CustomerComplaints = () => {
  const [isFormVisible, setFormVisible] = useState(false);

  return isFormVisible ? (
    <CustomerComplaintsForm
      onCancel={() => setFormVisible(false)}
      onSave={() => setFormVisible(false)}
    />
  ) : (
    <CustomerComplaintsTable onAdd={() => setFormVisible(true)} />
  );
};

export default CustomerComplaints;
