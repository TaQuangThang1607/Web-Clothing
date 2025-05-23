'use client'
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <a href="/" className="text-xl font-bold text-primary">
          <img src="/images/main-logo.png" alt="Logo" className="h-10" />
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
          <a href="#" className="hover:text-primary text-black">Home</a>
          <a href="#" className="hover:text-primary text-black">Men</a>
          <a href="#" className="hover:text-primary text-black">Women</a>

          {/* Dropdown Example */}
          <div className="relative">
            <button
              className="hover:text-primary text-black"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Page ▼
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 bg-white shadow-md rounded p-2 z-10">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-black" >About Us</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-black">Shop</a>
              </div>
            )}
          </div>
        </nav>

        {/* Icons */}
        <div className="hidden lg:flex items-center gap-4">
          <a href="#" className="text-gray-700">👤</a>
          <a href="#" className="text-gray-700">🛒</a>
          <a href="#" className="text-gray-700">🔍</a>
        </div>
      </div>
    </header>
  );
}
