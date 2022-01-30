const query = `
mutation deleteProduct($productID: Int) {
    delete_product(where: {product_id: {_eq: $productID}}) {
      affected_rows
    }
  }
  
`;
export default query;
