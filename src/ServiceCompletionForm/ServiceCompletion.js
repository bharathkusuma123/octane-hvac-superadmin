import React, { useState } from "react";
import ServiceCompletionForm from "./ServiceCompletionForm";
import ServiceCompletionTable from "./ServiceCompletionTable";

const ServiceCompletion = () => {
  const [isFormVisible, setFormVisible] = useState(false);

  return isFormVisible ? (
    <ServiceCompletionForm
      onCancel={() => setFormVisible(false)}
      onSave={() => setFormVisible(false)}
    />
  ) : (
    <ServiceCompletionTable onAdd={() => setFormVisible(true)} />
  );
};

export default ServiceCompletion;
