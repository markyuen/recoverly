export const updateCategoryInformation = `
mutation updateCategoryInformation($category_id:Int!, $category_name: String!, $image_url: String, $parent_category_id: Int){
    update_category_by_pk(_set: {category_id: $category_id, category_name: $category_name, image_url: $image_url, parent_category_id: $parent_category_id}, pk_columns: {category_id: $category_id}) {
      category_id
    }
  }
`;
