import ProductList from '../components/ProductList';

const ProductsPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8 container-products">
      <div className="w-3/4 bg-white rounded-xl shadow-lg p-8 flex flex-col items-start justify-start products-container">
        <ProductList />
      </div>
    </div>
  );
};

export default ProductsPage;