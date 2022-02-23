export const updateUserOrderStatus = `
mutation updateUserOrderStatus($stripe_checkout_id: String!, $order_status_id: Int!, $shipping_address: String!) {
  update_order(where: {stripe_checkout_id: {_eq: $stripe_checkout_id}}, _set: {order_status_id: $order_status_id, shipping_address: $shipping_address}) {
    affected_rows
  }
}
`;
