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
import { SnackbarProvider } from "notistack";
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
   <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
    <CompanyForm
      onCancel={() => setFormVisible(false)}
      onSave={() => setFormVisible(false)}
      initialData={editingCompany}
    />
</SnackbarProvider>
  ) : (
    <CompanyTable onAdd={handleAdd} onEdit={handleEdit} />
  );
};

export default CompanyInformation;
