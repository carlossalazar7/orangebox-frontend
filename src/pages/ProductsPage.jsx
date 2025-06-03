import ProductList from '../components/ProductList';

const ProductsPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 container-products mx-auto">
      <div className="w-3/4">
        <ProductList />
      </div>
    </div>
  );
};

export default ProductsPage;