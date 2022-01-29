const query = `
mutation insertNewProduct(
  $brand_name: String!, 
  $current_price: Int = 0, 
  $description: String = "", 
  $number_in_stock: Int = 0, 
  $product_name: String = "", 
  $user_id: String = "", 
  $usual_retail_price: Int = 0, 
  $product_status: Int = 1) {
  insert_product_one(object: {brand: {data: {brand_name: $brand_name}, on_conflict: {constraint: brand_brand_name_key, update_columns: brand_name}}, ind_current_price: $current_price, description: $description, number_in_stock: $number_in_stock, product_name: $product_name, seller_id: $user_id, ind_usual_retail_price: $usual_retail_price, product_status: $product_status}) {
    product_id
  }
}


`;

export default query;
