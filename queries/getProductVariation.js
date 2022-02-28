export const getProductVariation = `
query getProductVariation($variation_pair_id: Int!) {
  variation_pair_by_pk(variation_pair_id: $variation_pair_id) {
    product_id
    quantity
  }
}
`;
