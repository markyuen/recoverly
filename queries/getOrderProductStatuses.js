export const getOrderProductStatuses = `
query getOrderProductStatuses($order_id: Int!) {
  order_by_pk(order_id: $order_id) {
    orders_products {
      orders_products_status_id
      variation_pair {
        product {
          seller_id
        }
      }
    }
  }
}
`;
