import type { Metadata } from 'next';
import './globals.css';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContextType';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from './components/Header';
import FooterPage from './components/Footer';

export const metadata: Metadata = {
  title: 'Cửa hàng giày trực tuyến',
  description: 'Cửa hàng bán giày chất lượng cao',
  viewport: 'width=device-width, initial-scale=1',
};

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="flex justify-center items-center h-screen text-red-500">
      <p>Có lỗi xảy ra: {error.message}</p>
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="antialiased">
          <UserProvider>
            <CartProvider>
                <Header />
                <main className="min-h-screen">{children}</main>
                <FooterPage />
                <ToastContainer position="top-right" autoClose={3000} />
            </CartProvider>
          </UserProvider>
      </body>
    </html>
  );
}