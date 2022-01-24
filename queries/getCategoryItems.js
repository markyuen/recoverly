const query = `
query getCategoryItems($categoryId: Int!) {
    category {
      category_id
      category_name
      image_url
      product_categories(where: {category_id: {_eq: $category_id}}) {
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
