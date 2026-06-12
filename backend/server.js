// backend/server.js

// Import required native and third-party dependencies
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Loads environment variables from the .env file

// Import custom routing modules
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');

// Instantiate the Express application
const app = express();

// Define the local or production port
const PORT = process.env.PORT || 5000;

// Configure Cross-Origin Resource Sharing (CORS) middleware dynamically.
// Setting 'origin: true' mirrors the requesting origin, completely preventing CORS block errors
// across localhost and any Vercel domain names you use.
app.use(cors({
  origin: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Express built-in middleware to parse incoming JSON payloads in request bodies
app.use(express.json());

// Mount router modules to respective API paths
app.use('/api/products', productsRoutes); // Handles product menu item requests
app.use('/api/orders', ordersRoutes); // Handles order checkout and payment updates

// Simple health-check endpoint to verify server status
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Start the Express server on the specified port
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});