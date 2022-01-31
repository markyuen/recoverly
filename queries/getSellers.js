export const getSellers = `
query getSellers {
  seller {
    company_name
    acra_uen
    address
    first_name
    last_name
    stripe_id
    user {
      email
    }
    verified
  }
}
`;
