/*
  # E-Commerce Dashboard Schema

  ## Overview
  Creates the core tables for the e-commerce admin dashboard.

  ## New Tables

  ### products
  - `id` (uuid, primary key) - Unique product identifier
  - `name` (text) - Product display name
  - `description` (text) - Product description
  - `price` (numeric) - Product price in USD
  - `stock` (integer) - Available inventory count
  - `category` (text) - Product category name
  - `image_url` (text, nullable) - Optional product image URL
  - `created_at` (timestamptz) - Record creation timestamp

  ### orders
  - `id` (uuid, primary key) - Unique order identifier
  - `customer_name` (text) - Customer's full name
  - `customer_email` (text) - Customer's email address
  - `total` (numeric) - Order total in USD
  - `status` (text) - Order status: pending, processing, shipped, delivered, cancelled
  - `items_count` (integer) - Number of items in the order
  - `created_at` (timestamptz) - Order placement timestamp

  ## Security
  - RLS enabled on both tables
  - Public read access for dashboard display (no auth required for this admin tool)
  - Insert/update allowed for authenticated users only

  ## Sample Data
  - 6 sample products across various categories
  - 8 sample orders with varied statuses
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  price numeric(10, 2) NOT NULL DEFAULT 0,
  stock integer NOT NULL DEFAULT 0,
  category text NOT NULL DEFAULT '',
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL DEFAULT '',
  customer_email text NOT NULL DEFAULT '',
  total numeric(10, 2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  items_count integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view orders"
  ON orders FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Sample products
INSERT INTO products (name, description, price, stock, category, image_url) VALUES
  ('Wireless Noise-Cancelling Headphones', 'Premium over-ear headphones with 30hr battery life and active noise cancellation.', 299.99, 45, 'Electronics', 'https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('Mechanical Keyboard', 'Compact 75% layout with Cherry MX switches and RGB backlighting.', 149.99, 80, 'Electronics', 'https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('Minimalist Leather Wallet', 'Slim RFID-blocking genuine leather wallet with 8 card slots.', 49.99, 120, 'Accessories', 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('Running Sneakers Pro', 'Lightweight trail running shoes with responsive foam cushioning.', 129.99, 35, 'Footwear', 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('Stainless Steel Water Bottle', 'Double-walled 32oz insulated bottle, keeps drinks cold 24 hours.', 34.99, 200, 'Lifestyle', 'https://images.pexels.com/photos/3737601/pexels-photo-3737601.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('Portable Power Bank 20000mAh', 'Fast-charging power bank with USB-C and dual USB-A ports.', 59.99, 8, 'Electronics', 'https://images.pexels.com/photos/4219863/pexels-photo-4219863.jpeg?auto=compress&cs=tinysrgb&w=200')
ON CONFLICT DO NOTHING;

-- Sample orders
INSERT INTO orders (customer_name, customer_email, total, status, items_count, created_at) VALUES
  ('Alice Johnson', 'alice@example.com', 449.98, 'delivered', 2, now() - interval '12 days'),
  ('Bob Martinez', 'bob@example.com', 149.99, 'shipped', 1, now() - interval '8 days'),
  ('Carol Williams', 'carol@example.com', 84.98, 'processing', 2, now() - interval '5 days'),
  ('David Lee', 'david@example.com', 299.99, 'pending', 1, now() - interval '3 days'),
  ('Emma Brown', 'emma@example.com', 224.98, 'delivered', 3, now() - interval '20 days'),
  ('Frank Davis', 'frank@example.com', 59.99, 'cancelled', 1, now() - interval '15 days'),
  ('Grace Wilson', 'grace@example.com', 179.98, 'shipped', 2, now() - interval '2 days'),
  ('Henry Taylor', 'henry@example.com', 34.99, 'pending', 1, now() - interval '1 day')
ON CONFLICT DO NOTHING;
