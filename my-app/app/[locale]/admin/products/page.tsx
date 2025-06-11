'use client';


import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { Product } from '../../types/product';
import { getAllProducts } from '../../services/productService';
import ProductTable from '../../components/ProductTable';


export default function ProductListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUser();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(searchParams.get('page') || '0')
  );
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Lấy danh sách sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getAllProducts(currentPage, 10);
        setProducts(data.content);
        setTotalPages(data.totalPages);
      } catch (error: any) {
        console.error('Lỗi khi lấy sản phẩm:', error);
        setError(error.message || 'Không thể tải danh sách sản phẩm');
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
      <h2 className="text-xl font-semibold mb-4 text-black">Danh sách sản phẩm</h2>
      <Link
        href="/admin/products/create"
        className="inline-block mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Thêm sản phẩm mới
      </Link>
      {error && <p className="text-red-500 mb-4">{error}</p>}
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