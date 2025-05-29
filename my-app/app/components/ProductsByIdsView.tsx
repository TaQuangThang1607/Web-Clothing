'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Product } from '../types/product';
import { getAllProductsInClient } from '../services/client/clientService';

export default function RandomProductsView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await getAllProductsInClient();
        
        const validatedProducts = allProducts.map(product => ({
          ...product,
          price: product.price || 0,
          imageUrl: product.imageUrl || '/placeholder-product.png'
        }));
        
        // Shuffle logic
        const shuffled = [...validatedProducts].sort(() => 0.5 - Math.random());
        setProducts(shuffled.slice(0, 10));
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchRandomProducts();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
        <Link href="/products">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition duration-300">
            View All Products
          </button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
            <div className="p-4">
              <img 
                  src={product.imageUrl.startsWith('http') 
                       ? product.imageUrl 
                       : `http://localhost:8080${product.imageUrl}`}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-3"
                  onError={(e) => {
                    // Simply hide the image if it fails to load
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                
                />
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
              <p className="text-green-600 font-bold mt-2">
                ${typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}