// backend/routes/products.js

const express = require('express');
const supabase = require('../db'); // Import our initialized Supabase client
const router = express.Router();

// ROUTE: GET /api/products
// PURPOSE: Fetch all food products from your Supabase 'products' table
router.get('/', async (req, res) => {
  try {
    // Perform a select query on the 'products' table, ordering items by ID
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true });
      
    // If Supabase returns an error, catch it immediately
    if (error) throw error;
    
    // Send retrieved items to the client with a 200 OK status
    res.json(data);
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

module.exports = router;