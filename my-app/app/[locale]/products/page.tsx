'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import debounce from 'lodash/debounce';
import { toast } from 'react-toastify';
import { Product } from '../types/product';
import { getAllPageProducts, getBrandsCount } from '../services/client/viewpageProduct';
import { PageResponse } from '../types/dto/apiResponse';
import { addToCartApi } from '../services/client/CartService';
import Header from '../components/Header';
import FooterPage from '../components/Footer';
import { useLocale, useTranslations } from 'next-intl';

const API_BASE_URL = 'http://localhost:8080';

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState('name,asc');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000000 });
  const locale = useLocale();

  const t = useTranslations('ProductPage');
  const tProduct = useTranslations('Product');

  const [brands, setBrands] = useState([
    { name: 'Nike' },
    { name: 'Converse'},
    { name: 'Adidas'},
    { name: 'Jordan'},
    { name: 'Vans'},
  ]);

  const [addedToCartIds, setAddedToCartIds] = useState<Set<number>>(new Set());

  // Hàm định dạng giá theo locale
  const formatPrice = (price: number) => {
    if (locale === 'vi') {
      return price.toLocaleString('vi-VN', { minimumFractionDigits: 0 }) + ' VND';
    }
    return '$' + price.toLocaleString('en-US', { minimumFractionDigits: 0 });
  };

  // Đọc brand từ URL khi tải trang
  useEffect(() => {
    const brandFromUrl = searchParams.get('brand');
    setSelectedBrand(brandFromUrl || null);
  }, [searchParams]);

  const fetchProducts = useCallback(
    debounce(async (page: number, search: string, brand: string | null, minPrice: number, maxPrice: number, sort: string) => {
      try {
        setLoading(true);
        const response: PageResponse<Product> = await getAllPageProducts(
          page,
          9,
          sort,
          search,
          brand || '',
          minPrice,
          maxPrice
        );
        setProducts(response.content);
        setTotalPages(response.totalPages);

        if (!brand && page === 0) {
          const fullResponse = await getAllPageProducts(0, 1000, sort, search, '', minPrice, maxPrice);
          setAllProducts(fullResponse.content);
        }

        const brandsCount = await getBrandsCount(search, minPrice, maxPrice);
        setBrands((prevBrands) =>
          prevBrands.map((b) => ({
            ...b,
            count: brandsCount.get(b.name) || 0,
          }))
        );

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
        setLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchProducts(currentPage, searchTerm, selectedBrand, priceRange.min, priceRange.max, sort);
  }, [currentPage, searchTerm, selectedBrand, priceRange, sort, fetchProducts]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleBrandFilter = (brand: string | null) => {
    setSelectedBrand(brand);
    setCurrentPage(0);
    // Cập nhật URL
    const newParams = new URLSearchParams(searchParams.toString());
    if (brand) {
      newParams.set('brand', brand);
    } else {
      newParams.delete('brand');
    }
    router.push(`?${newParams.toString()}`);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPriceRange((prev) => ({ ...prev, max: value }));
    setCurrentPage(0);
  };

  const handleAddToCart = async (product: Product) => {
    try {
      await addToCartApi(product.id, 1);
      setAddedToCartIds((prev) => new Set(prev).add(product.id));
      toast.success(`${product.name} ${tProduct('added')}`);
    } catch (err: any) {
      toast.error(err.message || 'Lỗi khi thêm sản phẩm vào giỏ hàng');
    }
  };

  if (loading) {
    return (
      <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('searchTitle')}</h1>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-3">
              <div className="space-y-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="space-y-2">
                  {brands.map((_, index) => (
                    <div key={index} className="h-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-2 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="lg:col-span-9">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(9)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden shadow animate-pulse">
                      <div className="w-full h-48 bg-gray-200"></div>
                      <div className="p-4">
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <div className="text-red-500">{error}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('searchTitle')}</h1>
          <div className="grid grid-cols-1 gap-6">
            <div className="col-span-1">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-4">
                  <div className="flex w-full">
                    <input
                      type="search"
                      className="text-black flex-grow p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={t('searchPlaceholder')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span
                      className="bg-gray-100 p-3 border border-l-0 border-gray-300 rounded-r-md cursor-pointer hover:bg-gray-200"
                      onClick={() => fetchProducts(currentPage, searchTerm, selectedBrand, priceRange.min, priceRange.max, sort)}
                    >
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="lg:col-span-5"></div>
                <div className="lg:col-span-3">
                  <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                    <label htmlFor="sort" className="text-gray-700">{t('sortBy')}</label>
                    <select
                      id="sort"
                      className="bg-gray-50 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded text-black"
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                    >
                      <option value="name,asc">{t('sortNameAsc')}</option>
                      <option value="name,desc">{t('sortNameDesc')}</option>
                      <option value="price,asc">{t('sortPriceAsc')}</option>
                      <option value="price,desc">{t('sortPriceDesc')}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
                <div className="lg:col-span-3">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{t('brand')}</h4>
                      <ul className="space-y-2">
                        <li
                          className={`flex justify-between items-center cursor-pointer ${selectedBrand === null ? 'text-blue-500 font-medium' : 'text-gray-700 hover:text-blue-500'}`}
                          onClick={() => handleBrandFilter(null)}
                        >
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {t('allProducts')}
                          </span>
                          <span className="text-gray-500">({allProducts.length})</span>
                        </li>
                        {brands.map((brand, index) => (
                          <li
                            key={index}
                            className={`flex justify-between items-center cursor-pointer ${selectedBrand === brand.name ? 'text-blue-500 font-medium' : 'text-gray-700 hover:text-blue-500'}`}
                            onClick={() => handleBrandFilter(brand.name)}
                          >
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {brand.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{t('price')}</h4>
                      <input
                        type="range"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        min="0"
                        max="10000000"
                        value={priceRange.max}
                        onChange={handlePriceChange}
                      />
                      <div className="flex justify-between text-gray-700">
                        <span>{locale === 'vi' ? '0 đ' : '$0'}</span>
                        <span>
                          {priceRange.max != null ? formatPrice(priceRange.max) : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-9">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <Link href={`/${locale}/products/${product.id}`} key={product.id}>
                        <div className="relative rounded-lg shadow-md overflow-hidden">
                          <div className="relative">
                            <img
                              src={product.imageUrl?.startsWith('http') ? product.imageUrl : `${API_BASE_URL}${product.imageUrl || '/placeholder-product.png'}`}
                              alt={product.name}
                              className="w-full h-48 object-cover rounded-t-lg"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder-product.png';
                              }}
                            />
                          </div>
                          <div className="p-4 border border-t-0 border-gray-200 rounded-b-lg">
                            <h4 className="text-lg font-semibold text-gray-900">{product.name}</h4>
                            <p className="text-gray-600 text-sm line-clamp-2">{product.description || tProduct('noDescription')}</p>
                            <div className="flex justify-between items-center mt-4 flex-wrap">
                              <p className="text-gray-900 font-bold text-lg">
                                {product.price != null ? formatPrice(product.price) : 'N/A'}
                              </p>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleAddToCart(product);
                                }}
                                className={`flex items-center ${addedToCartIds.has(product.id) ? 'text-green-500' : 'text-blue-500 hover:text-blue-700'}`}
                                disabled={addedToCartIds.has(product.id)}
                              >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                {addedToCartIds.has(product.id) ? tProduct('added') : tProduct('addToCart')}
                              </button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                    {products.length === 0 && (
                      <div className="col-span-3 text-center py-10">
                        <p className="text-gray-500 text-lg">{t('noProductsFound')}</p>
                      </div>
                    )}
                    <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                      <div className="flex justify-center mt-8 space-x-2">
                        <button
                          onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
                          disabled={currentPage === 0}
                          className="px-3 py-2 border border-gray-300 rounded hover:bg-blue-500 hover:text-white disabled:opacity-50"
                        >
                          «
                        </button>
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i).map((page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-2 border border-gray-300 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'}`}
                          >
                            {page + 1}
                          </button>
                        ))}
                        <button
                          onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
                          disabled={currentPage >= totalPages - 1}
                          className="px-3 py-2 border border-gray-300 rounded hover:bg-blue-500 hover:text-white disabled:opacity-50"
                        >
                          »
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterPage />
    </>
  );
}