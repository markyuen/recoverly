export type ItemProp = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  title: string;
  rating: {
    rate: number;
    count: number;
  };
};

export interface CartItem extends ItemProp {
  quantity: number;
}
