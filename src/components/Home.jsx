import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import StoreIcon from '@mui/icons-material/Store';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Home() {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();

    const handleNavChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 0) navigate('/');
        if (newValue === 1) navigate('/products');
        if (newValue === 2) navigate('/providers');
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-200">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl px-12 py-16 flex flex-col items-center">
                <div className="flex items-center gap-3 mb-6">
                    <img src="https://img.icons8.com/color/96/orange.png" alt="OrangeBox Logo" className="w-16 h-16" />
                    <h1 className="text-5xl font-extrabold text-orange-500 drop-shadow">OrangeBox</h1>
                </div>
                <p className="text-lg text-gray-600 mb-10 text-center max-w-md">
                    Bienvenido a tu sistema de gestión de productos y proveedores.<br />
                    Selecciona una opción para comenzar.
                </p>
                <div className="flex justify-center w-full navigation-container mb-6">
                    <BottomNavigation
                        value={value}
                        onChange={handleNavChange}
                        showLabels
                        style={{ width: 350, background: 'rgba(255,255,255,0.9)', borderRadius: 16, boxShadow: '0 2px 12px #0001' }}
                    >
                        <BottomNavigationAction label="Inicio" icon={<HomeIcon />} />
                        <BottomNavigationAction label="Productos" icon={<StoreIcon />} />
                        <BottomNavigationAction label="Proveedores" icon={<GroupIcon />} />
                    </BottomNavigation>
                </div>
            </div>
        </main>
    );
}