'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { updateOrderStatusApi, UpdateStatusInput } from '@/app/[locale]/services/adminOrderService';
 // app/admin/orders
export default function UpdateOrderPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;
  const [statusForm, setStatusForm] = useState<UpdateStatusInput>({ status: 'PENDING', note: '' });
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const orderStatuses = [
    { value: 'PENDING', label: 'Chờ xử lý' },
    { value: 'PROCESSING', label: 'Đang xử lý' },
    { value: 'SHIPPED', label: 'Đã giao hàng' },
    { value: 'DELIVERED', label: 'Giao hàng thành công' },
    { value: 'CANCELLED', label: 'Đã hủy' },
    { value: 'RETURNED', label: 'Trả hàng' },
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || user.role !== 1) {
      toast.error('Bạn không có quyền truy cập trang này');
      router.push('/unauthorized');
    }
  }, [router]);

  // Xử lý thay đổi input trong form
  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStatusForm((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý cập nhật trạng thái
  const handleUpdateStatus = async () => {
    if (!statusForm.status) {
      toast.error('Vui lòng chọn trạng thái');
      return;
    }
    if (!statusForm.note.trim()) {
      toast.error('Vui lòng nhập ghi chú');
      return;
    }
    setIsUpdating(true);
    try {
      await updateOrderStatusApi(Number(orderId), statusForm);
      toast.success(`Cập nhật trạng thái đơn hàng thành công`);
      router.push('/admin/orders');
    } catch (err: any) {
      setError(err.message || 'Lỗi khi cập nhật trạng thái');
      toast.error(err.message || 'Lỗi khi cập nhật trạng thái');
    } finally {
      setIsUpdating(false);
    }
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Lỗi</h1>
        <p className="text-red-500 text-lg">{error}</p>
        <button
          onClick={() => router.push('/admin/order')}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md"
        >
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-black">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Cập nhật trạng thái đơn hàng #{orderId}</h1>
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="space-y-4">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Trạng thái
            </label>
            <select
              id="status"
              name="status"
              value={statusForm.status}
              onChange={handleStatusChange}
              className="mt-1 block w-full border rounded-md p-2"
            >
              {orderStatuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="note" className="block text-sm font-medium text-gray-700">
              Ghi chú
            </label>
            <input
              type="text"
              id="note"
              name="note"
              value={statusForm.note}
              onChange={handleStatusChange}
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="Nhập ghi chú (bắt buộc)"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={() => router.push('/admin/order')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md"
            disabled={isUpdating}
          >
            Hủy
          </button>
          <button
            onClick={handleUpdateStatus}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
            disabled={isUpdating}
          >
            {isUpdating ? 'Đang cập nhật...' : 'Cập nhật'}
          </button>
        </div>
      </div>
    </div>
  );
}