import React, { useState } from 'react';
import { updateProduct } from '../services/api';
import { Product } from '../types';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

interface UpdateProductFormProps {
  product: Product;
  onClose: () => void;
  onProductUpdated: () => void;
}

const UpdateProductForm: React.FC<UpdateProductFormProps> = ({ product, onClose, onProductUpdated }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: product.name,
    code: product.code,
    price: product.price.toString(),
    stockQty: product.stockQty.toString()
  });

  const isFormValid =
    formData.name.trim() !== '' &&
    formData.code.trim() !== '' &&
    !isNaN(Number(formData.price)) &&
    Number(formData.price) >= 0 &&
    !isNaN(Number(formData.stockQty)) &&
    Number(formData.stockQty) >= 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error('Please fill all fields with valid values');
      return;
    }
    
    try {
      setIsLoading(true);
      await updateProduct(product._id, {
        name: formData.name.trim(),
        code: formData.code.trim(),
        price: Number(formData.price),
        stockQty: Number(formData.stockQty)
      });
      
      toast.success('Product updated successfully');
      onProductUpdated();
      onClose();
    } catch (error: any) {
      console.error('Failed to update product:', error);
      toast.error(error.response?.data?.message || 'Failed to update product');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 relative">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Update Product</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input w-full"
                placeholder="Enter product name"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Code
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
                className="input w-full"
                placeholder="Enter product code"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="input w-full"
                placeholder="Enter price"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stockQty"
                value={formData.stockQty}
                onChange={handleChange}
                required
                min="0"
                className="input w-full"
                placeholder="Enter stock quantity"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !isFormValid}
              className={`btn btn-primary ${isLoading || !isFormValid ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Updating...' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductForm;