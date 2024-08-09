import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Ordercon.css';

const Ordercon = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [orderType, setOrderType] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderSubmitted, setOrderSubmitted] = useState(false); // Track order submission status

  // Fetch next order number on component mount
  useEffect(() => {
    const fetchOrderNumber = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/next-order-number');
        setOrderNumber('#' + response.data.orderNumber);
      } catch (error) {
        console.error('Error fetching order number:', error);
        setOrderNumber('Error fetching order number');
      }
    };

    fetchOrderNumber();
  }, []);

  // Set data from session storage and calculate total price
  useEffect(() => {
    const name = sessionStorage.getItem('customerName');
    const phone = sessionStorage.getItem('phoneNumber');
    const address = sessionStorage.getItem('address');
    const deliveryOption = sessionStorage.getItem('deliveryOption');
    const items = JSON.parse(sessionStorage.getItem('cartItems')) || [];

    setCustomerName(name);
    setPhoneNumber(phone);
    setAddress(address);
    setCartItems(items);

    setOrderType(deliveryOption === 'delivery' ? 'Delivery' : 'Takeaway');

    const price = items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
    setTotalPrice(price);
  }, []);

  // Submit order if all details are provided and not already submitted
  useEffect(() => {
    if (orderNumber && !orderSubmitted) {
      const submitOrder = async () => {
        try {
          const orderData = {
            orderNo: orderNumber,
            customerName,
            phoneNo: phoneNumber,
            address,
            orderDate: new Date().toISOString(), // Ensure correct date format
            orderType,
            status: 'Pending',
            cartItems: cartItems.map(item => ({
              name: item.name,
              price: item.price,
              quantity: item.quantity || 1 // Ensure quantity is provided
            })),
            totalPrice
          };

          await axios.post('http://localhost:5000/api/orders', orderData);
          setOrderSubmitted(true);
        } catch (error) {
          console.error('Error submitting order:', error.response?.data || error.message);
        }
      };

      submitOrder();
    }
  }, [orderNumber, customerName, phoneNumber, address, orderType, cartItems, totalPrice, orderSubmitted]);

  return (
    <div className="container">
      <h1>Order Confirmation</h1>
      <div className="order-info">
        <h3>Order Information</h3>
        <p><strong>Order Number:</strong> {orderNumber}</p>
        <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
        <p><strong>Name:</strong> {customerName}</p>
        <p><strong>Phone Number:</strong> {phoneNumber}</p>
        <p><strong>Order Type:</strong> {orderType}</p>
        {orderType === 'Delivery' && (
          <p><strong>Delivery Address:</strong> {address}</p>
        )}
      </div>

      <div className="cart-summary">
        <h3>Cart Items</h3>
        <div id="cartItems">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              {item.name} - ${item.price?.toFixed(2) || '0.00'} (x{item.quantity || 1})
            </div>
          ))}
        </div>
      </div>

      <div className="total-price">
        <h3>Total</h3>
        <p>${totalPrice.toFixed(2)}</p>
      </div>

      <div className="buttons">
        <button className="btn btn-primary print-btn" onClick={() => window.print()}>Print Bill</button>
        <a href="/" className="btn btn-primary">Return</a>
      </div>

      {orderSubmitted && <p>Order placed successfully!</p>}
    </div>
  );
};

export default Ordercon;
