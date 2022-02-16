const query = `
query getPopularItems {
    product(limit: 60) {
      product_id
      product_name
      product_images {
        url
      }
      variations {
        discounted_price
        original_price
      }
    }
  }
  
`;

export default query;
