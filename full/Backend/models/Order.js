
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNo: { type: String, required: true },
  customerName: { type: String, required: true },
  phoneNo: { type: String, required: true },
  address: { type: String, required: true },
  orderDate: { type: Date, default: Date.now },
  orderType: { type: String, required: true },
  cartItems: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, default: 1 }
    }
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Processing', 'Confirmed', 'Cancelled', 'Delivered'] }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;