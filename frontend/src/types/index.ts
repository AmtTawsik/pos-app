export interface Product {
  _id: string;
  name: string;
  code: string;
  price: number;
  stockQty: number;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Sale {
  items: CartItem[];
}