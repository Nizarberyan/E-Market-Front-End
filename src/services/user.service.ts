import api from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  createdAt?: string;
}

export const userService = {
  // GET /users/me
  getCurrentUser: async (): Promise<User> => {
    const { data } = await api.get('/users/me');
    return data;
  },

  // PUT /users/me (update profile)
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const { data } = await api.put('/users/me', userData);
    return data;
  },
};
