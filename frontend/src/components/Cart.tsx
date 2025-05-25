import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Minus, Plus, Trash2, X, ShoppingCart } from 'lucide-react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, onCheckout }) => {
  const { state, removeItem, increaseQuantity, decreaseQuantity } = useCart();
  
  return (
    <div className={`
      fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-xl z-50
      transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : 'translate-x-full'}
    `}>
      <div className="flex flex-col h-full">
        {/* Cart Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center">
            <ShoppingCart className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ShoppingCart className="h-12 w-12 mb-2 text-gray-300" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {state.items.map((item) => (
                <li key={item.productId} className="flex border-b pb-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-gray-600 text-sm">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                    <p className="font-semibold mt-1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-red-500 hover:text-red-700 p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                    
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => decreaseQuantity(item.productId)}
                        className="p-1 hover:bg-gray-100"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-2 text-sm">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.productId)}
                        className="p-1 hover:bg-gray-100"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Cart Footer */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-gray-800">Total:</span>
            <span className="font-bold text-xl">${state.total.toFixed(2)}</span>
          </div>
          
          <button
            onClick={onCheckout}
            disabled={state.items.length === 0}
            className={`
              w-full py-3 rounded-md font-semibold text-center
              ${state.items.length > 0
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;