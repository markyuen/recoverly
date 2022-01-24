const query = `query getCategoryItems($category_name: String!) {
  category(where: {category_name: {_eq: $category_name}}){
    category_id
    category_name
    image_url
    product_categories{
      product {
        product_id
        product_name
        brand_name
        current_price
      }
    }
  }
}
`;

export default query;
