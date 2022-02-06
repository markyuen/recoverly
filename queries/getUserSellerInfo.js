export const getUserSellerInfo = `
query getUserSellerInfo($user_id:String!) {
  user_by_pk(user_id: $user_id) {
    user_id
    admin
    email
    seller {
      stripe_id
      verified
      acra_uen
      address
      office_number
      company_name
      first_name
      last_name
      flat_shipping_fee
      product_total_free_delivery
    }
  }
}
`;
