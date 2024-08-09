const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth'); // Ensure this path is correct
const User = require('../models/User');
const Order = require('../models/Order');

// Define the route and provide a callback function
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).send('User not found');

    const orders = await Order.find({ phoneNo: user.phoneNo });
    res.status(200).json({ user, orders });
  } catch (error) {
    console.error('Error fetching dashboard data:', error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
