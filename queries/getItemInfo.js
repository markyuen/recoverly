const query = `
query getItemInfo($seller_id: String!, $product_id: Int!) {
  product(where: {seller_id: {_eq: $seller_id}, product_id: {_eq: $product_id}}) {
    product_id
    description
    ind_current_price
    ind_usual_retail_price
    number_in_stock
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
    }
    variations {
      variation_1
      variation_1_category
      variation_2
      variation_2_category
      SKU
    }
  }
}

`;

export default query;
