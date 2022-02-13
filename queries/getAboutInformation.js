const query = `
query getAboutInformation{
    product_aggregate{
      aggregate{
        count
      }
    }
    brand_aggregate{
      aggregate{
        count
      }
    }
  }
`;

export default query;
