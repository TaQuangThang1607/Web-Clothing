'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";
import { loginApi } from "../services/apiService";
import Header from "../components/Header";
import FooterPage from "../components/Footer";
import { useLocale, useTranslations } from 'next-intl';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useUser();
  const router = useRouter();

  const t = useTranslations('Login');
  const locale = useLocale();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const { user, access_token } = await loginApi(email, password);

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);

      if (user.role === 2) {
        router.push('/');
      } else {
        router.push('/admin');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t('errorUnknown'));
      }
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

            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('emailPlaceholder')}
              className="text-black w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />

            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('passwordPlaceholder')}
              className="text-black w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />

            <button 
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {t('submitButton')}
            </button>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="text-center text-sm">
              <span className="text-gray-600">{t('forgot')}</span>
              <a href="/forgot-password" className="text-blue-600 hover:text-blue-500 ml-1">
                {t('forgotLink')}
              </a>
            </div>

            <div className="text-center text-sm pt-4">
              <a href="/register" className="text-blue-600 hover:text-blue-500">
                {t('registerLink')}
              </a>
            </div>
          </form>
        </div>
      </div>
      <FooterPage />
    </>
  );
}
