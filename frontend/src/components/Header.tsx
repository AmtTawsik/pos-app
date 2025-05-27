import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  toggleCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, toggleCart }) => {
  return (
    <header className="bg-white shadow-soft sticky top-0 z-10">
      <div className="container mx-auto py-4 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-indigo-600" />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                SimplePos
              </h1>
              <p className="text-xs text-gray-500">Smart Retail Solution</p>
            </div>
          </div>
          
          <button 
            onClick={toggleCart}
            className="relative p-2 rounded-full hover:bg-gray-50 transition-colors duration-200"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-6 w-6 text-gray-700" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header