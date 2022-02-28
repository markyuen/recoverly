export const updateOrderProductStatus = `
mutation updateOrderProductStatus($order_id: Int!, $variation_pair_id: Int!, $orders_products_status_id: Int!) {
  update_orders_products_by_pk(
    pk_columns: {order_id: $order_id, variation_pair_id: $variation_pair_id},
    _set: {orders_products_status_id: $orders_products_status_id}
  ) {
    order_id
  }
}
`;
