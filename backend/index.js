const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Create uploads folder
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Middleware
app.use(cors({ origin: 'http://localhost:3000', methods: ['GET', 'POST'] }));
app.use('/uploads', express.static('uploads'));

// MongoDB connection
mongoose
  .connect('mongodb://127.0.0.1:27017/foodwaste')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Models
const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  password: String,
}));

const Donation = mongoose.model('Donation', new mongoose.Schema({
  donor: { type: String, default: 'Anonymous' }, // Optional, defaults to "Anonymous"
  foodDetails: String,
  quantity: Number,
  createdAt: { type: Date, default: Date.now },
  image: { type: String, default: null },
}));

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
app.post('/register', express.json(), async (req, res) => {
  const { username, password } = req.body;
  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const hashed = await bcrypt.hash(password, 10);
  await User.create({ username, password: hashed });
  res.json({ message: 'User registered' });
});

app.post('/login', express.json(), async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  res.json({ message: 'Login successful' }); // No token
});

app.post('/donate', upload.single('image'), async (req, res) => {
  const { foodDetails, quantity, donor } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!foodDetails || !quantity) {
    return res.status(400).json({ message: 'Food details and quantity are required' });
  }
  if (isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({ message: 'Quantity must be a positive number' });
  }

  try {
    const newDonation = new Donation({
      donor: donor || 'Anonymous', // Use provided donor or default
      foodDetails,
      quantity: Number(quantity),
      image,
    });
    await newDonation.save();
    res.status(200).json({ message: 'Donation recorded successfully' });
  } catch (err) {
    console.error('Donation error:', err);
    res.status(500).json({ message: 'Failed to record donation' });
  }
});

app.get('/all-donations', express.json(), async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch donations' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});