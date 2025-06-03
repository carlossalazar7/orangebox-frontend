import { useState, useEffect } from 'react';
import axios from 'axios';
import DefaultURL from '../common/common';

export default function ProviderForm({ selectedProvider, onSuccess }) {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        description: ''
    });

    useEffect(() => {
        if (selectedProvider) {
            setFormData(selectedProvider);
        }
    }, [selectedProvider]);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedProvider) {
            await axios.put(`${DefaultURL.apiUrl}/providers/${selectedProvider.id}`, formData);
        } else {
            await axios.post(`${DefaultURL.apiUrl}/providers`, formData);
        }

        setFormData({ name: '', address: '', phone: '', description: '' });
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>{selectedProvider ? 'Editar Proveedor' : 'Nuevo Proveedor'}</h3>
            <input name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />
            <input name="address" placeholder="Dirección" value={formData.address} onChange={handleChange} required />
            <input name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleChange} />
            <input name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} />
            <button type="submit">{selectedProvider ? 'Actualizar' : 'Crear'}</button>
        </form>
    );
}
