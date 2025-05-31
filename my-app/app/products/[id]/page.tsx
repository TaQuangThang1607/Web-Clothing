'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { getProductById } from '@/app/services/productService';
import { Product } from '@/app/types/product';

export default function ProductDetailClientPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productId = parseInt(params.id as string);
    getProductById(productId).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [params.id]);

  if (loading) {
    return <div className="text-center py-10">Đang tải...</div>;
  }

  if (!product) {
    return <div className="text-center py-10">Không tìm thấy sản phẩm</div>;
  }

  return (
  <div className="container mx-auto py-10 text-black">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="relative h-96 w-full">
          <Image
            src={`http://localhost:8080${product.imageUrl}`}
            alt={product.name}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        
        {/* Star Rating Section */}
        <div className="flex items-center mb-4">
          <div className="flex">
            
          </div>
          
        </div>

        <p className="text-2xl text-red-600 font-semibold mb-4">
          {Number(product.price).toFixed(2)} $ / {product.size}
        </p>
        
        <p className="mb-6">{product.description}</p>
        
        {/* Add to Cart Button */}
        <div className="flex items-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            Add to Cart
          </button>
          
          {/* Quantity Selector (optional) */}
          <div className="ml-4 flex items-center border rounded-lg">
            <button className="px-3 py-1 text-lg font-medium hover:bg-gray-100 rounded-l-lg">
              -
            </button>
            <span className="px-4 py-1 border-x">1</span>
            <button className="px-3 py-1 text-lg font-medium hover:bg-gray-100 rounded-r-lg">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
