// src/pages/Login.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();

  return (
    <div className="login">
      <h2>Admin Panel Login</h2>
      <button onClick={login}>Login with Google</button>
    </div>
  );
};

export default Login;
