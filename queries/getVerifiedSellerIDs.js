const query = `
query getVerifiedSellerIDs{
    seller(where: {verified: {_eq: true}}) {
      user_id
      user {
        email
      }
    }
  }  
`;

export default query;
