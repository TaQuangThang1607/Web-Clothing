'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import Link from 'next/link';
import { useCart } from '../context/CartContextType';
import { useLocale } from 'next-intl';
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("Navigation");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, setUser } = useUser();
  const { totalItems } = useCart();
  const router = useRouter();
  const locale = useLocale();

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
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setUser(null);
    router.push(`/${locale}`);
  };

  const isAdmin = user?.role === 1;

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="text-xl font-bold text-blue-600">
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
          <Link href={`/${locale}`} className="hover:text-blue-600 text-gray-900">
            {t("home")}
          </Link>
          <Link href={`/${locale}/products`} className="hover:text-blue-600 text-gray-900">
            {t("products")}
          </Link>
        </nav>

        {/* User section */}
        <div className="flex items-center gap-4 relative">
          {/* Language Switcher (✅ sửa lỗi dùng emoji thay icon) */}
          <div className="relative">
            <select
              value={locale}
              onChange={(e) => {
                const newLocale = e.target.value;
                const path = window.location.pathname.replace(/^\/(vi|en)/, '');
                window.location.href = `/${newLocale}${path}`;
              }}
              className="border rounded px-2 py-1 text-gray-700"
            >
              <option value="vi">🇻🇳 Vietnamese</option>
              <option value="en">🇺🇸 English</option>
            </select>
          </div>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-gray-700 hover:text-blue-600 flex items-center gap-1"
              >
                {user.fullName}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-md rounded p-2 z-20 min-w-[160px]">
                  {isAdmin && (
                    <Link
                      href={`/${locale}/admin/products`}
                      className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
                    >
                      {t("pageAdmin")}
                    </Link>
                  )}
                  <Link
                    href={`/${locale}/history`}
                    className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
                  >
                    {t("pageHistory")}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    {t("logout")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href={`/${locale}/login`} className="text-gray-700 hover:text-blue-600">
              
              {t("login")}
            </Link>
          )}

          {/* Cart icon */}
          <Link href={`/${locale}/cart`} className="relative flex items-center text-gray-700 hover:text-blue-600">
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
