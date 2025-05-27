import React, { useState } from 'react';
import { createProduct } from '../services/api';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';

interface AddProductFormProps {
  onProductAdded: () => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onProductAdded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    price: '',
    stockQty: ''
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
      await createProduct({
        name: formData.name.trim(),
        code: formData.code.trim(),
        price: Number(formData.price),
        stockQty: Number(formData.stockQty)
      });
      
      toast.success('Product added successfully');
      setFormData({ name: '', code: '', price: '', stockQty: '' });
      setIsOpen(false);
      onProductAdded();
    } catch (error: any) {
      console.error('Failed to add product:', error);
      toast.error('Failed to add product');
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
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
      >
        <Plus size={20} />
        Add New Product
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit} className="mt-4 bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !isFormValid}
              className={`btn btn-primary ${isLoading || !isFormValid ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddProductForm;
