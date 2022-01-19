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
  "category_id" integer PRIMARY KEY,
  "category_name" text,
  "parent_id" integer
);

CREATE TABLE "order_category" (
  "product_id" integer,
  "category_id" integer,
  PRIMARY KEY ("product_id", "category_id")
);

CREATE TABLE "product" (
  "product_id" integer PRIMARY KEY,
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
  "order_id" integer PRIMARY KEY,
  "status" text
);

CREATE TABLE "order_status" (
  "order_id" integer,
  "status_id" integer,
  PRIMARY KEY ("order_id", "status_id")
);

CREATE TABLE "status" (
  "status_id" integer PRIMARY KEY,
  "status_type" text
);

CREATE TABLE "specification" (
  "specification_id" integer PRIMARY KEY,
  "product_id" integer,
  "aws_link" text
);

CREATE TABLE "image" (
  "image_id" integer PRIMARY KEY,
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
