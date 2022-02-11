const query = `
mutation updateCartProduct($user_id:String!, $variation_pair_id:Int!, $quantity:Int) {
  update_cart_product_by_pk(pk_columns: {user_id: $user_id, variation_pair_id: $variation_pair_id}, _set: {quantity: $quantity}) {
    user_id
  }
}
`;

export default query;
