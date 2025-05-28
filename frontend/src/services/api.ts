import axios from "axios";
import { CartItem, Product, Sale } from "../types";
import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Socket.io connection
export const socket = io(API_URL, {
  autoConnect: false,
});

// Auth endpoints
export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const getAdminProfile = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

// Products endpoints
export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products");
  return response.data;
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  const response = await api.get(`/products/search?q=${query}`);
  return response.data;
};

export const createProduct = async (
  product: Omit<Product, "_id">
): Promise<Product> => {
  const response = await api.post("/products", product);
  return response.data;
};

export const updateProduct = async (
  id: string,
  product: Partial<Product>
): Promise<Product> => {
  const response = await api.put(`/products/${id}`, product);
  return response.data;
};

// Sales endpoints
export const createSale = async (items: CartItem[]): Promise<Sale> => {
  const response = await api.post("/sales", { items });
  return response.data;
};

export const getSales = async () => {
  const response = await api.get("/sales");
  return response.data;
};

// NEW: get single sale by ID
export const getSaleById = async (saleId: string): Promise<Sale> => {
  const response = await api.get(`/sales/${saleId}`);
  return response.data;
};

export default api;
