export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export default interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}
