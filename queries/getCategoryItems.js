const query = `
query getCategoryItems($category_name: String!) {
  category(where: {category_name: {_eq: $category_name}}) {
    category_id
    category_name
    image_url
    products_categories {
      product {
        product_id
        product_name
        brand {
          brand_name
        }
        ind_current_price
      }
    }
  }
}
`;

export default query;
