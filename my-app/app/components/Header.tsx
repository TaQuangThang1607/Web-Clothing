'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, setUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser && typeof parsedUser === 'object') {
            setUser(parsedUser);
          } else {
            setUser(null);
            localStorage.removeItem('user');
          }
        } catch (error) {
          console.error('Lỗi khi parse user từ localStorage:', error);
          setUser(null);
          localStorage.removeItem('user');
        }
      }
    }
  }, [user, setUser]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/'); // Redirect về home
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <a href="/" className="text-xl font-bold text-primary">
          <img src="https://themewagon.github.io/stylish/images/main-logo.png" alt="Logo" className="h-10" />
        </a>

        {/* Hamburger menu (mobile) */}
        <button
          className="lg:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Navigation */}
        <nav className={`flex-col lg:flex-row lg:flex ${isMenuOpen ? 'flex' : 'hidden'} lg:items-center gap-6`}>
          <a href="/" className="hover:text-primary text-black">Home</a>
          <a href="/products" className="hover:text-primary text-black">Products</a>

          <div className="relative">
            <button
              className="hover:text-primary text-black"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Page ▼
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 bg-white shadow-md rounded p-2 z-10">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-black">About Us</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-black">Shop</a>
              </div>
            )}
          </div>
        </nav>

        {/* User section */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <>
              <span className="text-gray-700">Hello, {user.fullName}</span>
              <button onClick={handleLogout} className="text-red-500 hover:underline">
                Logout
              </button>
              <Link href="/admin/products"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Page Admin
              </Link>
            </>
          ) : (
            <a href="/login" className="text-gray-700">Login</a>
          )}

          <a href="#" className="text-gray-700">Cart</a>
        </div>
      </div>
    </header>
  );
}
