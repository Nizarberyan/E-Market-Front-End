export default interface Product {
  _id: string;
  title: string;
  description: string;
  prix: number;
  stock: number;
  images: string[];
  isDelete: boolean;
  categories: string[];
  createdBy: string;
  averageRating: number;
  reviews: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
