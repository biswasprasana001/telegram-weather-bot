// src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { access_token } = tokenResponse;
      const response = await axios.post("/api/auth/google", {
        token: access_token,
      });
      setUser(response.data.user);
      localStorage.setItem("jwtToken", response.data.token);
    },
  });

  const logout = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem("jwtToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
