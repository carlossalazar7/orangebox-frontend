import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
    const location = useLocation();
    const [dark, setDark] = useState(() => {
        const stored = localStorage.getItem('theme');
        return stored ? stored === 'dark' : true;
    });

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [dark]);

    return (
        <header className="w-full bg-orange-500 shadow text-white mb-8">
            <div className="max-w-6xl mx-auto flex items-center justify-center px-6 py-4 theme">
                <div className="flex items-center gap-3">
                    <Link to="/">
                        <img src="https://img.icons8.com/color/48/orange.png" alt="Logo" className="w-10 h-10 cursor-pointer" />
                    </Link>
                </div>
                <div className='container-header flex items-center justify-between w-full'>
                    <button
                        onClick={() => setDark(!dark)}
                        className="ml-2 px-3 py-1 rounded bg-white/20 hover:bg-white/40 text-white font-semibold transition border-2 border-white focus:ring-2 focus:ring-orange-300 border-theme"
                        title="Cambiar tema"
                    >
                        {dark ? '🌙' : '☀️'}
                    </button>
                </div>
            </div>
        </header>
    );
}