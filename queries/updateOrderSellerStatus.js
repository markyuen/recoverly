export const updateOrderSellerStatus = `
mutation updateOrderSellerStatus($order_id: Int!, $user_id: String!, $orders_sellers_status_id: Int!) {
  update_orders_sellers_by_pk(
    pk_columns: {order_id: $order_id, user_id: $user_id},
    _set: {orders_sellers_status_id: $orders_sellers_status_id}
  ) {
    order_id
  }
}
`;
