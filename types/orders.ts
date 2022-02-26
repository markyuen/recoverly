export type OrderProduct = {
  product_name: string;
  product_id: number;
  variation_pair_id: number;
  variation_1: string;
  variation_2: string;
  product_amount: number;
  total_price: number;
  order_product_status: string;
}

export type OrderSeller = {
  user_id: string;
  company_name: string;
  stripe_id: string;
  delivery_fee: number;
  stripe_transfer_id: string;
  order_seller_status: string;
}

export type Order = {
  order_id: number;
  shipping_address: string;
  stripe_checkout_id: string;
  order_status: string;
  created_at: Date;
  products: OrderProduct[];
  sellers: OrderSeller[];
}
