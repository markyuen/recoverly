const query = `
query getMerchantItems($seller_id: String!) {
    product(where: {seller_id: {_eq: $seller_id}}) {
      product_id
      description
      product_name
      product_status
      brand{
        brand_name
      }
      products_categories{
        category{
          category_name
        }
      }
    }
  }
`;

export default query;
