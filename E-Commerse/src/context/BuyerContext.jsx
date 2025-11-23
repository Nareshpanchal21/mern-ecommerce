import React, { createContext, useState } from "react";

export const BuyerContext = createContext();

export const BuyerProvider = ({ children }) => {
  const [buyer, setBuyer] = useState(() => {
    const storedBuyer = localStorage.getItem("buyer");
    return storedBuyer ? JSON.parse(storedBuyer) : null;
  });

  const loginBuyer = (data) => {
    setBuyer(data);
    localStorage.setItem("buyer", JSON.stringify(data));
  };

  const logoutBuyer = () => {
    setBuyer(null);
    localStorage.removeItem("buyer");
  };

  return (
    <BuyerContext.Provider value={{ buyer, loginBuyer, logoutBuyer }}>
      {children}
    </BuyerContext.Provider>
  );
};
