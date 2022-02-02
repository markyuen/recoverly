export const getUserInfo = `
query getUserInfo($user_id:String!){
    user_by_pk(user_id: $user_id) {
      user_id
      admin
      email
      seller {
        stripe_id
        verified
      }
    }
  }
`;
