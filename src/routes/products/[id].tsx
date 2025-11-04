import { useParams } from 'react-router-dom';
import type Product from '../../types/product.type';
import { productService } from '../../services/product.service';
import { useEffect, useState } from 'react';

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>();
  const [selectedImage, setSelectedImage] = useState(0);
  useEffect(() => {
    if (id) {
      productService.getProductById(id).then((product: Product) => {
        setProduct(product);
      });
    }
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex gap-4">
          <div className="aspect-square w-80 overflow-hidden rounded-lg bg-gray-100 flex-shrink-0">
            <img
              src={
                product.images?.length > 0
                  ? `http://localhost:3000${product.images[selectedImage]}`
                  : '/placeholder.jpg'
              }
              alt={product.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.jpg';
              }}
            />
          </div>
          {product.images?.length > 1 && (
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-1 gap-2">
                {product.images.slice(0, 3).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square w-24 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index
                        ? 'border-blue-500'
                        : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={`http://localhost:3000${image}`}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
              {product.images.length > 3 && (
                <div className="flex gap-1 flex-wrap">
                  {product.images.slice(3).map((image, index) => (
                    <button
                      key={index + 3}
                      onClick={() => setSelectedImage(index + 3)}
                      className={`aspect-square w-12 rounded overflow-hidden border ${
                        selectedImage === index + 3
                          ? 'border-blue-500'
                          : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={`http://localhost:3000${image}`}
                        alt={`${product.title} ${index + 4}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            <p className="text-gray-600">{product.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold text-green-600">
              ${product.prix}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                product.stock > 10
                  ? 'bg-green-100 text-green-800'
                  : product.stock > 0
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
              }`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
          <div className="space-y-4">
            <button
              disabled={product.stock === 0}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
          <div className="border-t pt-6 space-y-2 text-sm text-gray-600">
            <p>
              <span className="font-semibold">Product ID:</span> {product._id}
            </p>
            <p>
              <span className="font-semibold">Created:</span>{' '}
              {new Date(product.createdAt).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Last Updated:</span>{' '}
              {new Date(product.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
