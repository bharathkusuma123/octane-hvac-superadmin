import React, { useState } from "react";
import UserForm from "./UserForm";
import UserTable from "./UserTable";

const User = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [editUserData, setEditUserData] = useState(null); // added for editing

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
