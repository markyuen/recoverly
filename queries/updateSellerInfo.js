export const updateSellerInfo = `
mutation updateSellerInfo($user_id:String!, $acra_uen:String!, $address:String!, $company_name:String!, $first_name:String!, $last_name:String!, $office_number:String!, $flat_shipping_fee:Int!, $product_total_free_delivery:Int!) {
  update_seller_by_pk(pk_columns: {user_id: $user_id}, _set: {acra_uen: $acra_uen, address: $address, company_name: $company_name, first_name: $first_name, last_name: $last_name, office_number: $office_number, flat_shipping_fee: $flat_shipping_fee, product_total_free_delivery: $product_total_free_delivery}) {
    user_id
  }
}
`;
