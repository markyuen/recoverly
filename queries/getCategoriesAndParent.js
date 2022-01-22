export const getCategoriesAndParent = `
query getCategoriesAndParent{
    category {
      category_id
      category_name
      image_url
      parent_id
    }
  }  
`;
