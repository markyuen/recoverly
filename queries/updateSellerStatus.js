export const updateSellerStatus = `
mutation updateSellerStatus($user_id: String!, $verified:Boolean!) {
  update_seller_by_pk(pk_columns: {user_id: $user_id}, _set: {verified: $verified}) {
    user_id
    verified
  }
}
`;
