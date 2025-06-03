import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import ProvidersPage from './pages/ProvidersPage';

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/products">Productos</Link>
        <Link to="/providers">Proveedores</Link>
      </nav>
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/providers" element={<ProvidersPage />} />
      </Routes>
    </Router>
  );
}