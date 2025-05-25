// app/admin/products/page.tsx
// app/admin/product/page.tsx
'use client';

import ProductTable from '@/app/components/ProductTable';
import { getAllProducts } from '@/app/services/productService';
import { Product } from '@/app/types/product';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProductListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(parseInt(searchParams.get('page') || '0'));
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await getAllProducts(currentPage, 10);
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    router.push(`/admin/products?page=${newPage}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Danh sách sản phẩm</h2>
      <Link href="/admin/products/create" className="inline-block mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Thêm sản phẩm mới
      </Link>
      {isLoading ? (
        <p>Đang tải...</p>
      ) : (
        <ProductTable
          products={products}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}