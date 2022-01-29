export const getProducts = `
query getProducts {
  product {
    ind_current_price
    brand {
      brand_name
    }
    description
  }
}
`;
