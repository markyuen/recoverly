const query = `
query getItemInfo($seller_id: String!, $product_id: Int!) {
  product(where: {seller_id: {_eq: $seller_id}, product_id: {_eq: $product_id}}) {
    product_id
    description
    product_name
    product_status
    brand {
      brand_id
      brand_name
    }
    product_images {
      product_image_id
      url
    }
    product_specifications {
      product_specification_id
      url
    }
    products_categories {
      category {
        category_id
        category_name
      }
      main_category
    }
    variations {
      variation_1
      variation_1_category
      variation_2
      variation_2_category
      quantity
      discounted_price
      original_price
    }
  }
}

`;

export default query;
