import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../globals.css';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContextType';

export const metadata: Metadata = {
  title: 'Cửa hàng giày trực tuyến',
  description: 'Cửa hàng bán giày chất lượng cao',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale}>
          <UserProvider>
            <CartProvider>
              {children}
              <ToastContainer />
            </CartProvider>
          </UserProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}