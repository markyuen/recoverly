const query = `
query getCategoryNamesAndID {
    category {
      category_name
      category_id
      parent_category_id
    }
  }
`;

export default query;
