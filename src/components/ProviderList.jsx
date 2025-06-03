import { useEffect, useState } from 'react';
import axios from 'axios';
import DefaultURL from '../common/common';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

export default function ProviderList() {
  const [providers, setProviders] = useState([]);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

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
    navigate('/providers/edit/' + provider.id);
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const columns = [
    { field: 'name', headerName: 'Nombre', flex: 1 },
    { field: 'address', headerName: 'Dirección', flex: 1 },
    { field: 'phone', headerName: 'Teléfono', flex: 1 },
    {
      field: 'actions',
      headerName: 'Acciones',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-2">
          <button
            onClick={() => editProvider(params.row)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Editar
          </button>
          <button
            onClick={() => deleteProvider(params.row.id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded shadow provider-list p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Lista de Proveedores</h2>
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
        >
          ← Regresar
        </button>
        <button
          onClick={() => navigate('/providers/create')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          + Nuevo Proveedor
        </button>
      </div>
      <div style={{ height: 400, width: 800 }}>
        <DataGrid
        style={{ width: '100%' }}
          rows={providers}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
          getRowId={(row) => row.id}
          localeText={{
            noRowsLabel: 'No hay proveedores registrados aún.',
          }}
        />
      </div>
    </div>
  );
}