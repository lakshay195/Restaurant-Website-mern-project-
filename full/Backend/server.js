const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Order = require('./models/Order');
const Reservation = require('./models/Reservation'); // Import Reservation model

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your_jwt_secret_key'; // Change this to a secure secret in production

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Adjust this as needed
  methods: ['GET', 'POST', 'PATCH', 'OPTIONS', 'DELETE'], // Ensure PATCH is included
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('your connecting string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// POST route for reservations
app.post('/api/reservations', async (req, res) => {
  const { firstName, lastName, email, phone, date, time } = req.body;

  if (!firstName || !lastName || !email || !phone || !date || !time) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newReservation = new Reservation({ firstName, lastName, email, phone, date, time });
    await newReservation.save();
    res.status(200).json({ message: 'Reservation successful', reservation: newReservation });
  } catch (error) {
    console.error('Error saving reservation:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET route to fetch all reservations
app.get('/api/reservations', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// User registration
app.post('/api/register', async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, phone: phone || '' });
    await newUser.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// User login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Fetch users (Admin only)
app.get('/api/users', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const users = await User.find().select('name email phone role -_id');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get next order number
app.get('/api/next-order-number', async (req, res) => {
  try {
    const latestOrder = await Order.findOne().sort({ orderNo: -1 }).exec();
    let nextOrderNumber = '001';
    if (latestOrder) {
      const lastOrderNumber = parseInt(latestOrder.orderNo.replace(/^#/, ''));
      nextOrderNumber = (lastOrderNumber + 1).toString().padStart(3, '0');
    }
    res.json({ orderNumber: nextOrderNumber });
  } catch (error) {
    console.error('Error fetching next order number:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create a new order
app.post('/api/orders', async (req, res) => {
  try {
    const { orderNo, customerName, phoneNo, address, orderDate, orderType, cartItems, totalPrice } = req.body;

    const order = new Order({ orderNo, customerName, phoneNo, address, orderDate, orderType, cartItems, totalPrice });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(400).json({ message: 'Bad Request', error: error.message });
  }
});

// Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Update order status
app.patch('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pending', 'Processing', 'Confirmed', 'Cancelled', 'Delivered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Error updating order status' });
  }
});

// Route to get user dashboard data
app.get('/api/dashboard', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch orders and reservations for the user
    const orders = await Order.find({ phoneNo: user.phone });
    const reservations = await Reservation.find({ phone: user.phone });

    res.json({
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      orders,
      reservations,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
