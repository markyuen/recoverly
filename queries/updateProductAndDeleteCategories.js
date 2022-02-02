const query = `
mutation updateProductAndDeleteCategories(
    $description: String!, 
    $product_id: Int!, 
    $product_name: String!, 
    $product_status: Int!
    ) {
    update_product(_set: {description: $description, product_id: $product_id, product_name: $product_name, product_status: $product_status}, where: {product_id: {_eq: $product_id}}) {
      affected_rows
    }
    delete_products_categories(where: {product_id: {_eq: $product_id}}) {
      affected_rows
    }
    delete_variation_pair(where: {product_id: {_eq: $product_id}}) {
      affected_rows
    }
  }  
`;

export default query;
