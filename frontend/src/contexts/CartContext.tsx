import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, Product } from '../types';

// Define the shape of our cart state
interface CartState {
  items: CartItem[];
  total: number;
}

// Define action types
type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'INCREASE_QUANTITY'; payload: string }
  | { type: 'DECREASE_QUANTITY'; payload: string }
  | { type: 'CLEAR_CART' };

// Define context interface
interface CartContextProps {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
}

// Create context
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Initial state
const initialState: CartState = {
  items: [],
  total: 0,
};

// Reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const product = action.payload;
      const existingItem = state.items.find(item => item.productId === product._id);

      if (existingItem) {
        // If item already exists, increase quantity
        const updatedItems = state.items.map(item =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      } else {
        // Add new item with quantity 1
        const newItem: CartItem = {
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity: 1,
        };

        return {
          ...state,
          items: [...state.items, newItem],
          total: calculateTotal([...state.items, newItem]),
        };
      }
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.productId !== action.payload);
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    }

    case 'INCREASE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.productId === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    }

    case 'DECREASE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.productId === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

// Helper function to calculate total
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

// Provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const increaseQuantity = (productId: string) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: productId });
  };

  const decreaseQuantity = (productId: string) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using the cart context
export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};