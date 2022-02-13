const query = `
query getCategoryItems($category_name: String!) {
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
    products_categories{
      product{
        product_id
        product_name
        product_images{
          url
        }
        variations{
          discounted_price_cents
          original_price_cents
        }
      }
      
    }
  }
}
`;

export default query;
