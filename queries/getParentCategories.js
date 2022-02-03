const query = `
query getParentCategories {
    category(where: {parent_category_id: {_is_null: true}}) {
      category_id
      category_name
      image_url
    }
  }
  
`;

export default query;
