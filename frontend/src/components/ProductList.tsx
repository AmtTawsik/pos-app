import React from 'react';
import { Product } from '../types';
import { PlusCircle } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  isLoading: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="bg-white rounded-lg shadow-sm p-4 animate-pulse h-44"
          >
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-lg shadow-sm">
        <p className="text-gray-600 text-lg">No products found.</p>
        <p className="text-gray-500 mt-2">Try a different search term or add new products.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md"
        >
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
                <p className="text-gray-500 text-sm">Code: {product.code}</p>
              </div>
              <div className="bg-blue-50 px-2 py-1 rounded text-blue-700 text-sm font-medium">
                Stock: {product.stockQty}
              </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <p className="text-gray-800 font-bold text-xl">
                ${product.price.toFixed(2)}
              </p>
              <button
                onClick={() => onAddToCart(product)}
                disabled={product.stockQty <= 0}
                className={`
                  flex items-center rounded-md px-3 py-2 text-sm font-medium
                  ${product.stockQty > 0 
                    ? 'bg-blue-500 text-white hover:bg-blue-600 transition-colors'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                <PlusCircle size={16} className="mr-1" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;