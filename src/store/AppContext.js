import React, { createContext, useState, useMemo, useContext } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [carCount, setCarCount] = useState(0);

  const value = useMemo(() => {
    const v = { carCount, setCarCount };
    return v;
  }, [carCount]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppStore() {
  return useContext(AppContext);
}
