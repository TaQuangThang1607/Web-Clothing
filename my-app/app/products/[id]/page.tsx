'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { getProductById } from '@/app/services/productService';
import { Product } from '@/app/types/product';
import { addToCartApi } from '@/app/services/client/CartService';
import { toast } from 'react-toastify';

export default function ProductDetailClientPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCartIds, setAddedToCartIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const productId = parseInt(params.id as string);
    getProductById(productId).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [params.id]);

  const handleAddToCart = async (product: Product) => {
    try {
      await addToCartApi(product.id, quantity);
      setAddedToCartIds((prev) => new Set(prev).add(product.id));
      toast.success(`${product.name} đã được thêm vào giỏ hàng`);
    } catch (err: any) {
      toast.error(err.message || 'Lỗi khi thêm sản phẩm vào giỏ hàng');
    }
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
    <div className="max-w-6xl mx-auto px-4 py-12 text-black">
      {/* Sản phẩm */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Hình ảnh */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <div className="relative h-[500px] w-full rounded-2xl overflow-hidden">
            <Image
              src={`http://localhost:8080${product.imageUrl}`}
              alt={product.name}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="flex flex-col justify-between bg-white p-6 rounded-2xl shadow-md">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl text-red-600 font-semibold mb-4">
              {product.price != null ? product.price.toLocaleString('vi-VN', { minimumFractionDigits: 0 }) : 'N/A'}  đ
            </p>
            <p> Size giày: {product.size}</p>
            <p> Thương hiệu: {product.brand}</p><br />
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Số lượng và nút thêm giỏ */}
          <div className="mt-6 flex items-center gap-4 flex-wrap">
            {/* Bộ đếm */}
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                className="px-4 py-2 text-xl font-bold hover:bg-gray-100"
                onClick={decreaseQuantity}
              >
                -
              </button>
              <span className="px-6 py-2 border-x text-lg">{quantity}</span>
              <button
                className="px-4 py-2 text-xl font-bold hover:bg-gray-100"
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>

            {/* Nút thêm giỏ */}
            <button
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart(product);
              }}
              disabled={addedToCartIds.has(product.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium shadow-md transition duration-200 ${
                addedToCartIds.has(product.id)
                  ? 'bg-green-100 text-green-600 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              {addedToCartIds.has(product.id) ? 'Đã thêm!' : 'Thêm vào giỏ'}
            </button>
          </div>
        </div>
      </div>

      {/* Bình luận */}
      <div className="mt-14 bg-white p-6 md:p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Bình luận</h2>
        <div className="space-y-6">
          {[
            { name: 'Nguyễn Văn A', comment: 'Sản phẩm rất chất lượng, giao hàng nhanh!' },
            { name: 'Trần Thị B', comment: 'Mình rất hài lòng, sẽ mua lần sau ❤️' },
            { name: 'Lê Văn C', comment: 'Đóng gói cẩn thận, sản phẩm đúng mô tả.' },
          ].map((c, i) => (
            <div key={i} className="border-b pb-4">
              <p className="font-semibold text-gray-800">{c.name}</p>
              <p className="text-gray-600">{c.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
