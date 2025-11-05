export default interface Coupon {
  _id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  expirationDate: string;
  minOrderAmount?: number;
  isActive: boolean;
  createdAt: string;
}
