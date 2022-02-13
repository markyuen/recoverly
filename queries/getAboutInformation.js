const query = `
query getAboutInformation{
    variation_pair_aggregate{
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
