import axios from 'axios';
import { CartItem, Product, Sale } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products');
  return response.data;
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  const response = await api.get(`/products/search?q=${query}`);
  return response.data;
};

export const createProduct = async (product: Omit<Product, '_id'>): Promise<Product> => {
  const response = await api.post('/products', product);
  return response.data;
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
  const response = await api.put(`/products/${id}`, product);
  return response.data;
};

export const createSale = async (items: CartItem[]): Promise<Sale> => {
  const response = await api.post('/sales', { items });
  return response.data;
};

export default api;