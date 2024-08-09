// ReservationsList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Reserv.css'
const Reserv = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/reservations');
        setReservations(data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
        setError('Failed to load reservations');
      }
    };
  
    fetchReservations();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reservations/${id}`);
      setReservations(reservations.filter(reservation => reservation._id !== id));
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  return (
    <section className="reservations-list">
      <h1>Reservations List</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{reservation.firstName}</td>
              <td>{reservation.lastName}</td>
              <td>{reservation.email}</td>
              <td>{reservation.phone}</td>
              <td>{reservation.date}</td>
              <td>{reservation.time}</td>
              <td>
                <button onClick={() => handleDelete(reservation._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Reserv;
