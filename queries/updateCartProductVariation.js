const query = `
mutation updateCartProductVariation($product_id: Int!, $user_id: String!, $order_variation_1: String!, $order_variation_2: String, $price: float8 = "", $quantity: Int = 10, $user_id1: String = "") {
    delete_cart_variation(where: {order_variation_1: {_eq: $order_variation_1}, order_variation_2: {_eq: $order_variation_2}, product_id: {_eq: $product_id}, user_id: {_eq: $user_id}}) {
      affected_rows
    }
    insert_cart_variation_one(object: {order_variation_1: $order_variation_1, order_variation_2: $order_variation_2, price: $price, quantity: $quantity, user_id: $user_id1}, on_conflict: {}) {
      order_variation_id
    }
  }  
`;

export default query;
