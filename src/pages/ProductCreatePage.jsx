import ProductForm from '../components/ProductForm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ProductCreatePage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 container-products">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
        >
          ← Regresar
        </button>
        <ProductForm
          onSuccess={() => {
            toast.success('Producto creado exitosamente');
            setTimeout(() => navigate('/products'), 2000);
          }}
        />
      </div>
    </div>
  );
}