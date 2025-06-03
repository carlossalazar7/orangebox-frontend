import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';
import { DataGrid } from '@mui/x-data-grid';
import DefaultURL from '../common/common';
import { useNavigate } from 'react-router-dom';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await axios.get(`${DefaultURL.apiUrl}/products`);
    setProducts(res.data);
  };

  const deleteProduct = async (id) => {
    await axios.delete(`${DefaultURL.apiUrl}/products/${id}`);
    fetchProducts();
  };

  const editProduct = (product) => {
    setSelected(product);
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const columns = [
    { field: 'name', headerName: 'Nombre', flex: 1 },
    { field: 'price', headerName: 'Precio', flex: 1, renderCell: (params) => `$${params.value}` },
    {
      field: 'actions',
      headerName: 'Acciones',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-2">
          <button
            onClick={() => editProduct(params.row)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            ✏️ Editar
          </button>
          <button
            onClick={() => deleteProduct(params.row.id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            🗑️ Eliminar
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-8 px-6 py-8 bg-white rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Productos</h1>
      <div>
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
        >
          ← Regresar
        </button>
      </div>
      <div className="mb-8">
        <ProductForm selectedProduct={selected} onSuccess={fetchProducts} />
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={products}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
          getRowId={(row) => row.id}
          localeText={{
            noRowsLabel: 'No hay productos registrados aún.',
          }}
        />
      </div>
    </div>
  );
}