export const insertNewOrder = `
mutation insertNewOrder(
  $user_id: String!,
  $shipping_address: String!,
  $stripe_checkout_id: String!,
  $orders_products_data: [orders_products_insert_input!]!,
  $orders_sellers_data: [orders_sellers_insert_input!]!
) {
  insert_order_one(
    object: {
      user_id: $user_id,
      shipping_address: $shipping_address,
      stripe_checkout_id: $stripe_checkout_id,
      orders_products: { data: $orders_products_data },
      orders_sellers: { data: $orders_sellers_data }
    }
  ) {
    order_id
  }
}
`;

// Sample payload:
//
// {
//   "user_id": "auth0|61eb603986e6f5006a3ba3ad",
//   "shipping_address": "test",
//   "stripe_checkout_id": "test",
//   "orders_products_data": [
//     {
//       "variation_pair_id": 1022,
//       "product_amount": 10,
//       "total_price": 1000
//     },
//     {
//       "variation_pair_id": 1023,
//       "product_amount": 1,
//       "total_price": 600
//     }
//   ],
//   "orders_sellers_data": [
//     {
//       "user_id": "google-oauth2|100336032071181468865",
//       "delivery_fee": 1000
//     },
//     {
//       "user_id": "auth0|61fbede543fb670069ba795a",
//       "delivery_fee": 100
//     }
//   ]
// }
