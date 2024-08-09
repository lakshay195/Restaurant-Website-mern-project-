// UserDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserDashboard.css';

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token'); // Adjust token retrieval based on your implementation
        const response = await axios.get('http://localhost:5000/api/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(response.data);
      } catch (err) {
        setError('Failed to fetch dashboard data.');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!userData) return <p>No user data found</p>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>User Dashboard</h1>
        <button className="return-home-button" onClick={() => window.location.href = '/'}>
          Return Home
        </button>
      </div>

      <div className="user-info">
        <h2>User Information</h2>
        <p><strong>Name:</strong> {userData.user.name}</p>
        <p><strong>Email:</strong> {userData.user.email}</p>
        <p><strong>Phone:</strong> {userData.user.phone}</p>
      </div>

      <div className="dashboard-sections">
        <div className="section orders">
          <h2>Orders</h2>
          {userData.orders.length > 0 ? (
            userData.orders.map(order => (
              <div key={order._id} className="order">
                <p><strong>Order Number:</strong> {order.orderNo}</p>
                <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
                <h4>Items:</h4>
                <ul>
                  {order.cartItems.map((item, index) => (
                    <li key={index}>
                      {item.name} - ${item.price.toFixed(2)} (x{item.quantity})
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </div>

        <div className="section reservations">
          <h2>Reservations</h2>
          {userData.reservations.length > 0 ? (
            userData.reservations.map(reservation => (
              <div key={reservation._id} className="reservation">
                <p><strong>Reservation Date:</strong> {new Date(reservation.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {reservation.time}</p>
                <p><strong>Name:</strong> {reservation.firstName} {reservation.lastName}</p>
                <p><strong>Email:</strong> {reservation.email}</p>
                <p><strong>Phone:</strong> {reservation.phone}</p>
              </div>
            ))
          ) : (
            <p>No reservations found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
