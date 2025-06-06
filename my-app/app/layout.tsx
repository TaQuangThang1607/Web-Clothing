import type { Metadata } from 'next';
import './globals.css';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContextType';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Cửa hàng giày trực tuyến',
  description: 'Cửa hàng bán giày chất lượng cao',
  viewport: { width: 'device-width', initialScale: 1 },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="antialiased">
        <UserProvider>
          <CartProvider>
            <main className="min-h-screen">{children}</main>
            <ToastContainer position="top-right" autoClose={3000} />
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}