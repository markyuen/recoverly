export const deleteSingleCategory = `
mutation deleteSingleCategory($category_id:Int){
    delete_category(where: {category_id: {_eq: $category_id}}) {
      affected_rows
    }
  }
`;
