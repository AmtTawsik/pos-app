import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  toggleCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, toggleCart }) => {
  return (
    <header className="bg-white shadow-sm py-4 sticky top-0 z-10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <ShoppingBag className="h-8 w-8 text-blue-600 mr-2" />
          <h1 className="text-xl font-bold text-gray-800">SimplePos</h1>
        </div>
        
        <button 
          onClick={toggleCart}
          className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Open cart"
        >
          <ShoppingBag className="h-6 w-6 text-gray-700" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;