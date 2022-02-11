const query = `
query getProductInformation($product_id: Int!) {
  product_by_pk(product_id: $product_id) {
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
      variation_pair_id
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
