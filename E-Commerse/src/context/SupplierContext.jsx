import React, { createContext, useState, useEffect } from "react";

export const SupplierContext = createContext();

export const SupplierProvider = ({ children }) => {
  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    const storedSupplier = localStorage.getItem("supplierInfo");
    if (storedSupplier) {
      const parsed = JSON.parse(storedSupplier);
      setSupplier(parsed.supplier || parsed);
    }
  }, []);

  const login = (data) => {
    localStorage.setItem("supplierInfo", JSON.stringify(data));
    setSupplier(data);
  };

  const logout = () => {
    localStorage.removeItem("supplierInfo");
    setSupplier(null);
  };

  return (
    <SupplierContext.Provider value={{ supplier, login, logout }}>
      {children}
    </SupplierContext.Provider>
  );
};
