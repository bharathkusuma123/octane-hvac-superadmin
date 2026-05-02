import React, { createContext, useState } from "react";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));
  const [sessionId, setSessionId] = useState(localStorage.getItem("session_id")); // ✅

  const login = (role, id, companyInfo, sessionId) => {
    localStorage.setItem("userRole", role);
    localStorage.setItem("userId", id);

    if (sessionId) {
      localStorage.setItem("session_id", sessionId); // ✅ store session
      setSessionId(sessionId);
    }

    if (companyInfo?.default_company?.company_id) {
      localStorage.setItem("companyId", companyInfo.default_company.company_id);
      setCompanyId(companyInfo.default_company.company_id);
    }

    setUserRole(role);
    setUserId(id);
  };

  const logout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("companyId");
    localStorage.removeItem("session_id"); // ✅ remove session

    setUserRole(null);
    setUserId(null);
    setCompanyId(null);
    setSessionId(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, userRole, userId, companyId, sessionId }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;