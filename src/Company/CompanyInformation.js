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



// import React, { useState } from "react";
// import CompanyForm from "./CompanyForm";
// import CompanyTable from "./CompanyTable";
// import { SnackbarProvider } from "notistack";
// const CompanyInformation = () => {
//   const [isFormVisible, setFormVisible] = useState(false);
//   const [editingCompany, setEditingCompany] = useState(null);

//   const handleAdd = () => {
//     setEditingCompany(null);
//     setFormVisible(true);
//   };

//   const handleEdit = (companyData) => {
//     setEditingCompany(companyData);
//     setFormVisible(true);
//   };

//   return isFormVisible ? (
//    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
//     <CompanyForm
//       onCancel={() => setFormVisible(false)}
//       onSave={() => setFormVisible(false)}
//       initialData={editingCompany}
//     />
// </SnackbarProvider>
//   ) : (
//     <CompanyTable onAdd={handleAdd} onEdit={handleEdit} />
//   );
// };

// export default CompanyInformation;



import React, { useState, useEffect } from "react";
import CompanyForm from "./CompanyForm";
import CompanyTable from "./CompanyTable";
import { SnackbarProvider } from "notistack";

const CompanyInformation = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  // Handle browser back button and swipe gesture when form is open
  useEffect(() => {
    if (isFormVisible) {
      // Push a new history state to trap the back button
      window.history.pushState({ formOpen: true }, '', window.location.pathname);
      
      const handlePopState = (event) => {
        if (isFormVisible) {
          // Prevent default back navigation
          event.preventDefault();
          // Close the form instead of navigating away
          setFormVisible(false);
          setEditingCompany(null);
          // Push a new state to handle any further back attempts
          window.history.pushState({ formOpen: true }, '', window.location.pathname);
        }
      };
      
      window.addEventListener('popstate', handlePopState);
      
      // Cleanup event listener when form closes
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [isFormVisible]);

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