export type seller = {
  company_name: string;
  acra_uen: string;
  address: string;
  first_name: string;
  last_name: string;
  stripe_id: string;
  contact_name: string;
  contact_email: string;
  verified: boolean;
};

export type product_category = {
  parent_id: number;
  category_id: number;
  category_name: string;
  image_url: null | string;
};
