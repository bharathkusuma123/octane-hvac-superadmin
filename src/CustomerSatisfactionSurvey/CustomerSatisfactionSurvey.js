import React, { useState } from "react";
import CustomerSurveyForm from "./CustomerSurveyForm";
import CustomerSurveyTable from "./CustomerSurveyTable";

const CustomerSurvey = () => {
  const [isFormVisible, setFormVisible] = useState(false);

  return isFormVisible ? (
    <CustomerSurveyForm
      onCancel={() => setFormVisible(false)}
      onSave={() => setFormVisible(false)}
    />
  ) : (
    <CustomerSurveyTable onAdd={() => setFormVisible(true)} />
  );
};

export default CustomerSurvey;
