import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Order1.css'; // Import your CSS file here

const Order1 = () => {
    const [customerName, setCustomerName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [deliveryOption, setDeliveryOption] = useState('takeaway');
    const [address, setAddress] = useState('');
    const [totalAmount, setTotalAmount] = useState('0.00');
    const [showAddress, setShowAddress] = useState(false);

    useEffect(() => {
        const getTotalAmount = () => {
            let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
            let totalAmount = cartItems.reduce((total, item) => total + item.price, 0);
            return totalAmount.toFixed(2);
        };

        // Update total amount
        setTotalAmount(getTotalAmount());
    }, []); // Empty dependency array ensures this runs once on component mount

    const handleDeliveryOptionChange = (event) => {
        setDeliveryOption(event.target.value);
        setShowAddress(event.target.value === 'delivery');
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Basic form validation
        if (customerName === '' || phoneNumber === '') {
            alert('Please fill in all required fields.');
            return;
        }

        // Store data in sessionStorage
        sessionStorage.setItem('customerName', customerName);
        sessionStorage.setItem('phoneNumber', phoneNumber);
        sessionStorage.setItem('deliveryOption', deliveryOption);
        if (deliveryOption === 'delivery') {
            sessionStorage.setItem('address', address);
        } else {
            sessionStorage.removeItem('address'); // Clear address if takeaway
        }

        // Redirect to confirmation page
        window.location.href = 'ordercon';
    };

    return (
        <div>
            <Header />
            <div className='container'>
                <div className="order-container">
                    <h2>Place Your Order</h2>

                    <form id="orderForm" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="customerName">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="customerName"
                                placeholder="Enter your name"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phoneNumber"
                                placeholder="Enter your phone number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="toggle-label">Delivery or Takeaway?</label>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="deliveryOption"
                                    id="takeawayOption"
                                    value="takeaway"
                                    checked={deliveryOption === 'takeaway'}
                                    onChange={handleDeliveryOptionChange}
                                />
                                <label className="form-check-label" htmlFor="takeawayOption">Takeaway</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="deliveryOption"
                                    id="deliveryOption"
                                    value="delivery"
                                    checked={deliveryOption === 'delivery'}
                                    onChange={handleDeliveryOptionChange}
                                />
                                <label className="form-check-label" htmlFor="deliveryOption">Delivery</label>
                            </div>
                        </div>

                        {showAddress && (
                            <div id="deliveryAddress">
                                <div className="form-group">
                                    <label htmlFor="address">Delivery Address</label>
                                    <textarea
                                        className="form-control"
                                        id="address"
                                        rows="3"
                                        placeholder="Enter your delivery address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="qr-code">
                            <h3>Scan QR Code for Payment</h3>
                            <img src="https://th.bing.com/th?id=OIP.YKaU-qUsn-vYZHMzBTjO5wHaHa&w=249&h=249&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" alt="QR Code for Payment" />
                        </div>

                        <div className="total-amount" id="totalAmountDisplay">
                            Total Amount: <span>${totalAmount}</span>
                        </div>

                        <button type="submit" className="btn btn-primary confirm-btn">Confirm Order</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Order1;
