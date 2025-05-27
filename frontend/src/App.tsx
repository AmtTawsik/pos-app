import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CheckoutResult from './components/CheckoutResult';
import AddProductForm from './components/AddProductForm';
import { useCart } from './contexts/CartContext';
import { getProducts, searchProducts, createSale } from './services/api';
import { Product } from './types';
import toast from 'react-hot-toast';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState({
    show: false,
    success: false,
    message: '',
  });

  const { state, addItem, clearCart } = useCart();

  const currentRequestId = useRef(0);

  // Fetch all products, with cancellation support
  const fetchProducts = async () => {
    const requestId = ++currentRequestId.current;
    setIsLoading(true);
    try {
      const data = await getProducts();
      if (requestId === currentRequestId.current) {
        setProducts(data);
      }
    } catch (error) {
      if (requestId === currentRequestId.current) {
        toast.error('Failed to load products.');
        console.error(error);
      }
    } finally {
      if (requestId === currentRequestId.current) {
        setIsLoading(false);
      }
    }
  };

  // Initial load
  useEffect(() => {
    fetchProducts();
  }, []);

  // Search with cancellation support
  const handleSearch = async (query: string) => {
    const trimmed = query.trim();
    const requestId = ++currentRequestId.current;

    if (!trimmed) {
      // If clearing search, do NOT set loading if products already present
      if (products.length === 0) {
        setIsLoading(true);
      }
      try {
        const data = await getProducts();
        if (requestId === currentRequestId.current) {
          setProducts(data);
        }
      } catch (error) {
        if (requestId === currentRequestId.current) {
          toast.error('Failed to load products.');
          console.error(error);
        }
      } finally {
        if (requestId === currentRequestId.current) {
          setIsLoading(false);
        }
      }
      return;
    }

    setIsLoading(true);
    try {
      const data = await searchProducts(trimmed);
      if (requestId === currentRequestId.current) {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          toast.error('Unexpected search response.');
        }
      }
    } catch (error) {
      if (requestId === currentRequestId.current) {
        toast.error('Search failed. Please try again.');
        console.error(error);
      }
    } finally {
      if (requestId === currentRequestId.current) {
        setIsLoading(false);
      }
    }
  };

  const handleAddToCart = (product: Product) => {
    if (product.stockQty <= 0) {
      toast.error(`${product.name} is out of stock`);
      return;
    }
    addItem(product);
    toast.success(`${product.name} added to cart`);
    if (state.items.length === 0) {
      setIsCartOpen(true);
    }
  };

  const handleCheckout = async () => {
    if (state.items.length === 0) return;

    setIsLoading(true);
    try {
      await createSale(state.items);
      setCheckoutStatus({
        show: true,
        success: true,
        message: 'Your order has been successfully processed!',
      });
      clearCart();
      await fetchProducts();
    } catch (error: any) {
      setCheckoutStatus({
        show: true,
        success: false,
        message:
          error.response?.data?.message ||
          'Failed to process your order. Please try again.',
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeCheckoutResult = () => {
    setCheckoutStatus((prev) => ({ ...prev, show: false }));
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

        <AddProductForm onProductAdded={fetchProducts} />

        <SearchInput onSearch={handleSearch} />

        <ProductList products={products} onAddToCart={handleAddToCart} isLoading={isLoading} />
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
            &copy; {new Date().getFullYear()} Simple POS System
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
