export const getUserCartProducts = `
query getUserCartProducts($user_id:String!) {
  cart_product(where: {user_id: {_eq: $user_id}}, order_by: {variation_pair: {product: {seller: {company_name: asc}}}}) {
    user_id
    variation_pair_id
    cart_product_status_id
    quantity
    variation_pair {
      product {
        seller_id
        product_id
        product_name
      }
      variation_1
      variation_2
      discounted_price
      quantity
    }
  }
}
`;
