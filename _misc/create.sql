---------------------------------------------------------------------
-- MODELING USERS
---------------------------------------------------------------------

-- User id returned by Auth0
-- Other fields we can retrieve from Auth0: https://auth0.com/docs/customize/rules/user-object-in-rules
CREATE TABLE 'user' (
  'user_id' TEXT PRIMARY KEY,
  'admin' BOOLEAN NOT NULL DEFAULT FALSE
);

-- Stripe handles verification of business, so we simply need to store the
-- id returned by Stripe
CREATE TABLE 'seller' (
  'user_id' TEXT PRIMARY KEY REFERENCES 'user' ('user_id'),
  'stripe_id' TEXT UNIQUE,
  'company_name' TEXT NOT NULL,
  'address' TEXT NOT NULL,
  'office_number' TEXT,
  'acra_uen' TEXT NOT NULL UNIQUE,
  'first_name' TEXT NOT NULL,
  'last_name' TEXT NOT NULL,
  'verified' BOOLEAN NOT NULL DEFAULT FALSE
);

---------------------------------------------------------------------
-- MODELING PRODUCTS
---------------------------------------------------------------------

CREATE TABLE 'brand' (
  'brand_id' INTEGER SERIAL PRIMARY KEY,
  'brand_name' TEXT NOT NULL UNIQUE,
  'active' BOOLEAN NOT NULL DEFAULT TRUE
);

-- A product category can have a parent category
-- (e.g. Men's apparel -> T-shirts)
CREATE TABLE 'category' (
  'category_id' INTEGER SERIAL PRIMARY KEY,
  'parent_category_id' INTEGER REFERENCES 'category' ('category_id'),
  'category_name' TEXT NOT NULL,
  'image_url'
  'active' BOOLEAN NOT NULL DEFAULT TRUE
);

-- Products can be active, archived, or removed
CREATE TABLE 'product_status' (
  'product_status_id' INTEGER SERIAL PRIMARY KEY,
  'product_status_name' TEXT NOT NULL UNIQUE
);

INSERT INTO 'product_status' ('product_status_name') VALUES
  ('ACTIVE'),
  ('ARCHIVED'),
  ('REMOVED');

-- References a seller, brand, and status, note that status
-- has no default, should be indicated by seller if it should
-- be listed immediately
CREATE TABLE 'product' (
  'product_id' INTEGER SERIAL PRIMARY KEY,
  'seller_id' TEXT NOT NULL REFERENCES 'seller' ('user_id'),
  'brand_id' TEXT NOT NULL REFERENCES 'brand' ('brand_id'),
  'product_status' INTEGER NOT NULL REFERENCES 'product_status' ('product_status_id'),
  'product_name' TEXT NOT NULL,
  'ind_usual_retail_price' INTEGER NOT NULL CHECK ('ind_usual_retail_price' > 0),
  'ind_current_price' INTEGER NOT NULL CHECK ('ind_current_price' > 0),
  'number_in_stock' INTEGER NOT NULL CHECK ('number_in_stock' > 0),
  'description' TEXT
);

-- Each product can have multiple specification documents
CREATE TABLE 'product_specification' (
  'product_specification_id' INTEGER SERIAL PRIMARY KEY,
  'product_id' INTEGER NOT NULL REFERENCES 'product' ('product_id'),
  'url' TEXT NOT NULL
);

-- Each product can have multiple images
CREATE TABLE 'product_image' (
  'product_image_id' INTEGER SERIAL PRIMARY KEY,
  'product_id' INTEGER NOT NULL REFERENCES 'product' ('product_id'),
  'url' TEXT NOT NULL
);

-- [INTERMEDIARY] Each product can have multiple categories,
-- just as each category can have multiple products
CREATE TABLE 'products_categories' (
  'product_id' INTEGER REFERENCES 'product' ('product_id'),
  'category_id' INTEGER REFERENCES 'category' ('category_id'),
  PRIMARY KEY ("product_id", "category_id")
);

---------------------------------------------------------------------
-- MODELING ORDERS
---------------------------------------------------------------------

-- Orders are either pending payment, payment received (upon which merchant
-- must be notified to ship items), completed, or canceled
CREATE TABLE 'order_status' (
  'order_status_id' INTEGER SERIAL PRIMARY KEY,
  'order_status_name' TEXT NOT NULL UNIQUE
);

INSERT INTO 'order_status' ('order_status_name') VALUES
  ('PAYMENT_PENDING'),
  ('PAYMENT_RECEIVED'),
  ('COMPLETED'),
  ('CANCELED');

-- Order table, with default status being payment pending
CREATE TABLE 'order' (
  'order_id' INTEGER SERIAL PRIMARY KEY,
  'order_status_id' INTEGER NOT NULL REFERENCES 'order_status' ('order_status_id') DEFAULT 1,
  'shipping_address' TEXT NOT NULL
);

-- Each product in an order can be pending confirmation,
-- accepted, shipped, completed (payment received), or rejected
CREATE TABLE 'orders_products_status' (
  'orders_products_status_id' INTEGER SERIAL PRIMARY KEY,
  'orders_products_status_name' TEXT NOT NULL UNIQUE
);

INSERT INTO 'orders_products_status' ('orders_products_status_name') VALUES
  ('CONFIRMATION_PENDING'),
  ('ACCEPTED'),
  ('SHIPPED'),
  ('COMPLETED'),
  ('REJECTED');

-- [INTERMEDIARY] Each order can contain multiple products,
-- just as each product can belong to multiple orders,
-- furthermore, the status of the product and details are tracked,
-- price should be locked in once the order is submitted
CREATE TABLE 'orders_products' (
  'order_id' INTEGER REFERENCES 'order' ('order_id'),
  'product_id' INTEGER REFERENCES 'product' ('product_id'),
  PRIMARY KEY ("order_id", "product_id"),
  'orders_products_status_id' INTEGER NOT NULL REFERENCES 'orders_products_status' ('orders_products_status_id') DEFAULT 1,
  'product_amount' INTEGER NOT NULL CHECK ('product_amount' > 0),
  'total_price' INTEGER NOT NULL CHECK ('price' > 0)
);

---------------------------------------------------------------------
-- MODELING THE CART
---------------------------------------------------------------------

-- A product in a user's cart is either present, ordered, or removed
CREATE TABLE 'cart_product_status' (
  'cart_product_status_id' INTEGER SERIAL PRIMARY KEY,
  'cart_product_status_name' TEXT NOT NULL UNIQUE
);

INSERT INTO 'cart_product_status' ('cart_product_status_name') VALUES
  ('PRESENT'),
  ('ORDERED'),
  ('REMOVED');

-- A user's cart can contain multiple products
CREATE TABLE 'cart_product' (
  'user_id' TEXT PRIMARY KEY REFERENCES 'user' ('user_id'),
  'product_id' INTEGER NOT NULL REFERENCES 'product' ('product_id'),
  'cart_product_status_id' INTEGER NOT NULL REFERENCES 'cart_product_status' ('cart_product_status_id') DEFAULT 1,
  'product_amount' INTEGER NOT NULL CHECK ('product_amount' > 0)
);
