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
  const [error, setError] = useState<string | null>(null);

   useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await getAllProducts(currentPage);
        setProducts(data.products || []);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Lỗi không xác định');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  if (isLoading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    router.push(`/admin/products?page=${newPage}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-black text-xl font-semibold mb-4">Danh sách sản phẩm</h2>
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