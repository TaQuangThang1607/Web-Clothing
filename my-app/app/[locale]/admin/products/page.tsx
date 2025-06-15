'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { Product } from '../../types/product';
import { getAllProducts } from '../../services/productService';
import ProductTable from '../../components/ProductTable';
import { useTranslations } from 'next-intl';

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
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get('search') || ''
  );
  const [selectedBrand, setSelectedBrand] = useState<string>(
    searchParams.get('brand') || ''
  );
  const t = useTranslations();

  // Danh sách brand để lọc
  const brands = ['Nike', 'Converse', 'Adidas', 'Jordan', 'Vans'];

  // Lấy danh sách sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getAllProducts(currentPage, 10, searchTerm, selectedBrand);
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
  }, [currentPage, searchTerm, selectedBrand]);

  // Xử lý thay đổi trang
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    if (searchTerm) params.set('search', searchTerm);
    if (selectedBrand) params.set('brand', selectedBrand);
    router.push(`/admin/products?${params.toString()}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setCurrentPage(0);
    const params = new URLSearchParams(searchParams);
    params.set('page', '0');
    if (newSearchTerm) params.set('search', newSearchTerm);
    else params.delete('search');
    if (selectedBrand) params.set('brand', selectedBrand);
    router.push(`/admin/products?${params.toString()}`);
  };

  // Xử lý lọc theo brand
  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBrand = e.target.value;
    setSelectedBrand(newBrand);
    setCurrentPage(0); // Reset về trang đầu khi lọc
    const params = new URLSearchParams(searchParams);
    params.set('page', '0');
    if (searchTerm) params.set('search', searchTerm);
    if (newBrand) params.set('brand', newBrand);
    else params.delete('brand');
    router.push(`/admin/products?${params.toString()}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4 text-black">{t('ProductPage.searchTitle')}</h2>
      <div className="flex justify-between mb-4">
        <div className="flex gap-4 text-black">
          <input
            type="text"
            placeholder={t('ProductPage.searchPlaceholder')}
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={selectedBrand}
            onChange={handleBrandChange}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{t('ProductPage.brand')}</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <Link
          href="/admin/products/create"
          className="inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {t('Product.addToCart')}
        </Link>
      </div>
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