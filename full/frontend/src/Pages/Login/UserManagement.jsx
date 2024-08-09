import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserManagement.css'; // Import your CSS file here

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        const { data } = await axios.get('http://localhost:5000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Data:', data);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.response?.data?.message || 'Error fetching users');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-management">
      <h1>User Management</h1>
      {error && <p className="error-message">{error}</p>}
      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserManagement;
