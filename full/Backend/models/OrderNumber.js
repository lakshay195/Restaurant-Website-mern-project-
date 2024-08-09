const mongoose = require('mongoose');

const orderNumberSchema = new mongoose.Schema({
  currentNumber: { type: Number, default: 1 }
});

module.exports = mongoose.model('OrderNumber', orderNumberSchema);
