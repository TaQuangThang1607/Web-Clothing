'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import axios from 'axios';
import Header from '../components/Header';

export default function ResetPasswordPage() {
  const t = useTranslations('common');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const urlToken = searchParams.get('token');
    if (urlToken) {
      setToken(urlToken);
    } else {
      setError(t('resetPassword.invalidToken'));
    }
  }, [searchParams, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!token) {
      setError(t('resetPassword.invalidToken'));
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t('resetPassword.passwordMismatch'));
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/auth/reset-password?token=${token}&newPassword=${newPassword}`
      );

      if (response.status === 200) {
        setMessage(t('resetPassword.successMessage'));
        setTimeout(() => router.push('/login'), 2000); // Chuyển hướng sau 2 giây
      }
    } catch (err) {
      setError(t('resetPassword.errorMessage') || 'Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  };

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-center">
        <p className="text-red-600">{error}</p>
        <a href="/forgot-password" className="text-indigo-600 hover:underline mt-4 block">
          {t('resetPassword.backToForgot')}
        </a>
      </div>
    );
  }

  return (
    <>
    <Header />
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-black">
      <h1 className="text-2xl font-bold mb-4">{t('resetPassword.title')}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
            {t('resetPassword.newPasswordLabel')}
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
            />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            {t('resetPassword.confirmPasswordLabel')}
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
            />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={newPassword !== confirmPassword}
          >
          {t('resetPassword.submitButton')}
        </button>
        {message && <p className="mt-2 text-green-600">{message}</p>}
        {error && <p className="mt-2 text-red-600">{error}</p>}
      </form>
    </div>

          </>
  );
}