import { useState, useEffect } from 'react';
import axios from 'axios';
import DefaultURL from '../common/common';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
        } else {
            setFormData({ name: '', price: '', description: '', providerId: '' });
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

        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow p-6 mb-8 flex flex-col gap-4 w-full max-w-xl"
        >
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {selectedProduct ? 'Editar Producto' : 'Nuevo Producto'}
            </h3>
            <div className="space-y-4">
                <TextField
                    style={{ padding: '10px' }}
                    id="name"
                    name="name"
                    label="Nombre"
                    variant="outlined"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    style={{ padding: '10px' }}
                    id="price"
                    name="price"
                    label="Precio"
                    type="number"
                    variant="outlined"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    style={{ padding: '10px' }}
                    id="description"
                    name="description"
                    label="Descripción"
                    variant="outlined"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    style={{ padding: '10px' }}
                    id="providerId"
                    name="providerId"
                    label="ID del proveedor"
                    type="number"
                    variant="outlined"
                    value={formData.providerId}
                    onChange={handleChange}
                    fullWidth
                />
            </div>
            <Button
                type="submit"
                variant="contained"
                color="warning"
                className="mt-2 font-semibold"
                sx={{ mt: 2 }}
            >
                {selectedProduct ? 'Actualizar' : 'Crear'}
            </Button>
        </form>
    );
}