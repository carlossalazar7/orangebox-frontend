import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';
import DefaultURL from '../common/common';


export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);

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

  return (
    <div>
      <ProductForm selectedProduct={selected} onSuccess={fetchProducts} />
      <h2>Lista de Productos</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} - ${p.price}
            <button onClick={() => editProduct(p)}>Editar</button>
            <button onClick={() => deleteProduct(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}