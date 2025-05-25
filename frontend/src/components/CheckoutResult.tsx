import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface CheckoutResultProps {
  success: boolean;
  message: string;
  onClose: () => void;
}

const CheckoutResult: React.FC<CheckoutResultProps> = ({ success, message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
        <div className="text-center">
          {success ? (
            <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
          ) : (
            <XCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          )}
          
          <h2 className="text-xl font-semibold mb-2">
            {success ? 'Success!' : 'Error'}
          </h2>
          
          <p className="text-gray-600 mb-6">
            {message}
          </p>
          
          <button
            onClick={onClose}
            className="btn btn-primary w-full"
          >
            {success ? 'Continue Shopping' : 'Try Again'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutResult;