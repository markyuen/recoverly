export const getUserInfo = `
query getUserInfo($email:String!){
    user(where: {email: {_eq: $email}}) {
      user_id
      admin
      seller {
        user_id
      }
      email
      phone_number
    }
  }
`;
