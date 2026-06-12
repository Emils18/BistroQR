// backend/routes/orders.js

const express = require('express');
const supabase = require('../db'); // Import our initialized Supabase client
const router = express.Router();

// ROUTE: GET /api/orders
// PURPOSE: Retrieve all historical orders for the Admin view, sorted by newest first
router.get('/', async (req, res) => {
  try {
    // Queries the 'orders' table, ordering by the creation timestamp descending
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Error fetching orders:', err.message);
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
});

// ROUTE: POST /api/orders
// PURPOSE: Insert a new customer order into the database
router.post('/', async (req, res) => {
  try {
    const { items, total, payment_status, customer_name } = req.body;
    
    // Basic request body validation
    if (!items || !total) {
      return res.status(400).json({ error: 'Missing required order details' });
    }

    // Insert order metadata. items is passed directly as a JSON/JSONB array object.
    const { data, error } = await supabase
      .from('orders')
      .insert({
        items, // JSONB column mapping
        total,
        payment_status: payment_status || 'pending',
        customer_name: customer_name ? customer_name.trim() : 'Guest'
      })
      .select(); // Request inserted row back from Supabase

    if (error) throw error;
    
    // Return the newly created order's details and ID
    res.status(201).json({ success: true, id: data[0].id });
  } catch (err) {
    console.error('Error creating order:', err.message);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// ROUTE: PUT /api/orders/:id/payment
// PURPOSE: Update the payment status on a specific order
router.put('/:id/payment', async (req, res) => {
  try {
    const { id } = req.params; // Get ID from URL path parameters
    const { payment_status } = req.body; // Extract new status value from request body

    if (!payment_status) {
      return res.status(400).json({ error: 'Missing payment status parameter' });
    }

    // Update table row matching the specific order ID
    const { error } = await supabase
      .from('orders')
      .update({ payment_status })
      .eq('id', id);

    if (error) throw error;
    res.json({ success: true, message: 'Payment status updated' });
  } catch (err) {
    console.error('Error updating payment status:', err.message);
    res.status(500).json({ error: 'Failed to update payment status' });
  }
});

module.exports = router;