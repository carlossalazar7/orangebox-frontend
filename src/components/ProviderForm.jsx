import { useState, useEffect } from 'react';
import axios from 'axios';
import DefaultURL from '../common/DefaultURL';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';


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
        } else {
            setFormData({ name: '', address: '', phone: '', description: '' });
        }
    }, [selectedProvider]);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };


    const phoneRegex = /^\d{4}-\d{4}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!phoneRegex.test(formData.phone)) {
            alert('El teléfono debe tener el formato 7777-7777');
            return;
        }

        if (selectedProvider) {
            await axios.put(`${DefaultURL.apiUrl}/providers/${selectedProvider.id}`, formData);
        } else {
            await axios.post(`${DefaultURL.apiUrl}/providers`, formData);
        }

        setFormData({ name: '', address: '', phone: '', description: '' });
        onSuccess();
    };


    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow p-6 mb-8 flex flex-col gap-4 w-full max-w-xl"
        >
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {selectedProvider ? 'Editar Proveedor' : 'Nuevo Proveedor'}
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
                    id="address"
                    name="address"
                    label="Dirección"
                    variant="outlined"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    style={{ padding: '10px' }}
                    id="phone"
                    name="phone"
                    label="Teléfono"
                    variant="outlined"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                    placeholder="7777-7777"
                    inputProps={{ maxLength: 9, pattern: "\\d{4}-\\d{4}" }}
                    helperText="Formato: 7777-7777"
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
            </div>
            <Button
                type="submit"
                variant="contained"
                color="warning"
                className="mt-2 font-semibold"
                sx={{ mt: 2 }}
            >
                {selectedProvider ? 'Actualizar' : 'Crear'}
            </Button>
        </form>
    );
}