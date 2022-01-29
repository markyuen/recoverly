export const insertNewSeller = `
mutation insertNewSeller($user_id:String!, $company_name:String!, $address:String!, $office_number:String!, $acra_uen:String!, $first_name:String!, $last_name:String!) {
    insert_seller_one(object: {user_id: $user_id, company_name: $company_name, address: $address, office_number: $office_number, acra_uen: $acra_uen, first_name: $first_name, last_name: $last_name}) {
      user_id
    }
  }
`;