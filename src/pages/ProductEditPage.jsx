import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import axios from 'axios';
import DefaultURL from '../common/common';

export default function ProductEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`${DefaultURL.apiUrl}/products/${id}`);
      setSelectedProduct(res.data);
    };
    fetchProduct();
  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 container-products">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
        >
          ← Regresar
        </button>
        {selectedProduct && (
          <ProductForm
            selectedProduct={selectedProduct}
            onSuccess={() => navigate('/products')}
          />
        )}
      </div>
    </div>
  );
}