'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerApi } from '../services/apiService';
import { useTranslations } from 'next-intl';
import FooterPage from '../components/Footer';
import Header from '../components/Header';

export default function Register() {
  const router = useRouter();
  const t = useTranslations('Register');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    repeatPassword: '',
    role:2
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    if (formData.password !== formData.repeatPassword) {
      setError(t('passwordMismatch'));
      setIsLoading(false);
      return;
    }

    try {
      await registerApi({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: 2
      });
      setSuccess(t('success'));
      setTimeout(() => router.push('/login'), 2000);
    } catch (err: any) {
      setError(err.message || t('errorDefault'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Header />
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            {t('title')}
          </h2>

          {success && (
            <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <input
            type="text"
            name="fullName"
            placeholder={t('fullNamePlaceholder')}
            value={formData.fullName}
            onChange={handleChange}
            className="text-black w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder={t('emailPlaceholder')}
            value={formData.email}
            onChange={handleChange}
            className="text-black w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder={t('passwordPlaceholder')}
            value={formData.password}
            onChange={handleChange}
            className="text-black w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="repeatPassword"
            placeholder={t('repeatPasswordPlaceholder')}
            value={formData.repeatPassword}
            onChange={handleChange}
            className="text-black w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md text-white ${
              isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? t('loading') : t('button')}
          </button>

          <div className="text-center text-sm pt-8">
            <span className="text-gray-600">{t('alreadyHaveAccount')}</span>
            <a href="/login" className="font-medium text-blue-600 hover:text-blue-500 ml-1">
              {t('signIn')}
              <svg className="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </form>
      </div>
    </div>
    <FooterPage />
    </>
  );
}
