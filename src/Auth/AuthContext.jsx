import { createContext, useState, useEffect } from "react";
import * as cognito from '../cognito.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    async function initialUser() {
      const result = await cognito.getCurrentUser();
      setUser(result);
    }
    initialUser();
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};