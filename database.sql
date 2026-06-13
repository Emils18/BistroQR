-- database.sql

-- 1. Create products table with basic information if it does not exist
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    category VARCHAR(50)
);

-- 2. Create orders table with customer details and jsonb items array if it does not exist
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    items JSONB NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'pending',
    customer_name VARCHAR(100) DEFAULT 'Guest',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 3. Enable Row Level Security (RLS) on both tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 4. Clean up any existing policies with the same names to prevent ERROR 42710
DROP POLICY IF EXISTS "Allow public read access to products" ON products;
DROP POLICY IF EXISTS "Allow public read access to orders" ON orders;
DROP POLICY IF EXISTS "Allow public write access to orders" ON orders;
DROP POLICY IF EXISTS "Allow public update access to orders" ON orders;

-- 5. Re-create the security policies safely
CREATE POLICY "Allow public read access to products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read access to orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Allow public write access to orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access to orders" ON orders FOR UPDATE USING (true);

-- 6. Insert/refresh sample products representing menu options
-- TRUNCATE empties the table and resets the auto-increment counter safely
TRUNCATE TABLE products RESTART IDENTITY CASCADE;

INSERT INTO products (name, price, description, category) VALUES
('Adobo Manok', 8.99, 'Classic Filipino dish simmered in soy sauce, vinegar, garlic, and bay leaves.', 'Chicken'),
('Spaghetti Bolognese', 10.99, 'Tender pasta in a rich, sweet tomato sauce with savory minced beef.', 'Spaghetti'),
('Crispy Fried Chicken', 6.49, 'Golden, extra crunchy drumstick served with house gravy.', 'Chicken'),
('Double Cheeseburger', 9.49, 'Two grilled beef patties with melted cheddar, pickles, and house sauce.', 'Burger'),
('Golden French Fries', 3.49, 'Crispy, hand-cut salted potatoes served with garlic aioli.', 'Sides'),
('Ice Cold Coca-Cola', 2.29, 'Classic carbonated soft drink served over ice.', 'Beverages');