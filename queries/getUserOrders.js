export const getUserOrders = `
query getUserOrders($user_id: String!) {
  order(where: {user_id: {_eq: $user_id}, _and: {order_status_id: {_gt: 1}}}, order_by: {created_at: desc}) {
    order_id
    shipping_address
    stripe_checkout_id
    stripe_payment_intent_id
    created_at
    order_status {
      order_status_id
      order_status_name
    }
    user {
      user_id
      email
      admin
    }
    orders_products {
      variation_pair_id
      product_amount
      total_price
      variation_pair {
        product_id
        variation_1,
        variation_2,
        product {
          product_name
        }
      }
      orders_products_status {
        orders_products_status_id
        orders_products_status_name
      }
    }
    orders_sellers {
      user_id
      delivery_fee
      stripe_transfer_id
      orders_sellers_status {
        orders_sellers_status_id
        orders_sellers_status_name
      }
      seller {
        company_name
        stripe_id
        verified
      }
    }
  }
}
`;
