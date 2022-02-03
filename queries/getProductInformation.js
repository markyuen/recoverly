const query = `
query getProductInformation($product_id: Int!, $_eq: Int = 10) {
    product(where: {product_id: {_eq: $product_id}}) {
      brand {
        brand_name
      }
      description
      product_id
      product_name
      product_images {
        url
      }
      product_specifications {
        url
      }
      products_categories {
        main_category
        category {
          category_name
        }
      }
      variations {
        variation_1
        variation_2
        quantity
        original_price
        discounted_price
      }
    }
  }
  
`;

export default query;
