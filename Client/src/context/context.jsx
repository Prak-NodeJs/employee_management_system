import React, { createContext, useState, useEffect } from 'react';

export const storeContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const storedData = localStorage.getItem('authData');
    return storedData ? JSON.parse(storedData) : null;
  });

  useEffect(() => {
    if (authData) {
      localStorage.setItem('authData', JSON.stringify(authData));
    } else {
      localStorage.removeItem('authData');
    }
  }, [authData]);

  return (
    <storeContext.Provider value={{ authData, setAuthData }}>
      {children}
    </storeContext.Provider>
  );
};
