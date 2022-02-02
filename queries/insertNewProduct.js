const query = `
mutation insertNewProduct(
  $brand_name: String!, 
  $description: String = "", 
  $product_name: String = "", 
  $user_id: String!,  
  $product_status: Int) {
  insert_product_one(object: {brand: {data: {brand_name: $brand_name}, on_conflict: {constraint: brand_brand_name_key, update_columns: brand_name}}, description: $description, product_name: $product_name, seller_id: $user_id, product_status: $product_status}) {
    product_id
  }
}
`;

export default query;
