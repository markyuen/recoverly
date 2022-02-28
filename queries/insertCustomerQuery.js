const query = `
mutation insertCustomerQuery(
    $customer_email: String!,
    $full_name: String!,
    $message: String!,
){
    insert_customer(on_conflict: {constraint: customer_pkey, update_columns: customer_email}, objects: {customer_email: $customer_email, full_name: $full_name}) {
      affected_rows
    }
    insert_enquiry(objects: {customer_email: $customer_email, message: $message}) {
      affected_rows
    }
  }
`;

export default query;
