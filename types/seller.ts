import { FixedLengthArray } from "./generic";

export type seller_category = {
  value: number;
  name: string;
};

export type option = {
  name: string;
  value: any;
};

export type database_category = {
  category: {
    category_name: string;
  };
};

export type database_image = {
  image_id: number;
  image_url: string;
};

export type brand = {
  value: number;
  label: string;
};

export type database_specification = {
  specification_id: number;
  specification_url: string;
};

export type seller_item = {
  product_name: string;
  brand: {
    brand_name: string;
  };
  description: string;
  ind_current_price: number;
  ind_usual_retail_price: number;
  number_in_stock: number;
  product_id: string;
  product_status: string;
  products_categories: database_category[];
};

type Quantity = number;
type OriginalPrice = number;
type DiscountedPrice = number;

export type ProductFormItem = {
  product_id: string;
  product_name: string;
  brand_name: brand;
  description: string;
  categories: seller_category[];
  images: File[];
  specifications: File[];
  product_status: option;
  seller_id: {
    value: string;
    name: string;
  };
  existing_images: database_image[];
  existing_specifications: database_specification[];
  main_category: seller_category | null;
  variation_categories: string[];
  variations: Record<string, string[]>;
  variation_sku: Record<
    string,
    // String -> [Quantity,]
    Record<string, FixedLengthArray<[Quantity, DiscountedPrice, OriginalPrice]>>
  >;
};

export const productInitialState: ProductFormItem = {
  product_id: null,
  product_name: "",
  brand_name: { value: null, label: "" },
  description: "",
  images: [],
  specifications: [],
  categories: [],
  product_status: { value: 1, name: "ACTIVE" },
  seller_id: {
    value: "",
    name: "",
  },
  main_category: null,
  existing_images: [],
  existing_specifications: [],
  variation_categories: [],
  variations: {},
  variation_sku: {},
};

// TODO
// 1. Refactor the reducer so that we always add to variation categories
// 2. Work on logic for transitioning from 1 -> 2 categories
// 3. Develop table which can store and query variation category pairs
