export const updateProductCount = `
mutation updateProductCount($variation_pair_id: Int!, $quantity: Int!) {
  update_variation_pair_by_pk(pk_columns: {variation_pair_id: $variation_pair_id}, _set: {quantity: $quantity}) {
    variation_pair_id
  }
}
`;
