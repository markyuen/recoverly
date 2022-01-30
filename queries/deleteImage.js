const query = `
mutation deleteImage($image_id: Int!) {
    delete_product_image(where: {product_image_id: {_eq: $image_id}}){
      affected_rows
    }
  }  
`;

export default query;
