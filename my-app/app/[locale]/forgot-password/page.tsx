'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import axios from 'axios';
import FooterPage from '../components/Footer';
import Header from '../components/Header';

export default function ForgotPasswordPage() {
  const t = useTranslations('common');
  const router = useRouter();
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/auth/forgot-password',
        null,
        { params: { email } }
      );

      if (response.status === 200) {
        setMessage(t('forgotPassword.successMessage'));
      }
    } catch (err) {
      setError(t('forgotPassword.errorMessage') || 'Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  };

  return (
    <>
    <Header />
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-black">
      <h1 className="text-2xl font-bold mb-4">{t('forgotPassword.title')}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            {t('forgotPassword.emailLabel')}
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {t('forgotPassword.submitButton')}
        </button>
        {message && <p className="mt-2 text-green-600">{message}</p>}
        {error && <p className="mt-2 text-red-600">{error}</p>}
      </form>
      <p className="mt-4 text-sm text-gray-600">
        <a href={pathname.replace('/forgot-password', '')} className="text-indigo-600 hover:underline">
          {t('forgotPassword.backToLogin')}
        </a>
      </p>
    </div>
    </>
  );
}