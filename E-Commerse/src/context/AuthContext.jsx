import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("supplierInfo");
    if (stored) {
      const parsed = JSON.parse(stored);
      setSupplier(parsed.supplier || parsed);
    }
  }, []);

  const login = (data) => {
    localStorage.setItem("supplierInfo", JSON.stringify(data));
    setSupplier(data.supplier || data);
  };

  const logout = () => {
    localStorage.removeItem("supplierInfo");
    setSupplier(null);
  };

  return (
    <AuthContext.Provider value={{ supplier, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
