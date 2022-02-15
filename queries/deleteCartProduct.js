export const deleteCartProduct = `
mutation deleteCartProduct($user_id:String!, $variation_pair_id:Int!) {
  delete_cart_product_by_pk(user_id: $user_id, variation_pair_id: $variation_pair_id) {
    user_id
    variation_pair_id
  }
}
`;
