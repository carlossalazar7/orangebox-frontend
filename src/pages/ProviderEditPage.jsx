import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProviderForm from '../components/ProviderForm';
import axios from 'axios';
import DefaultURL from '../common/common';

export default function ProviderEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedProvider, setSelectedProvider] = useState(null);

  useEffect(() => {
    const fetchProvider = async () => {
      const res = await axios.get(`${DefaultURL.apiUrl}/providers/${id}`);
      setSelectedProvider(res.data);
    };
    fetchProvider();
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
        {selectedProvider && (
          <ProviderForm
            selectedProvider={selectedProvider}
            onSuccess={() => navigate('/providers')}
          />
        )}
      </div>
    </div>
  );
}