export const insertNewCategory = `
mutation insertNewCategory($category_id:Int, $category_name:String,$image_url:String, $parent_id:Int) {
    insert_category_one(object: {category_id: $category_id, category_name: $category_name, image_url: $image_url, parent_id: $parent_id}) {
      image_url
    }
  }  
`;
