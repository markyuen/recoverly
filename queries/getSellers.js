export const getSellers = `
query getSellers {
  seller(order_by: {created_at: desc}) {
    company_name
    acra_uen
    address
    first_name
    last_name
    stripe_id
    user {
      user_id
      email
    }
    verified
  }
}
`;
