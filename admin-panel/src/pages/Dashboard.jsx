// src/pages/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <Link to="/settings">Bot Settings</Link>
      <Link to="/users">User Management</Link>
    </div>
  );
};

export default Dashboard;
