export type ItemProp = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  title: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type ItemListing = {
  product_id: number;
  product_images: { url: string }[];
  product_name: string;
};

export type ItemPageData = {
  brand: {
    brand_name: string;
  };
  description: string;
  product_id: number;
  product_name: string;
  product_images: { url: string }[];
  product_specifications: { url: string }[];
  products_categories: {
    main_category: boolean;
    category: {
      category_name: string;
    };
  }[];
  variations: {
    variation_1: string;
    variation_2: string;
    quantity: number;
    original_price: number;
    discounted_price: number;
  }[];
};

export type CartItem = {
  product_id: number;
  product_name: string;
  variation: {
    variation_1: string;
    variation_2: string;
    quantity: number;
    discounted_price: number;
  }[];
};
