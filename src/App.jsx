import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import ProvidersPage from './pages/ProvidersPage';
import ProviderCreatePage from './pages/ProviderCreatePage';
import Home from './components/Home';
import ProviderEditPage from './pages/ProviderEditPage';
import ProductEditPage from './pages/ProductEditPage';
import ProductCreatePage from './pages/ProductCreatePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/providers" element={<ProvidersPage />} />
        <Route path="/providers/create" element={<ProviderCreatePage />} />
        <Route path="/providers/edit/:id" element={<ProviderEditPage />} />
        <Route path="/products/create" element={<ProductCreatePage />} />
        <Route path="/products/edit/:id" element={<ProductEditPage />} />
      </Routes>
        <ToastContainer position="top-center" autoClose={2000} />
    </Router>
  );
}