import React, { useState } from "react";
import CompanyForm from "./CompanyForm";
import CompanyTable from "./CompanyTable";

const CompanyInformation = () => {
  const [isFormVisible, setFormVisible] = useState(false);

  return isFormVisible ? (
    <CompanyForm onCancel={() => setFormVisible(false)} onSave={() => setFormVisible(false)} />
  ) : (
    <CompanyTable onAdd={() => setFormVisible(true)} />
  );
};

export default CompanyInformation;
