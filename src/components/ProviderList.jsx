import { useEffect, useState } from 'react';
import axios from 'axios';
import ProviderForm from './ProviderForm';
import DefaultURL from '../common/common';

export default function ProviderList() {
  const [providers, setProviders] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchProviders = async () => {
    const res = await axios.get(`${DefaultURL.apiUrl}/providers`);
    setProviders(res.data);
  };

  const deleteProvider = async (id) => {
    await axios.delete(`${DefaultURL.apiUrl}/providers/${id}`);
    fetchProviders();
  };

  const editProvider = (provider) => {
    setSelected(provider);
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <ProviderForm selectedProvider={selected} onSuccess={fetchProviders} />
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Lista de Proveedores</h2>
      <ul className="space-y-3">
        {providers.map(p => (
          <li
            key={p.id}
            className="flex items-center justify-between bg-gray-50 p-4 rounded hover:bg-gray-100 transition"
          >
            <span className="text-gray-700">{p.name} - {p.address}</span>
            <div className="space-x-2">
              <button
                onClick={() => editProvider(p)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Editar
              </button>
              <button
                onClick={() => deleteProvider(p.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
