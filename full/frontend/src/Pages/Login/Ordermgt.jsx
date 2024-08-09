import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Ord.css'; // Import your CSS file if needed

const Ordermgt = () => {
  const [orders, setOrders] = useState([]); // Ensure initial state is an array
  const [error, setError] = useState('');

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:5000/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Fetched orders:', data); // Debugging line
        setOrders(data);
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching orders');
      }
    };

    fetchOrders();
  }, []);

  // Handle status change
  const changeStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:5000/api/orders/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Update local state
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      setError(error.response?.data?.message || 'Error updating order status');
    }
  };

  return (
    <div className="order-management">
      <h1>Order Management</h1>
      {error && <p className="error-message">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Order No</th>
            <th>Customer Name</th>
            <th>Phone No</th>
            <th>Address</th>
            <th>Order Date</th>
            <th>Order Type</th>
            <th>Cart Items</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map(order => (
              <tr key={order._id}>
                <td>{order.orderNo || 'N/A'}</td>
                <td>{order.customerName || 'N/A'}</td>
                <td>{order.phoneNo || 'N/A'}</td>
                <td>{order.address || 'N/A'}</td>
                <td>{order.orderDate ? new Date(order.orderDate).toLocaleDateString() : 'N/A'}</td>
                <td>{order.orderType || 'N/A'}</td>
                <td>
                  {order.cartItems && order.cartItems.length > 0 ? (
                    <ul>
                      {order.cartItems.map((item, index) => (
                        <li key={index}>{item.name} - ${item.price.toFixed(2)}</li>
                      ))}
                    </ul>
                  ) : (
                    'No items'
                  )}
                </td>
                <td>{order.totalPrice ? `$${order.totalPrice.toFixed(2)}` : 'N/A'}</td>
                <td>{order.status || 'N/A'}</td>
                <td>
                  {order.status !== 'Confirmed' && (
                    <button onClick={() => changeStatus(order._id, 'Confirmed')}>Confirm</button>
                  )}
                  {order.status !== 'Processing' && (
                    <button onClick={() => changeStatus(order._id, 'Processing')}>Process</button>
                  )}
                  {order.status !== 'Cancelled' && (
                    <button onClick={() => changeStatus(order._id, 'Cancelled')}>Cancel</button>
                  )}
                  {order.status !== 'Delivered' && (
                    <button onClick={() => changeStatus(order._id, 'Delivered')}>Deliver</button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No orders available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Ordermgt;
