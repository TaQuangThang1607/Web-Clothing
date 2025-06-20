'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getCartApi, addToCartApi, removeFromCartApi, updateCartQuantityApi, clearCartApi, CartDetail } from '../services/client/CartService';
import Header from '../components/Header';
import FooterPage from '../components/Footer';
import { useTranslations, useLocale } from 'next-intl';

const API_BASE_URL = 'http://localhost:8080';

export default function CartPage() {
  const [cart, setCart] = useState<CartDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const t = useTranslations('Cart');
  const tProduct = useTranslations('Product');
  const locale = useLocale();

  // Hàm định dạng giá theo locale
  const formatPrice = (price: number) => {
    if (locale === 'vi') {
      return price.toLocaleString('vi-VN', { minimumFractionDigits: 0 }) + ' VND';
    }
    // Chuyển đổi từ VND sang USD (1 USD = 26.100 VND)
    const exchangeRate = 26100;
    const priceInUSD = price / exchangeRate;
    return '$' + priceInUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Tải giỏ hàng khi component mount
  const fetchCart = async () => {
    setLoading(true);
    try {
      const cartItems = await getCartApi();
      setCart(cartItems);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi tải giỏ hàng');
      toast.error(err.message || 'Lỗi khi tải giỏ hàng');
    } finally {
      setLoading(false);
    }
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const handleRemoveFromCart = async (productId: number) => {
    try {
      await removeFromCartApi(productId);
      setCart(cart.filter(item => item.productId !== productId));
      toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
    } catch (err: any) {
      toast.error(err.message || 'Lỗi khi xóa sản phẩm');
    }
  };

  const handleUpdateQuantity = async (productId: number, quantity: number) => {
    if (quantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }
    try {
      await updateCartQuantityApi(productId, quantity);
      const updatedCart = await getCartApi();
      setCart(updatedCart);
      toast.success('Đã cập nhật số lượng');
    } catch (err: any) {
      toast.error(err.message || 'Lỗi khi cập nhật số lượng');
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCartApi();
      setCart([]);
      toast.success('Đã xóa toàn bộ giỏ hàng');
    } catch (err: any) {
      toast.error(err.message || 'Lỗi khi xóa giỏ hàng');
    }
  };

  // Chuyển hướng đến trang thanh toán
  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Giỏ hàng trống, vui lòng thêm sản phẩm trước khi thanh toán');
      return;
    }
    router.push('/order');
  };

  // Tính tổng số lượng và tổng giá
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('loading') || 'Loading...'}</h1>
      </div>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('error') || 'Error'}</h1>
          <p className="text-red-500 text-lg">{error}</p>
          <button
            onClick={fetchCart}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md"
          >
            {t('retry') || 'Retry'}
          </button>
        </div>
        <FooterPage />
      </>
    );
  }

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('title') || 'Your Cart'}</h1>
          <p className="text-gray-500 text-lg">{t('empty') || 'Your cart is empty.'}</p>
          <Link href="/products">
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md">
              {t('continueShopping') || 'Continue Shopping'}
            </button>
          </Link>
        </div>
        <FooterPage />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-black">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {t('title') || 'Your Cart'} ({totalItems} {t('items') || 'items'})
        </h1>
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center border rounded-lg p-4 shadow-sm"
            >
              <img
                src={item.productImageUrl?.startsWith('http') ? item.productImageUrl : `${API_BASE_URL}${item.productImageUrl || '/placeholder-product.png'}`}
                alt={item.productName}
                className="w-24 h-24 object-cover rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-product.png';
                }}
              />
              <div className="ml-4 flex-grow">
                <h2 className="text-lg font-semibold">{item.productName}</h2>
                <p className="text-gray-600">{formatPrice(item.price)}</p>
                <h2 className="text-lg">{tProduct('size')}: {item.size || 'N/A'}</h2>
                <h2 className="text-lg">{tProduct('brand')}: {item.brand || 'N/A'}</h2>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                    className="px-2 py-1 border rounded"
                    disabled={loading}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                    className="px-2 py-1 border rounded"
                    disabled={loading}
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveFromCart(item.productId)}
                    className="ml-4 text-red-500 hover:text-red-700"
                    disabled={loading}
                  >
                    {t('remove') || 'Remove'}
                  </button>
                </div>
              </div>
              <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={handleClearCart}
            className="text-red-500 hover:text-red-700"
            disabled={loading}
          >
            {t('clearCart') || 'Clear Cart'}
          </button>
          <div>
            <p className="text-xl font-bold">
              {t('total') || 'Total'}: {formatPrice(totalPrice)}
            </p>
            <button
              onClick={handleCheckout}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md"
              disabled={loading}
            >
              {t('checkout') || 'Checkout'}
            </button>
          </div>
        </div>
      </div>
      <FooterPage />
    </>
  );
}