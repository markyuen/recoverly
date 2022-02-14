export const getSellerFees = `
query getSellerFees($product_id: Int!) {
  seller(where: {products: {product_id: {_eq: $product_id}}}) {
    user_id
    company_name
    flat_shipping_fee
    product_total_free_delivery
  }
}
`;
