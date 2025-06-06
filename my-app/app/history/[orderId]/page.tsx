'use client';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  getOrderDetailsApi,
  getOrderHistoryApi,
  OrderDetail,
  OrderHistory,
} from '../../services/client/OrderService';
import FooterPage from '@/app/components/Footer';
import Header from '@/app/components/Header';

const API_BASE_URL = 'http://localhost:8080';

export default function OrderDetailPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params);

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [history, setHistory] = useState<OrderHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        const orderIdNum = parseInt(orderId);
        if (isNaN(orderIdNum)) throw new Error('ID đơn hàng không hợp lệ');

        const [orderData, historyData] = await Promise.all([
          getOrderDetailsApi(orderIdNum),
          getOrderHistoryApi(orderIdNum),
        ]);
        setOrder(orderData);
        setHistory(historyData);
      } catch (err: any) {
        const msg = err.message || 'Lỗi khi tải chi tiết đơn hàng';
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Đang tải...</h1>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Lỗi</h1>
        <p className="text-red-500">{error || 'Không tìm thấy đơn hàng'}</p>
        <button
          onClick={() => router.push('/orders')}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md"
        >
          Quay lại danh sách đơn hàng
        </button>
      </div>
    );
  }

  return (
    <>
    <Header />
    <div className="max-w-7xl mx-auto px-4 py-12 text-black">
      <h1 className="text-3xl font-bold mb-6">Chi tiết đơn hàng: {order.orderCode}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Thông tin đơn hàng */}
        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Thông tin đơn hàng</h2>
          <p className="text-gray-600">Mã đơn hàng: {order.orderCode}</p>
          <p className="text-gray-600">Trạng thái: {order.status}</p>
          <p className="text-gray-600">
            Ngày tạo: {new Date(order.createdAt).toLocaleString('vi-VN')}
          </p>
          <p className="text-gray-600">Phương thức thanh toán: {order.paymentMethod}</p>
          <p className="font-bold mt-2 text-gray-700">Tổng giá: {order.totalPrice.toLocaleString('vi-VN', { minimumFractionDigits: 0 })} VND</p>
          

          <h3 className="text-md font-medium text-gray-700 mt-4">Sản phẩm:</h3>
          <div className="space-y-4 mt-2">
            {order.items.map((item) => (
              <div key={item.productId} className="flex items-center">
                <img
                  src={
                    item.imageUrl?.startsWith('http')
                    ? item.imageUrl
                    : `${API_BASE_URL}${item.imageUrl || '/placeholder-product.png'}`
                  }
                  alt={item.productName}
                  className="w-16 h-16 object-cover rounded"
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src = '/placeholder-product.png')
                  }
                  />
                <div className="ml-4 flex-grow">
                  <p className="text-gray-600">{item.productName}</p>
                  <p className="text-gray-600">
                    Kích cỡ: {item.size || 'N/A'}, Màu: {item.color || 'N/A'}
                  </p>
                  <p className="text-gray-600">
                    Số lượng: {item.quantity} x {item.price.toLocaleString('vi-VN', { minimumFractionDigits: 0 })} VND
                  </p>
                </div>
                <p className="font-bold">
{(item.price * item.quantity).toLocaleString('vi-VN', { minimumFractionDigits: 0 })} VND                   </p>
              </div>
            ))}
          </div>
        </div>

        {/* Lịch sử trạng thái */}
        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Lịch sử trạng thái</h2>
          {history.length === 0 ? (
            <p className="text-gray-500">Chưa có cập nhật trạng thái.</p>
          ) : (
            <div className="space-y-4">
              {history.map((entry, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mt-1"></div>
                    {index < history.length - 1 && (
                      <div className="w-px h-6 bg-gray-300 mt-1"></div>
                    )}
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-600 font-medium">{entry.status}</p>
                    <p className="text-gray-500 text-sm">{entry.note || 'Không có ghi chú'}</p>
                    <p className="text-gray-500 text-sm">
                      Cập nhật lúc: {new Date(entry.createdAt).toLocaleString('vi-VN')}
                    </p>
                    <p className="text-gray-500 text-sm">{entry.changedBy}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => router.push('/history')}
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md"
        >
        Quay lại
      </button>
    </div>
    <FooterPage />
        </>
  );
}
