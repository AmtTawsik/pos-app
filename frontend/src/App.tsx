import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CheckoutResult from './components/CheckoutResult';
import { useCart } from './contexts/CartContext';
import { getProducts, searchProducts, createSale } from './services/api';
import { Product } from './types';
import toast from 'react-hot-toast';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState<{
    show: boolean;
    success: boolean;
    message: string;
  }>({
    show: false,
    success: false,
    message: '',
  });

  const { state, addItem, clearCart } = useCart();

  // Load initial products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      const data = query ? await searchProducts(query) : await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error searching products:', error);
      toast.error('Search failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    if (product.stockQty <= 0) {
      toast.error(`${product.name} is out of stock`);
      return;
    }
    
    addItem(product);
    toast.success(`${product.name} added to cart`);
    
    // Open cart on first item add
    if (state.items.length === 0) {
      setIsCartOpen(true);
    }
  };

  const handleCheckout = async () => {
    if (state.items.length === 0) return;
    
    try {
      await createSale(state.items);
      setCheckoutStatus({
        show: true,
        success: true,
        message: 'Your order has been successfully processed!',
      });
      clearCart();
      // Refresh products to get updated stock
      fetchProducts();
    } catch (error) {
      console.error('Checkout error:', error);
      setCheckoutStatus({
        show: true,
        success: false,
        message: error.response?.data?.message || 'Failed to process your order. Please try again.',
      });
    }
  };

  const closeCheckoutResult = () => {
    setCheckoutStatus({ ...checkoutStatus, show: false });
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        cartItemCount={state.items.reduce((sum, item) => sum + item.quantity, 0)} 
        toggleCart={() => setIsCartOpen(!isCartOpen)}
      />
      
      <main className="container mx-auto px-4 py-6 flex-1">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Simple POS System
        </h1>
        
        <SearchInput onSearch={handleSearch} />
        
        <ProductList 
          products={products} 
          onAddToCart={handleAddToCart} 
          isLoading={isLoading}
        />
      </main>
      
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onCheckout={handleCheckout} 
      />
      
      {checkoutStatus.show && (
        <CheckoutResult 
          success={checkoutStatus.success}
          message={checkoutStatus.message}
          onClose={closeCheckoutResult}
        />
      )}
      
      <footer className="bg-white py-4 border-t">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Simple POS System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;