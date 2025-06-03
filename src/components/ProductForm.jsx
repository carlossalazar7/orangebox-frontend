import { useState, useEffect } from 'react';
import axios from 'axios';
import DefaultURL from '../common/common';

export default function ProductForm({ selectedProduct, onSuccess }) {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        providerId: ''
    });

    useEffect(() => {
        if (selectedProduct) {
            setFormData(selectedProduct);
        }
    }, [selectedProduct]);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedProduct) {
            await axios.put(`${DefaultURL.apiUrl}/products/${selectedProduct.id}`, formData);
        } else {
            await axios.post(`${DefaultURL.apiUrl}/products`, formData);
        }

        setFormData({ name: '', price: '', description: '', providerId: '' });
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>{selectedProduct ? 'Editar Producto' : 'Nuevo Producto'}</h3>
            <input name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />
            <input name="price" type="number" placeholder="Precio" value={formData.price} onChange={handleChange} required />
            <input name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} />
            <input name="providerId" type="number" placeholder="ID del proveedor" value={formData.providerId} onChange={handleChange} />
            <button type="submit">{selectedProduct ? 'Actualizar' : 'Crear'}</button>
        </form>
    );
}