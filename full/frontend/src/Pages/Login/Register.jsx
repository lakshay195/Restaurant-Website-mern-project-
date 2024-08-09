import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Import your CSS file here
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState(''); // New state for phone number
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      // Send registration request to the server
      const response = await axios.post('http://localhost:5000/api/register', {
        name,
        email,
        password,
        phone, // Include phone number in the request
      });

      // Show success message
      toast.success('Registration successful!');

      // Navigate to login page
      setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds

      // Clear form fields
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setPhone(''); // Clear phone number field
    } catch (error) {
      // Handle specific error cases
      if (error.response) {
        // Server errors
        toast.error(error.response.data.message || 'Registration failed.');
      } else if (error.request) {
        // Network errors
        toast.error('Network error. Please try again.');
      } else {
        // Other errors
        toast.error('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
        <p>Already have an account? <a href="/login">Login here</a></p>
      </form>
    </div>
  );
};

export default Register;
