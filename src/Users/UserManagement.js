// import React, { useState } from "react";
// import UserForm from "./UserForm";
// import UserTable from "./UserTable";

// const User = () => {
//   const [isFormVisible, setFormVisible] = useState(false);
//   const [editUserData, setEditUserData] = useState(null); // added for editing

//   const handleAddUser = () => {
//     setEditUserData(null); // reset if adding new
//     setFormVisible(true);
//   };

//   const handleEditUser = (user) => {
//     setEditUserData(user);
//     setFormVisible(true);
//   };

//   return isFormVisible ? (
//     <UserForm
//       initialData={editUserData} // pass user data if editing
//       onCancel={() => setFormVisible(false)}
//       onSave={() => setFormVisible(false)}
//     />
//   ) : (
//     <UserTable onAdd={handleAddUser} onEdit={handleEditUser} />
//   );
// };

// export default User;



import React, { useState, useEffect } from "react";
import UserForm from "./UserForm";
import UserTable from "./UserTable";

const User = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [editUserData, setEditUserData] = useState(null); // added for editing

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
          setEditUserData(null);
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

  const handleAddUser = () => {
    setEditUserData(null); // reset if adding new
    setFormVisible(true);
  };

  const handleEditUser = (user) => {
    setEditUserData(user);
    setFormVisible(true);
  };

  return isFormVisible ? (
    <UserForm
      initialData={editUserData} // pass user data if editing
      onCancel={() => setFormVisible(false)}
      onSave={() => setFormVisible(false)}
    />
  ) : (
    <UserTable onAdd={handleAddUser} onEdit={handleEditUser} />
  );
};

export default User;