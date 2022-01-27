const query = `
mutation insertNewProduct($brand_name: String = "", $current_price: Int = 10, $description: String = "", $number_in_stock: Int = 0, $product_name: String = "", $user_id: String = "", $usual_retail_price: Int = 10) {
    insert_product_one(object: {brand_name: $brand_name, current_price: $current_price, description: $description, number_in_stock: $number_in_stock, product_name: $product_name, user_id: $user_id, usual_retail_price: $usual_retail_price}) {
      product_id
    }
  }
`;

export default query;
