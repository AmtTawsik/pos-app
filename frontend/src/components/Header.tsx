import React from 'react';
import { LogIn, LogOut, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  cartItemCount: number;
  toggleCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, toggleCart }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    navigate("/"); // Redirect to home
    window.location.reload(); // Optional: refresh the page to reset state
  };

  return (
    <header className="bg-white shadow-soft sticky top-0 z-10">
      <div className="container mx-auto py-4 px-4">
        <div className="flex justify-between items-center">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-indigo-600" />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                SimplePos
              </h1>
              <p className="text-xs text-gray-500">Smart Retail Solution</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            {
              !isAuthenticated ? (
                <button
                  onClick={toggleCart}
                  className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
                  aria-label="Open cart"
                >
                  <ShoppingBag className="h-6 w-6 text-gray-700 group-hover:text-indigo-600 transition-colors" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              ) : null
            }


            {/* Divider */}
            {
              !isAuthenticated && <div className="h-6 w-px bg-gray-300"></div>
            }
            

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
                aria-label="Logout"
              >
                <LogOut className="h-5 w-5 text-gray-700 group-hover:text-red-600 transition-colors" />
                <span className="text-gray-700 font-medium group-hover:text-red-600 transition-colors">
                  Logout
                </span>
              </button>
            ) : (
              <button
                onClick={handleAdminClick}
                className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
                aria-label="Admin login"
              >
                <LogIn className="h-5 w-5 text-gray-700 group-hover:text-indigo-600 transition-colors" />
                <span className="text-gray-700 font-medium group-hover:text-indigo-600 transition-colors">
                  Admin
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
