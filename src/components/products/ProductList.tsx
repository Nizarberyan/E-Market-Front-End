import type Product from '../../types/product.type';

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {products?.map((product) => (
        <div key={product._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
          <div className="relative overflow-hidden">
            <img
              src={product.images?.length > 0 ? `http://localhost:3000${product.images[0]}` : '/placeholder.jpg'}
              alt={product.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.jpg';
              }}
            />
            {product.stock < 5 && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                Low Stock
              </span>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{product.title}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-green-600">${product.prix}</span>
              <span className="text-sm text-gray-500">{product.stock} in stock</span>
            </div>
            <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
