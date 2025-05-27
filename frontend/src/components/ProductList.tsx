import React, { useState } from 'react';
import { Product } from '../types';
import { PlusCircle, Package2, Pencil } from 'lucide-react';
import UpdateProductForm from './UpdateProductForm';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  isLoading: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart, isLoading }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div
            key={item}
            className="card animate-pulse h-48"
          >
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
              <div className="h-20 bg-gray-200 rounded-lg w-full"></div>
              <div className="h-8 bg-gray-200 rounded-full w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16 card">
        <Package2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-1">No products found</h3>
        <p className="text-gray-500">Try a different search term or add new products.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="card group relative">
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm font-medium">Code: {product.code}</p>
                </div>
                <div className={`px-2.5 py-1 rounded-full text-sm font-medium ${
                  product.stockQty > 10
                    ? 'bg-green-50 text-green-700'
                    : product.stockQty > 0
                    ? 'bg-yellow-50 text-yellow-700'
                    : 'bg-red-50 text-red-700'
                }`}>
                  Stock: {product.stockQty}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="p-1.5 text-gray-400 hover:text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors absolute top-1 right-1"
                    title="Edit product"
                  >
                    <Pencil size={18} />
                  </button>
                </div>
                <button
                  onClick={() => onAddToCart(product)}
                  disabled={product.stockQty <= 0}
                  className={`
                    flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200
                    ${product.stockQty > 0 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  <PlusCircle size={18} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <UpdateProductForm
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onProductUpdated={() => {
            setSelectedProduct(null);
            window.location.reload();
          }}
        />
      )}
    </>
  );
};

export default ProductList;