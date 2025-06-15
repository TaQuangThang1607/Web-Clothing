'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAllProductsInClient } from '../services/client/clientService';
import { Product } from '../types/product';
import { PageResponse } from '../types/dto/apiResponse';
import { useTranslations } from 'next-intl';

const API_BASE_URL = 'http://localhost:8080';

export default function ProductsByIdsView() {
  const t = useTranslations('Product');
  const tCart = useTranslations('Cart');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response: PageResponse<Product> = await getAllProductsInClient(0, 10, 'name,asc');
        const fetchedProducts = response.content;

        const shuffled = [...fetchedProducts].sort(() => 0.5 - Math.random());
        setProducts(shuffled);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-black">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{t('featured')}</h2>
          <Link href="/products">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition duration-300">
              {t('viewAll')}
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="border rounded-lg overflow-hidden shadow animate-pulse">
                <div className="p-4">
                  <div className="w-full h-48 bg-gray-200 mb-3"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center py-8">
        <p className="text-gray-600">{t('noProducts')}</p>
        <Link href="/products">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition duration-300 mt-4">
            {t('viewAll')}
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{t('featured')}</h2>
        <Link href="/products">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition duration-300">
            {t('viewAll')}
          </button>
        </Link>
      </div>
      
      <div className="text-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
            <div className="p-4">
              <img
                src={product.imageUrl?.startsWith('http') ? product.imageUrl : `${API_BASE_URL}${product.imageUrl || '/placeholder-product.png'}`}
                alt={product.name}
                className="w-full h-48 object-cover mb-3"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-product.png';
                }}
              />
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-gray-600 text-sm line-clamp-2">{product.description || t('noDescription')}</p>
              <p className="text-green-600 font-bold mt-2">
                ${product.price.toLocaleString('vi-VN', { minimumFractionDigits: 0 })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}