const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const connectDB = require('./db');

// Connect to the database
connectDB();

// Create an instance of the Express application
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route handlers
app.use("/api", require('./route/CreateUser'));
app.use("/api", require("./route/DisplayData"));
app.use("/api", require("./route/Orderdata"));
app.use("/api", require("./route/Myorder"));


// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Set up the server to listen on a specific port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
