const query = `
query getCategoryItems($category_name: String!, $limit: Int = 20, $offset: Int = 0) {
  category(where: {category_name: {_eq: $category_name}}){
    category_id
    category_name
    image_url
    categories {
      image_url
      category_name
      parent_category_id
    }
    category {
      category_name
      image_url
      parent_category_id
    }
    products_categories(limit: $limit, offset: $offset){
      product{
        product_id
        product_name
        product_images{
          url
        }
        variations{
          discounted_price
          original_price
        }
      }
      
    }
  }
}
`;

export default query;
