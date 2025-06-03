'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getUserOrdersApi, OrderDetail } from '../services/client/OrderService';

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const orders = await getUserOrdersApi();
      setOrders(orders);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi tải đơn hàng');
      toast.error(err.message || 'Lỗi khi tải đơn hàng');
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
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Đang tải...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Lỗi</h1>
        <p className="text-red-500 text-lg">{error}</p>
        <button
          onClick={fetchOrders}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-black">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Lịch sử đơn hàng</h1>
      {orders.length === 0 ? (
        <div>
          <p className="text-gray-500 text-lg">Bạn chưa có đơn hàng nào.</p>
          <Link href="/products">
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md">
              Tiếp tục mua sắm
            </button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <Link href={`/orders/${order.id}`}>
                  <h2 className="text-lg font-semibold text-blue-600 hover:underline">
                    Mã đơn hàng: {order.orderCode}
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
                  {order.status}
                </span>
              </div>
              <p className="text-gray-600">Ngày tạo: {new Date(order.createdAt).toLocaleString('vi-VN')}</p>
              <p className="text-gray-600">Tổng giá: ${order.totalPrice.toFixed(2)}</p>
              <div className="mt-4">
                <h3 className="text-md font-medium text-gray-700">Sản phẩm:</h3>
                <ul className="list-disc ml-5 mt-2 space-y-2">
                  {order.items.map((item) => (
                    <li key={item.productId} className="text-gray-600">
                      {item.productName} (Kích cỡ: {item.size || 'N/A'}, Màu: {item.color || 'N/A'}) x {item.quantity} - $
                      {(item.price * item.quantity).toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <Link href={`/history/${order.id}`}>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">
                    Xem chi tiết
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
