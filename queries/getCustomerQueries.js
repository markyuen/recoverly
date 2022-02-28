const query = `
query getCustomerQueries{
    enquiry{
      enquiry_id
      customer{
        customer_email
        full_name
      }
      resolved
      message
    }
  }
`;

export default query;
