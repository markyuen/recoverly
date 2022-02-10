const query = `
mutation insertNewCartProduct($product_id: Int!, $user_id: String!,$order_variation_1:String!, $order_variation_2:String,$price: float8!, $quantity:Int!){
    insert_cart_product_one(object: {product_id: $product_id, user_id: $user_id, cart_variations: {data: {order_variation_1: $order_variation_1, order_variation_2: $order_variation_2, price: $price, quantity: $quantity}}}) {
      product_id
    }
  }  
`;

export default query;
