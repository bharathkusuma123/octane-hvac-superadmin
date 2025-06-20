// import React, { useState } from "react";
// import CompanyForm from "./CompanyForm";
// import CompanyTable from "./CompanyTable";

// const CompanyInformation = () => {
//   const [isFormVisible, setFormVisible] = useState(false);

//   return isFormVisible ? (
//     <CompanyForm onCancel={() => setFormVisible(false)} onSave={() => setFormVisible(false)} />
//   ) : (
//     <CompanyTable onAdd={() => setFormVisible(true)} />
//   );
// };

// export default CompanyInformation;



import React, { useState } from "react";
import CompanyForm from "./CompanyForm";
import CompanyTable from "./CompanyTable";

const CompanyInformation = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  const handleAdd = () => {
    setEditingCompany(null);
    setFormVisible(true);
  };

  const handleEdit = (companyData) => {
    setEditingCompany(companyData);
    setFormVisible(true);
  };

  return isFormVisible ? (
    <CompanyForm
      onCancel={() => setFormVisible(false)}
      onSave={() => setFormVisible(false)}
      initialData={editingCompany}
    />
  ) : (
    <CompanyTable onAdd={handleAdd} onEdit={handleEdit} />
  );
};

export default CompanyInformation;
