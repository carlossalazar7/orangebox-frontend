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
    <div>
      <ProviderForm selectedProvider={selected} onSuccess={fetchProviders} />
      <h2>Lista de Proveedores</h2>
      <ul>
        {providers.map(p => (
          <li key={p.id}>
            {p.name} - {p.address}
            <button onClick={() => editProvider(p)}>Editar</button>
            <button onClick={() => deleteProvider(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
