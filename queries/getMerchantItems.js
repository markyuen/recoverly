const query = `
query getMerchantItems($seller_id: String!) {
    product(where: {seller_id: {_eq: $seller_id}}) {
      product_id
      description
      ind_current_price
      ind_usual_retail_price
      number_in_stock
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
