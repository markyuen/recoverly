const query = `
query getLimits($product_ids:[Int!]!){
    product(where: {product_id: {_in: $product_ids}}){
      product_id
      variations{
        variation_1
        variation_2
        quantity
      }
    }
  } 
`;

export default query;
