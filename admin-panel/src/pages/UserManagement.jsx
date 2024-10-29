// src/pages/UserManagement.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/admin/users").then((response) => setUsers(response.data));
  }, []);

  const blockUser = async (id) => {
    await axios.patch(`/api/admin/users/${id}/block`);
    alert("User blocked");
  };

  const deleteUser = async (id) => {
    await axios.delete(`/api/admin/users/${id}`);
    alert("User deleted");
    setUsers(users.filter((user) => user._id !== id));
  };

  return (
    <div>
      <h2>User Management</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.email}
            <button onClick={() => blockUser(user._id)}>Block</button>
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
