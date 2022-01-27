DO $$ DECLARE
  r RECORD;
BEGIN
  FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
    EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
  END LOOP;
END $$;

-- Note: executing via Hasura console, this trigger already exists

-- CREATE FUNCTION trigger_set_timestamp()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   NEW.updated_at = now();
--   RETURN NEW;
-- END;
-- $$ language plpgsql;

---------------------------------------------------------------------
-- MODELING USERS
---------------------------------------------------------------------

-- User id returned by Auth0
-- Other fields we can retrieve from Auth0: https://auth0.com/docs/customize/rules/user-object-in-rules
CREATE TABLE "user" (
  user_id TEXT PRIMARY KEY,
  email TEXT,
  admin BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TRIGGER set_timestamp BEFORE UPDATE ON "user"
  FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

-- Stripe handles verification of business, but we store these
-- fields since we can't retrieve them from Stripe
CREATE TABLE "seller" (
  user_id TEXT PRIMARY KEY REFERENCES "user" (user_id),
  stripe_id TEXT UNIQUE,
  company_name TEXT NOT NULL,
  address TEXT NOT NULL,
  office_number TEXT,
  acra_uen TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  flat_shipping_fee INTEGER CHECK (flat_shipping_fee >= 0),
  product_total_free_delivery INTEGER CHECK (product_total_free_delivery >= 0),
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TRIGGER set_timestamp BEFORE UPDATE ON "seller"
  FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

---------------------------------------------------------------------
-- MODELING PRODUCTS
---------------------------------------------------------------------

CREATE TABLE "brand" (
  brand_id SERIAL PRIMARY KEY,
  brand_name TEXT NOT NULL UNIQUE,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TRIGGER set_timestamp BEFORE UPDATE ON "brand"
  FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

-- A product category can have a parent category
-- (e.g. Mens apparel -> T-shirts)
CREATE TABLE "category" (
  category_id SERIAL PRIMARY KEY,
  parent_category_id INTEGER REFERENCES "category" (category_id),
  category_name TEXT NOT NULL,
  image_url TEXT,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TRIGGER set_timestamp BEFORE UPDATE ON "category"
  FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

-- Products can be active, archived, or removed
CREATE TABLE "product_status" (
  product_status_id SERIAL PRIMARY KEY,
  product_status_name TEXT NOT NULL UNIQUE,
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TRIGGER set_timestamp BEFORE UPDATE ON "product_status"
  FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

INSERT INTO product_status (product_status_name) VALUES
  ('ACTIVE'),
  ('ARCHIVED'),
  ('REMOVED');

-- References a seller, brand, and status, note that status
-- has no default, should be indicated by seller if it should
-- be listed immediately
CREATE TABLE "product" (
  product_id SERIAL PRIMARY KEY,
  seller_id TEXT NOT NULL REFERENCES "seller" (user_id),
  brand_id INTEGER NOT NULL REFERENCES "brand" (brand_id),
  product_status INTEGER NOT NULL REFERENCES "product_status" (product_status_id),
  product_name TEXT NOT NULL,
  ind_usual_retail_price INTEGER NOT NULL CHECK (ind_usual_retail_price > 0),
  ind_current_price INTEGER NOT NULL CHECK (ind_current_price > 0),
  number_in_stock INTEGER NOT NULL CHECK (number_in_stock > 0),
  description TEXT,
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TRIGGER set_timestamp BEFORE UPDATE ON "product"
  FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

-- Each product can have multiple specification documents
CREATE TABLE "product_specification" (
  product_specification_id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES "product" (product_id),
  url TEXT NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TRIGGER set_timestamp BEFORE UPDATE ON "product_specification"
  FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

-- Each product can have multiple images
CREATE TABLE "product_image" (
  product_image_id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES "product" (product_id),
  url TEXT NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TRIGGER set_timestamp BEFORE UPDATE ON "product_image"
  FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

-- [INTERMEDIARY] Each product can have multiple categories,
-- just as each category can have multiple products
CREATE TABLE "products_categories" (
  product_id INTEGER REFERENCES "product" (product_id),
  category_id INTEGER REFERENCES "category" (category_id),
  PRIMARY KEY (product_id, category_id),
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TRIGGER set_timestamp BEFORE UPDATE ON "products_categories"
  FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TABLE "variation_category" (
  variation_category_id SERIAL PRIMARY KEY,
  variation_category_name TEXT NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TRIGGER set_timestamp BEFORE UPDATE ON "variation_category"
  FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TABLE "variation" (
  variation_id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES "product" (product_id),
  variation_category_id INTEGER NOT NULL REFERENCES "variation_category" (variation_category_id),
  variation_name TEXT NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TRIGGER set_timestamp BEFORE UPDATE ON "variation"
  FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

---------------------------------------------------------------------
-- MODELING ORDERS
---------------------------------------------------------------------

-- Orders are either pending payment, payment received (upon which merchant
-- must be notified to ship items), completed, or canceled
CREATE TABLE "order_status" (
  order_status_id SERIAL PRIMARY KEY,
  order_status_name TEXT NOT NULL UNIQUE,
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TRIGGER set_timestamp BEFORE UPDATE ON "order_status"
  FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

INSERT INTO order_status (order_status_name) VALUES
  ('PAYMENT_PENDING'),
  ('PAYMENT_RECEIVED'),
  ('COMPLETED'),
  ('CANCELED');

-- Order table, with default status being payment pending
-- Each order is instantiated by a Stripe checkout session,
-- which will have a unique checkout id, a charge on the
-- checkout can then be transfered to any number of connected
-- accounts
CREATE TABLE "order" (
  order_id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES "user" (user_id),
  order_status_id INTEGER NOT NULL REFERENCES "order_status" (order_status_id) DEFAULT 1,
  shipping_address TEXT NOT NULL,
  stripe_checkout_id TEXT UNIQUE,
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TRIGGER set_timestamp BEFORE UPDATE ON "order"
  FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

-- Each product in an order can be pending confirmation,
-- accepted, or rejected
CREATE TABLE "orders_products_status" (
  orders_products_status_id SERIAL PRIMARY KEY,
  orders_products_status_name TEXT NOT NULL UNIQUE,
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TRIGGER set_timestamp BEFORE UPDATE ON "orders_products_status"
  FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

INSERT INTO orders_products_status (orders_products_status_name) VALUES
  ('CONFIRMATION_PENDING'),
  ('ACCEPTED'),
  ('REJECTED');

-- [INTERMEDIARY] Each order can contain multiple products,
-- just as each product can belong to multiple orders,
-- furthermore, the status of the product and details are tracked,
-- price should be locked in once the order is submitted
CREATE TABLE "orders_products" (
  order_id INTEGER REFERENCES "order" (order_id),
  product_id INTEGER REFERENCES "product" (product_id),
  PRIMARY KEY (order_id, product_id),
  orders_products_status_id INTEGER NOT NULL REFERENCES "orders_products_status" (orders_products_status_id) DEFAULT 1,
  product_amount INTEGER NOT NULL CHECK (product_amount > 0),
  total_price INTEGER NOT NULL CHECK (total_price > 0),
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TRIGGER set_timestamp BEFORE UPDATE ON "orders_products"
  FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

-- Each sellers portion of an order can be pending confirmation
-- for each of the orders products, accepted, meaning all products
-- are accounted for and at least one is accepted, shipped, completed
-- or rejected if all products are rejected
CREATE TABLE "orders_sellers_status" (
  orders_sellers_status_id SERIAL PRIMARY KEY,
  orders_sellers_status_name TEXT NOT NULL UNIQUE,
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TRIGGER set_timestamp BEFORE UPDATE ON "orders_sellers_status"
  FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

INSERT INTO orders_sellers_status (orders_sellers_status_name) VALUES
  ('CONFIRMATION_PENDING'),
  ('ACCEPTED'),
  ('SHIPPED'),
  ('COMPLETED'),
  ('REJECTED');

-- [INTERMEDIARY] Each order can contain multiple sellers,
-- just as each seller can part of multiple orders,
-- tracks each seller for a given order, where the delivery fee
-- is locked in at time of placing order, once a checkout sessions
-- charge succeeds and the order is completed, the charge id can be
-- extracted and used to create the related transfers to sellers
CREATE TABLE "orders_sellers" (
  order_id INTEGER REFERENCES "order" (order_id),
  user_id TEXT REFERENCES "seller" (user_id),
  PRIMARY KEY (order_id, user_id),
  orders_sellers_status_id INTEGER NOT NULL REFERENCES "orders_sellers_status" (orders_sellers_status_id) DEFAULT 1,
  delivery_fee INTEGER NOT NULL CHECK (delivery_fee >= 0),
  stripe_transfer_id TEXT UNIQUE,
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TRIGGER set_timestamp BEFORE UPDATE ON "orders_sellers"
  FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

---------------------------------------------------------------------
-- MODELING THE CART
---------------------------------------------------------------------

-- A product in a users cart is either present, ordered, or removed
CREATE TABLE "cart_product_status" (
  cart_product_status_id SERIAL PRIMARY KEY,
  cart_product_status_name TEXT NOT NULL UNIQUE,
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TRIGGER set_timestamp BEFORE UPDATE ON "cart_product_status"
  FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

INSERT INTO cart_product_status (cart_product_status_name) VALUES
  ('PRESENT'),
  ('ORDERED'),
  ('REMOVED');

-- A users cart can contain multiple products
CREATE TABLE "cart_product" (
  user_id TEXT PRIMARY KEY REFERENCES "user" (user_id),
  product_id INTEGER NOT NULL REFERENCES "product" (product_id),
  cart_product_status_id INTEGER NOT NULL REFERENCES "cart_product_status" (cart_product_status_id) DEFAULT 1,
  product_amount INTEGER NOT NULL CHECK (product_amount > 0),
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TRIGGER set_timestamp BEFORE UPDATE ON "cart_product"
  FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

---------------------------------------------------------------------
-- Predefined categories
---------------------------------------------------------------------

INSERT INTO category (parent_category_id,category_name,image_url) VALUES (NULL,'Home & Garden','https://recoverly-images.s3.ap-southeast-1.amazonaws.com/category-image-household-living.png');
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (NULL,'Consumer Electronics','https://recoverly-images.s3.ap-southeast-1.amazonaws.com/category-image-consumer-electronics.png');
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (NULL,'Commercial & Industrial Products','https://recoverly-images.s3.ap-southeast-1.amazonaws.com/category-image-commercial-and-industrial-products.png');
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (NULL,'Toys & Babies','https://recoverly-images.s3.ap-southeast-1.amazonaws.com/category-image-toys-and-babies.png');
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (NULL,'Apparel & Accessories','https://recoverly-images.s3.ap-southeast-1.amazonaws.com/category-image-apparel.png');
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (NULL,'General Merchandise','https://recoverly-images.s3.ap-southeast-1.amazonaws.com/category-image-general-merchandise.png');
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (1,'Kitchen & Appliances',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (1,'Home Improvement',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (1,'Yard & Garden',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (1,'Pet Supplies',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (1,'Furniture & Decor',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (1,'Bath & Bedding',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (1,'Home Improvement',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (2,'Cameras',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (2,'Monitors & Projectors',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (2,'Cellphones',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (2,'Cellphone Accessories',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (2,'Laptops',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (2,'Tablets',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (2,'Office Equipment',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (2,'Desktops',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (2,'TVs & Home Theater',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (2,'Portable Audio',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (2,'Video Games & Consoles',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (3,'Commercial Equipment',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (3,'Commercial Tools',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (3,'Electrical & Electronics',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (3,'Stationary',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (4,'Nursery',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (4,'Stroller & Car Seats',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (4,'Baby Essentials',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (4,'Toys & Games',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (4,'Dolls & Stuffed Animals',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (4,'Crafts',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (5,'Kids'' & Baby Apparel',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (5,'Women''s Apparel',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (5,'Assorted Apparel',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (5,'Women''s Shoes',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (5,'Men''s Apparel',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (5,'Men''s Shoes',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (5,'Women''s Accessories',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (5,'Women''s Undergarments',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (5,'Men''s Undergarments',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (6,'Health & Nutrition',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (6,'Travel & Luggage',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (6,'Sporting Goods',NULL);
INSERT INTO category (parent_category_id,category_name,image_url) VALUES (6,'Bath & Beauty',NULL);
