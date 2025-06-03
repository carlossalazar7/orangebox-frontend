import { Link, useLocation } from 'react-router-dom';

export default function Header() {
    const location = useLocation();

    return (
        <header className="w-full bg-orange-500 shadow text-white mb-8">
            <div className="max-w-6xl mx-auto flex items-center justify-center px-6 py-4">
                <div className="flex items-center gap-3">
                    <Link to="/">
                        <img src="https://img.icons8.com/color/48/orange.png" alt="Logo" className="w-10 h-10 cursor-pointer" />
                    </Link>
                </div>
            </div>
        </header>
    );
}