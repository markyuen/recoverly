const query = `
mutation deletePDFSpecification($specificationID: Int) {
    delete_product_specification(where: {product_specification_id: {_eq: $specificationID}}){
      affected_rows
    }
  }
`;

export default query;
