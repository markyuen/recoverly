DO $$ DECLARE
    r RECORD;
BEGIN
    -- if the schema you operate on is not "current", you will want to
    -- replace current_schema() in query with 'schematodeletetablesfrom'
    -- *and* update the generate 'DROP...' accordingly.
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
END $$;

CREATE TABLE "user" (
  "user_id" text PRIMARY KEY,
  "email" text,
  "phone_number" text
);

CREATE TABLE "customer" (
  "customer_id" text PRIMARY KEY,
  "user_id" text
);

CREATE TABLE "seller" (
  "user_id" text PRIMARY KEY,
  "company_name" text,
  "address" text,
  "acra_uen" text,
  "office_number" text,
  "first_name" text,
  "last_name" text,
  "verified" boolean
);

CREATE TABLE "category" (
  "category_id" SERIAL PRIMARY KEY,
  "category_name" text,
  "parent_id" integer,
  "image_url" text
);

CREATE TABLE "order_category" (
  "product_id" integer,
  "category_id" integer,
  PRIMARY KEY ("product_id", "category_id")
);

CREATE TABLE "product" (
  "product_id" SERIAL PRIMARY KEY,
  "user_id" text,
  "product_name" text,
  "brand_name" text,
  "usual_retail_price" integer,
  "current_price" integer,
  "number_in_stock" integer,
  "description" text
);

CREATE TABLE "order_product" (
  "product_id" integer,
  "order_id" integer,
  PRIMARY KEY ("product_id", "order_id")
);

CREATE TABLE "order" (
  "order_id" SERIAL PRIMARY KEY,
  "status" text
);

CREATE TABLE "order_status" (
  "order_id" SERIAL,
  "status_id" integer,
  PRIMARY KEY ("order_id", "status_id")
);

CREATE TABLE "status" (
  "status_id" integer PRIMARY KEY,
  "status_type" text
);

CREATE TABLE "specification" (
  "specification_id" SERIAL PRIMARY KEY,
  "product_id" integer,
  "aws_link" text
);

CREATE TABLE "image" (
  "image_id" SERIAL PRIMARY KEY,
  "product_id" integer,
  "aws_link" text
);

CREATE TABLE "cart_product" (
  "product_id" integer,
  "user_id" text,
  "status_id" integer,
  PRIMARY KEY ("product_id", "user_id")
);

ALTER TABLE "category" ADD FOREIGN KEY ("parent_id") REFERENCES "category" ("category_id");

ALTER TABLE "customer" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("user_id");

ALTER TABLE "seller" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("user_id");

ALTER TABLE "product" ADD FOREIGN KEY ("user_id") REFERENCES "seller" ("user_id");

ALTER TABLE "order_product" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("product_id");

ALTER TABLE "order_product" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("order_id");

ALTER TABLE "order_status" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("order_id");

ALTER TABLE "order_status" ADD FOREIGN KEY ("status_id") REFERENCES "status" ("status_id");

ALTER TABLE "specification" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("product_id");

ALTER TABLE "order_category" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("product_id");

ALTER TABLE "order_category" ADD FOREIGN KEY ("category_id") REFERENCES "category" ("category_id");

ALTER TABLE "image" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("product_id");

ALTER TABLE "cart_product" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("user_id");

ALTER TABLE "cart_product" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("product_id");

ALTER TABLE "cart_product" ADD FOREIGN KEY ("status_id") REFERENCES "status" ("status_id");

INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (7,NULL,'Home & Garden','https://recoverly-images.s3.ap-southeast-1.amazonaws.com/category-image-household-living.png');
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (8,NULL,'Consumer Electronics','https://recoverly-images.s3.ap-southeast-1.amazonaws.com/category-image-consumer-electronics.png');
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (29,NULL,'Commercial & Industrial Products','https://recoverly-images.s3.ap-southeast-1.amazonaws.com/category-image-commercial-and-industrial-products.png');
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (34,NULL,'Toys & Babies','https://recoverly-images.s3.ap-southeast-1.amazonaws.com/category-image-toys-and-babies.png');
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (5,NULL,'Apparel & Accessories','https://recoverly-images.s3.ap-southeast-1.amazonaws.com/category-image-apparel.png');
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (41,NULL,'General Merchandise','https://recoverly-images.s3.ap-southeast-1.amazonaws.com/category-image-general-merchandise.png');
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (28,8,'Cameras',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (46,7,'Kitchen & Appliances',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (47,7,'Home Improvement',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (48,7,'Yard & Garden',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (52,7,'Pet Supplies',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (45,7,'Furniture & Decor',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (15,5,'Kids'' & Baby Apparel',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (20,8,'Monitors & Projectors',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (30,29,'Commercial Equipment',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (49,7,'Bath & Bedding',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (50,7,'Home Improvement',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (53,5,'Women''s Apparel',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (54,8,'Cellphones',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (55,8,'Cellphone Accessories',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (56,41,'Health & Nutrition',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (44,41,'Travel & Luggage',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (31,29,'Commercial Tools',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (10,5,'Assorted Apparel',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (11,5,'Women''s Shoes',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (12,5,'Men''s Apparel',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (13,5,'Men''s Shoes',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (14,5,'Women''s Accessories',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (16,5,'Women''s Undergarments',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (17,5,'Men''s Undergarments',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (18,8,'Laptops',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (19,8,'Tablets',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (21,8,'Office Equipment',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (22,8,'Desktops',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (23,8,'TVs & Home Theater',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (24,8,'Portable Audio',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (25,8,'Video Games & Consoles',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (33,29,'Electrical & Electronics',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (32,29,'Stationary',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (35,34,'Nursery',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (36,34,'Stroller & Car Seats',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (37,34,'Baby Essentials',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (38,34,'Toys & Games',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (39,34,'Dolls & Stuffed Animals',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (40,34,'Crafts',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (42,41,'Sporting Goods',NULL);
INSERT INTO category (category_id,parent_id,category_name,image_url) VALUES (43,41,'Bath & Beauty',NULL);
