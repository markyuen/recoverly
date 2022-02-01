const query = `
mutation insertProductInformation(
    #This needs category_id and product_id
    $categories: [products_categories_insert_input!]!
    # This only needs product id and url
    $images: [product_image_insert_input!]!
    $specifications:[product_specification_insert_input!]!
    # Required Info : Variation_cat_1, variation_1, sku
    $variations: [variation_pair_insert_input!]!
  ){
    insert_products_categories(objects: $categories) {
      returning {
        category_id
      }
    }
    insert_product_image(objects:$images){
      returning{
        product_image_id
      }
    }
    insert_product_specification(objects:$specifications){
      returning{
        product_specification_id
      }
    }
    insert_variation_pair(objects:$variations){
      affected_rows
    }
  }  
`;

export default query;
