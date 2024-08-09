// models/Reservation.js
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true }
});

module.exports = mongoose.model('Reservation', reservationSchema);
