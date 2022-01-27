export const updateSellerStripeId = `
  mutation updateSellerStripeId($user_id:String!, $stripe_id:String!) {
    update_seller(_set: {stripe_id: $stripe_id}, where: {user_id: {_eq: $user_id}}) {
      affected_rows
    }
  }
`;
