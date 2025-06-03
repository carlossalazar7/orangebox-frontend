import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import DefaultURL from '../common/DefaultURL';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await axios.get(`${DefaultURL.apiUrl}/products`);
    setProducts(res.data);
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (!confirmDelete) return;
    await axios.delete(`${DefaultURL.apiUrl}/products/${id}`);
    toast.success('Producto eliminado exitosamente');
    fetchProducts();
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
            onClick={() => navigate(`/products/edit/${params.row.id}`)}
            className="btn-table"
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

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-4xl mx-auto mt-8 px-6 py-8 bg-white rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Productos</h1>
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition btn-nav"
        >
          ← Regresar
        </button>
        <button
          onClick={() => navigate('/products/create')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition btn-nav"
        >
          + Nuevo Producto
        </button>
      </div>
      <div className="mb-4 flex justify-end">
        <input
          id="outlined-search"
          type="search"
          variant="outlined"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input-search"
          placeholder='Buscar producto...'
          InputProps={{
            className: "rounded focus:ring-2 focus:ring-orange-400"
          }}
        />
      </div>
      <div className="table-mobile">
      <div style={{ minWidth: "800px" }}>
        <DataGrid
          rows={filteredProducts}
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
    </div>
  );
}