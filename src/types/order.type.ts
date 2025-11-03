export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export default interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  discount?: number;
  finalTotal: number;
  createdAt: string;
}