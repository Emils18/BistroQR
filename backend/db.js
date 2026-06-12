// backend/db.js

// Import the official Supabase Client module
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); // Ensure variables are loaded

// Extract the URL and Public Anon Key from the environment file
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Check if credentials are present in the env setup
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('CRITICAL: Missing Supabase environment variables in backend/.env');
}

// Create and export a single, reusable Supabase client instance to query tables
const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = supabase;