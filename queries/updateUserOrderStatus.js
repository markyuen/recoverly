export const updateUserOrderStatus = `
mutation updateUserOrderStatus($stripe_checkout_id: String!, $order_status_id: Int!, $shipping_address: String!, $user_id: String!, $stripe_payment_intent_id: String!) {
  
  update_order(where: {stripe_checkout_id: {_eq: $stripe_checkout_id}}, _set: {order_status_id: $order_status_id, shipping_address: $shipping_address, stripe_payment_intent_id: $stripe_payment_intent_id}) {
    affected_rows
  }

  delete_cart_product(where: {user_id: {_eq: $user_id}}) {
    affected_rows
  }
}
`;
