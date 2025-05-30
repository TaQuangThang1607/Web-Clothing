'use client';

import ProductTable from '@/app/components/ProductTable';
import { getAllProducts } from '@/app/services/productService';
import { Product } from '@/app/types/product';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '@/app/context/UserContext';

export default function ProductListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, setUser } = useUser();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(searchParams.get('page') || '0')
  );
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Kiểm tra quyền ADMIN
  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser && typeof parsedUser === 'object' && parsedUser.role === 'ADMIN') {
            setUser(parsedUser);
          } else {
            router.push('/login');
          }
        } catch (error) {
          console.error('Lỗi parse user từ localStorage:', error);
          localStorage.removeItem('user');
          localStorage.removeItem('access_token');
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    } else if (user.role !== 'ADMIN') {
      router.push('/login');
    }
  }, [user, setUser, router]);

  // Lấy danh sách sản phẩm
  useEffect(() => {
    if (!user || user.role !== 'ADMIN') return;

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
  }, [currentPage, user]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    router.push(`/admin/products?page=${newPage}`);
  };

  if (!user || user.role !== 'ADMIN') {
    return null; // Không render nếu không phải ADMIN
  }

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