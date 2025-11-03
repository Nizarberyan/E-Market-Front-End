export default interface User {
  _id: string;
  fullName: string;
  email: string;
  role: 'user' | 'admin';
  profileImage?: string;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
}