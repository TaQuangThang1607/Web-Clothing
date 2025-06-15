'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function FooterPage() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <nav className="mb-4">
          <ul className="flex justify-center space-x-6">
            <li>
              <Link href="/" className="hover:text-gray-300">
                {t('home')}
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-gray-300">
                {t('products')}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-300">
                {t('contact')}
              </Link>
            </li>
          </ul>
        </nav>
        <p className="text-sm">
          {t('copyright', { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}