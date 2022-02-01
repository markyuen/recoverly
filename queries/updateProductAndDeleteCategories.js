const query = `
mutation updateProductAndDeleteCategories(
    $description: String!, 
    $ind_current_price: Int!, 
    $ind_usual_retail_price: Int!, 
    $number_in_stock: Int!, 
    $product_id: Int!, 
    $product_name: String!, 
    $product_status: Int!
    ) {
    update_product(_set: {description: $description, ind_current_price: $ind_current_price, ind_usual_retail_price: $ind_usual_retail_price, number_in_stock: $number_in_stock, product_id: $product_id, product_name: $product_name, product_status: $product_status}, where: {product_id: {_eq: $product_id}}) {
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
