import type Product from '../types/product.type';
import api from './api';

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    const response = await api.get('/products');
    return response.data.data;
  },
  async getProductById(id: string): Promise<Product> {
    const { data } = await api.get(`/products/${id}`);
    return data.data;
  },
};
