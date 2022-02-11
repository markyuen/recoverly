export type product_page_category = {
  main_category: boolean;
  category: {
    category_name: string;
  };
};

export type product_page_file = {
  url: string;
};

export type product_page_variation = {
  discounted_price: number;
  original_price: number;
  quanity: number;
  variation_1: string;
  variation_2: string | null;
};

export type ProductInformation = {
  brand: { brand_name: string };
  description: string;
  product_id: number;
  product_images: product_page_file[];
  product_name: string;
  product_specifications: product_page_file[];
  products_categories: product_page_category[];
  variations: product_page_variation[];
};
