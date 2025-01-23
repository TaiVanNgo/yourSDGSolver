import { createContext, useContext, useState } from "react";

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [id, setId] = useState(null);
  const [role, setRole] = useState(null);

  return (
    <RoleContext.Provider value={{ role, setRole, id, setId }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
