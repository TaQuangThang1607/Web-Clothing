'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import Link from 'next/link';
import { useCart } from '../context/CartContextType';
// app/component/Header.tsx
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, setUser } = useUser();
  const { totalItems } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!user && typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser && typeof parsedUser === 'object') {
            setUser(parsedUser);
          } else {
            localStorage.removeItem('user');
          }
        } catch (error) {
          console.error('Lỗi khi parse user từ localStorage:', error);
          localStorage.removeItem('user');
        }
      }
    }
  }, [user]); // Loại bỏ setUser khỏi dependency vì nó stable

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          <img
            src="https://themewagon.github.io/stylish/images/main-logo.png"
            alt="Logo"
            className="h-10"
          />
        </Link>

        {/* Hamburger menu (mobile) */}
        <button
          className="lg:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Navigation */}
        <nav
          className={`flex-col lg:flex-row lg:flex ${isMenuOpen ? 'flex' : 'hidden'} lg:items-center gap-6 absolute lg:static top-16 left-0 w-full lg:w-auto bg-white lg:bg-transparent p-4 lg:p-0 z-20`}
        >
          <Link href="/" className="hover:text-blue-600 text-gray-900">
            Trang chủ
          </Link>
          <Link href="/products" className="hover:text-blue-600 text-gray-900">
            Sản phẩm
          </Link>
          <div className="relative">
            <button
              className="hover:text-blue-600 text-gray-900 flex items-center"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Trang <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 bg-white shadow-md rounded p-2 z-10 min-w-[150px]">
                <Link href="/about" className="block px-4 py-2 hover:bg-gray-100 text-gray-900">
                  Về chúng tôi
                </Link>
                <Link href="/shop" className="block px-4 py-2 hover:bg-gray-100 text-gray-900">
                  Cửa hàng
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* User section */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-gray-700">Xin chào, {user.fullName}</span>
              <button onClick={handleLogout} className="text-red-500 hover:underline">
                Đăng xuất
              </button>
              <Link
                href="/admin/products"
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Trang quản trị
              </Link>
            </>
          ) : (
            <Link href="/login" className="text-gray-700 hover:text-blue-600">
              Đăng nhập
            </Link>
          )}
          <Link href="/cart" className="relative flex items-center text-gray-700 hover:text-blue-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}