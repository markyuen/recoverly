const query = `
mutation insertNewCartProduct($user_id: String!, $variation_pair_id:Int!, $quantity:Int!) {
  insert_cart_product_one(object: {user_id: $user_id, variation_pair_id: $variation_pair_id, quantity: $quantity}) {
    user_id
  }
}
`;

export default query;
