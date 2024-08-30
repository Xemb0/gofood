const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173', // Allow requests from this origin
}));

// Connect to the database
connectDB();

// Define routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/foods', require('./routes/FoodRoutes'));  // Ensure this matches your file name and path
// Use the cart routes
// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error", error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
