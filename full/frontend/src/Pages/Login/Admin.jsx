import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Admin.css'; // Import your CSS file here

const Admin = () => {
  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h1>Admin Dashboard</h1>
        <nav>
          <ul>
            <li><Link to="users">User Management</Link></li>
            <li><Link to="orders">Order Management</Link></li>
            <li><Link to="reserv">Reservation Management</Link></li>
            
          </ul>
        </nav>
      </aside>
      <div className="main-content">
        <header className="header">
          <h1>Welcome, Admin</h1>
        </header>
        <div className="content">
          <Outlet /> {/* Render nested routes here */}
        </div>
      </div>
    </div>
  );
};

export default Admin;
