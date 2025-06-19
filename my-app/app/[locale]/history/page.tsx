'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getUserOrdersApi, OrderDetail } from '../services/client/OrderService';
import Header from '../components/Header';
import FooterPage from '../components/Footer';
import { useLocale, useTranslations } from 'next-intl';

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();
  const t = useTranslations('OrdersPage');
  // Hàm định dạng giá theo locale
  const formatPrice = (price: number) => {
    if (locale === 'vi') {
      return price.toLocaleString('vi-VN', { minimumFractionDigits: 0 }) + ' VND';
    }
    const exchangeRate = 26100; // 1 USD = 26.100 VND
    const priceInUSD = price / exchangeRate;
    return '$' + priceInUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Hàm định dạng trạng thái đơn hàng
  const formatStatus = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'Chờ xử lý': t('pending'),
      'Đang xử lý': t('processing'),
      'Hoàn thành': t('completed'),
      'Đã hủy': t('canceled'),
    };
    return statusMap[status] || status;
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const orders = await getUserOrdersApi();
      setOrders(orders);
      setError(null);
    } catch (err: any) {
      setError(t('fetchError')); // Sử dụng bản dịch
      toast.error(t('fetchError'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('loading')}</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('error')}</h1>
        <p className="text-red-500 text-lg">{error}</p>
        <button
          onClick={fetchOrders}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md"
        >
          {t('retry')}
        </button>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-black">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('title')}</h1>
        {orders.length === 0 ? (
          <div>
            <p className="text-gray-500 text-lg">{t('noOrders')}</p>
            <Link href="/products">
              <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md">
                {t('continueShopping')}
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <Link href={`/${locale}/orders/${order.id}`}>
                    <h2 className="text-lg font-semibold text-blue-600 hover:underline">
                      {t('orderCode')}: {order.orderCode}
                    </h2>
                  </Link>
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                      order.status === 'Chờ xử lý'
                        ? 'bg-yellow-100 text-yellow-800'
                        : order.status === 'Đang xử lý'
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'Hoàn thành'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {formatStatus(order.status)}
                  </span>
                </div>
                <p className="text-gray-600">
                  {t('createdAt')}: {new Date(order.createdAt).toLocaleString(locale === 'vi' ? 'vi-VN' : 'en-US')}
                </p>
                <p className="text-gray-600">
                  {t('totalPrice')}: {formatPrice(order.totalPrice)}
                </p>
                <div className="mt-4">
                  <h3 className="text-md font-medium text-gray-700">{t('products')}</h3>
                  <ul className="list-disc ml-5 mt-2 space-y-2">
                    {order.items.map((item) => (
                      <li key={item.productId} className="text-gray-600">
                        {item.productName} ({t('size')}: {item.size || 'N/A'}, {t('color')}: {item.color || 'N/A'}) x{' '}
                        {item.quantity} - {formatPrice(item.price * item.quantity)}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4">
                  <Link href={`/${locale}/history/${order.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">
                      {t('viewDetails')}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <FooterPage />
    </>
  );
}