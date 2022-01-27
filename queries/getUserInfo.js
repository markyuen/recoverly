export const getUserInfo = `
query getUserInfo($user_id:String!){
    user(where: {user_id: {_eq: $user_id}}) {
      user_id
      admin
      seller {
        stripe_id
        verified
      }
      email
    }
  }
`;
