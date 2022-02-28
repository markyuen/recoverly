export const getSellerFees = `
query getSellerFees($user_id: String!) {
  seller_by_pk(user_id: $user_id) {
    user_id
    display_name
    flat_shipping_fee
    product_total_free_delivery
  }
}
`;
