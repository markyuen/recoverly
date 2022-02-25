export const updateOrderStatus = `
mutation updateOrderStatus($order_id: Int!, $order_status_id: Int!) {
  update_order_by_pk(
    pk_columns: {order_id: $order_id},
    _set: {order_status_id: $order_status_id}
  ) {
    order_id
  }
}
`;
