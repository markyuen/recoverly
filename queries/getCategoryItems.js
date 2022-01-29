const query = `
query getCategoryItems($category_name: String!) {
<<<<<<< HEAD
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
=======
  category(where: {category_name: {_eq: $category_name}}){
    category_id
    category_name
    image_url
    products_categories{
      product{
        product_id
        product_name
        products_categories{
          category{
            category_name
          }
        }
        product_images{
          url
        }
>>>>>>> 6cd42d3 (Fixed up more changes)
      }
    }
  }
}
`;

export default query;
