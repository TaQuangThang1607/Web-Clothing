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
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  

  useEffect(() => {
    const productId = parseInt(params.id as string);
    getProductById(productId).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [params.id]);

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product?.name} to cart`);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const increaseQuantity = () => setQuantity((q) => q + 1);
  const decreaseQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  if (loading) {
    return <div className="text-center py-10 text-gray-700">Đang tải...</div>;
  }

  if (!product) {
    return <div className="text-center py-10 text-gray-700">Không tìm thấy sản phẩm</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4 text-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white p-4 rounded-2xl shadow-lg">
          <div className="relative h-96 w-full">
            <Image
              src={`http://localhost:8080${product.imageUrl}`}
              alt={product.name}
              fill
              className="object-contain rounded-2xl"
              priority
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl text-red-600 font-semibold mb-4">
              {Number(product.price).toFixed(2)} $ / {product.size}
            </p>
            <p className="mb-6 text-gray-700">{product.description}</p>
          </div>

          <div className="flex items-center mb-6">
            <div className="flex items-center border rounded-lg">
              <button
                className="px-4 py-2 text-lg font-medium hover:bg-gray-100 rounded-l-lg"
                onClick={decreaseQuantity}
              >
                -
              </button>
              <span className="px-6 py-2 border-x">{quantity}</span>
              <button
                className="px-4 py-2 text-lg font-medium hover:bg-gray-100 rounded-r-lg"
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className={`ml-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center ${
                addedToCart ? 'bg-green-600 hover:bg-green-700' : ''
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              {addedToCart ? 'Đã thêm!' : 'Thêm vào giỏ'}
            </button>
          </div>
        </div>
      </div>

      {/* Bình luận tĩnh */}
      <div className="mt-12 bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Bình luận</h2>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <p className="font-semibold">Nguyễn Văn A</p>
            <p className="text-gray-600">Sản phẩm rất chất lượng, giao hàng nhanh!</p>
          </div>
          <div className="border-b pb-4">
            <p className="font-semibold">Trần Thị B</p>
            <p className="text-gray-600">Mình rất hài lòng, sẽ mua lần sau ❤️</p>
          </div>
          <div>
            <p className="font-semibold">Lê Văn C</p>
            <p className="text-gray-600">Đóng gói cẩn thận, sản phẩm đúng mô tả.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
