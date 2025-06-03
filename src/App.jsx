import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import ProvidersPage from './pages/ProvidersPage';
import ProviderCreatePage from './pages/ProviderCreatePage';
import Home from './components/Home';
import ProviderEditPage from './pages/ProviderEditPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/providers" element={<ProvidersPage />} />
        <Route path="/providers/create" element={<ProviderCreatePage />} />
        <Route path="/providers/edit/:id" element={<ProviderEditPage />} />
      </Routes>
    </Router>
  );
}