const query = `
mutation updateCustomerQueryStatus($resolved: Boolean = false, $enquiry_id: Int) {
    update_enquiry(_set: {resolved: $resolved}, where: {enquiry_id: {_eq: $enquiry_id}}){
      affected_rows
    }
  }  
`;

export default query;
