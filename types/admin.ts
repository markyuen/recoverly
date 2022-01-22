export type seller = {
  name: string;
  status: string;
  contact_number: string;
};

export type product_category = {
  parent_id: number;
  category_id: number;
  category_name: string;
  image_url: null | string;
  // categorryname: string;
  // image_url: string;
  // parent: number;
};
