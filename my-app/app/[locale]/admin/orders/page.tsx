'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { getAllOrdersApi, OrderDTO } from '../../services/adminOrderService';
import { fetchWithTokenRefresh } from '../../services/apiService';
import { debounce } from 'lodash';

export default function AdminOrdersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(searchParams.get('page') || '0')
  );
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderDTO | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get('search') || ''
  );
  const [selectedStatus, setSelectedStatus] = useState<string>(
    searchParams.get('status') || ''
  );
  const [startDate, setStartDate] = useState<string>(
    searchParams.get('startDate') || ''
  );
  const [endDate, setEndDate] = useState<string>(
    searchParams.get('endDate') || ''
  );

  const orderStatuses = [
    { value: 'PENDING', label: 'Chờ xử lý' },
    { value: 'PROCESSING', label: 'Đang xử lý' },
    { value: 'SHIPPED', label: 'Đã giao hàng' },
    { value: 'DELIVERED', label: 'Giao hàng thành công' },
    { value: 'CANCELLED', label: 'Đã hủy' },
    { value: 'RETURNED', label: 'Trả hàng' },
  ];

  useEffect(() => {
    setIsMounted(true);
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        throw new Error('User not found');
      }
      
      const user = JSON.parse(userStr);
      if (!user || user.role !== 1) {
        throw new Error('Unauthorized');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast.error('Bạn cần đăng nhập với quyền ADMIN để truy cập trang này');
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      router.push('/login');
    }
  }, [router]);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllOrdersApi(
        currentPage,
        10,
        searchTerm,
        selectedStatus,
        startDate,
        endDate
      );
      
      if (!response || !Array.isArray(response.content)) {
        throw new Error('Dữ liệu đơn hàng không hợp lệ');
      }
      
      setOrders(response.content);
      setTotalPages(response.totalPages);
      setCurrentPage(response.page);
    } catch (err: any) {
      const errorMsg = err.message || 'Lỗi khi tải danh sách đơn hàng';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetails = async (orderId: number) => {
    setIsLoadingDetails(true);
    try {
      const order = await fetchWithTokenRefresh<OrderDTO>(`http://localhost:8080/admin/order/${orderId}`, {
        method: 'GET',
        credentials: 'include',
      });
      setSelectedOrder(order);
      setIsDetailModalOpen(true);
    } catch (err: any) {
      toast.error(err.message || 'Lỗi khi tải chi tiết đơn hàng');
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const openDetailModal = (order: OrderDTO) => {
    if (!order.id) {
      toast.error('Không thể xem chi tiết: Đơn hàng không có ID');
      return;
    }
    fetchOrderDetails(order.id);
  };

  const openDeleteConfirmModal = (order: OrderDTO) => {
    if (!order.id) {
      toast.error('Không thể xóa: Đơn hàng không có ID');
      return;
    }
    if (!['PENDING', 'CANCELLED'].includes(order.status || '')) {
      toast.error('Chỉ có thể xóa đơn hàng ở trạng thái "Chờ xử lý" hoặc "Đã hủy"');
      return;
    }
    setSelectedOrder(order);
    setIsDeleteConfirmOpen(true);
  };

  const handleDeleteOrder = async () => {
    if (!selectedOrder?.id) {
      toast.error('Không thể xóa: ID đơn hàng không tồn tại');
      return;
    }
    setIsDeleting(true);
    try {
      await fetchWithTokenRefresh<void>(`http://localhost:8080/admin/order/${selectedOrder.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      setOrders(orders.filter((o) => o.id !== selectedOrder.id));
      setIsDeleteConfirmOpen(false);
      toast.success(`Xóa đơn hàng ${selectedOrder.orderCode || selectedOrder.receiverName} thành công`);
    } catch (err: any) {
      toast.error(err.message || 'Lỗi khi xóa đơn hàng');
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      updateUrl({ page: newPage.toString() });
    }
  };

  const debouncedSearch = debounce((value: string) => {
    setSearchTerm(value);
    setCurrentPage(0);
    updateUrl({ search: value, page: '0' });
  }, 500);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);
    setCurrentPage(0);
    updateUrl({ status: newStatus, page: '0' });
  };

  const handleDateChange = (field: 'startDate' | 'endDate', value: string) => {
    if (field === 'startDate') {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
    setCurrentPage(0);
    updateUrl({ [field]: value, page: '0' });
  };

  const updateUrl = (params: { [key: string]: string }) => {
    const urlParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value) urlParams.set(key, value);
      else urlParams.delete(key);
    });
    if (searchTerm) urlParams.set('search', searchTerm);
    if (selectedStatus) urlParams.set('status', selectedStatus);
    if (startDate) urlParams.set('startDate', startDate);
    if (endDate) urlParams.set('endDate', endDate);
    router.push(`/admin/orders?${urlParams.toString()}`);
  };

  useEffect(() => {
    if (isMounted) {
      fetchOrders();
    }
  }, [isMounted, currentPage, searchTerm, selectedStatus, startDate, endDate]);

  if (!isMounted) {
    return null;
  }

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
          onClick={() => fetchOrders()}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-black">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Quản lý đơn hàng</h1>
      <div className="flex justify-between mb-4">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Tìm kiếm theo mã đơn hàng hoặc tên người nhận..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tất cả trạng thái</option>
            {orderStatuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={startDate}
            onChange={(e) => handleDateChange('startDate', e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => handleDateChange('endDate', e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => fetchOrders()}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
        >
          Làm mới
        </button>
      </div>
      {orders.length === 0 ? (
        <p className="text-gray-500 text-lg">
          {searchTerm || selectedStatus || startDate || endDate
            ? 'Không tìm thấy đơn hàng nào phù hợp với bộ lọc.'
            : 'Không có đơn hàng nào.'}
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">Tên người nhận</th>
                  <th className="border px-4 py-2 text-left">Trạng thái</th>
                  <th className="border px-4 py-2 text-left">Tổng giá</th>
                  <th className="border px-4 py-2 text-left">Ngày tạo</th>
                  <th className="border px-4 py-2 text-left">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order.id || index} className="border-b">
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => openDetailModal(order)}
                        className="text-blue-500 hover:underline"
                      >
                        {order.receiverName || 'N/A'}
                      </button>
                    </td>
                    <td className="border px-4 py-2">
                      {orderStatuses.find((s) => s.value === order.status)?.label || order.status || 'Chưa xác định'}
                    </td>
                    <td className="border px-4 py-2">
                      {order.totalPrice != null
                        ? order.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                        : 'N/A'}
                    </td>
                    <td className="border px-4 py-2">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
                        : 'N/A'}
                    </td>
                    <td className="border px-4 py-2 space-x-2">
                      <Link
                        href={`/admin/orders/update/${order.id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 rounded-md"
                      >
                        Cập nhật trạng thái
                      </Link>
                      <button
                        onClick={() => openDeleteConfirmModal(order)}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-md"
                        disabled={!order.id || !['PENDING', 'CANCELLED'].includes(order.status || '')}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md disabled:opacity-50"
            >
              Trang trước
            </button>
            <span>
              Trang {currentPage + 1} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md disabled:opacity-50"
            >
              Trang sau
            </button>
          </div>
        </>
      )}

      {isDetailModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              Chi tiết đơn hàng: {selectedOrder.orderCode || selectedOrder.receiverName || 'N/A'}
            </h2>
            {isLoadingDetails ? (
              <p className="text-gray-500">Đang tải chi tiết...</p>
            ) : (
              <div className="space-y-4">
                <p><strong>Mã đơn hàng:</strong> {selectedOrder.orderCode || 'N/A'}</p>
                <p><strong>Tên người nhận:</strong> {selectedOrder.receiverName || 'N/A'}</p>
                <p><strong>Địa chỉ:</strong> {selectedOrder.receiverAddress || 'N/A'}</p>
                <p><strong>Số điện thoại:</strong> {selectedOrder.receiverPhone || 'N/A'}</p>
                <p><strong>Ghi chú:</strong> {selectedOrder.receiverNote || 'Không có'}</p>
                <p><strong>Tổng giá:</strong> {selectedOrder.totalPrice != null ? selectedOrder.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A'}</p>
                <p><strong>Ngày tạo:</strong> {selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }) : 'N/A'}</p>
                <p><strong>Trạng thái:</strong> {orderStatuses.find((s) => s.value === selectedOrder.status)?.label || selectedOrder.status || 'Chưa xác định'}</p>
                <h3 className="text-lg font-semibold mt-4">Sản phẩm</h3>
                {(selectedOrder.items || []).length > 0 ? (
                  <div className="max-h-60 overflow-y-auto">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border px-4 py-2 text-left">Ảnh</th>
                          <th className="border px-4 py-2 text-left">Tên sản phẩm</th>
                          <th className="border px-4 py-2 text-left">Số lượng</th>
                          <th className="border px-4 py-2 text-left">Kích thước</th>
                          <th className="border px-4 py-2 text-left">Màu sắc</th>
                          <th className="border px-4 py-2 text-left">Giá</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(selectedOrder.items || []).map((item, index) => (
                          <tr key={item.productId || index} className="border-b">
                            <td className="border px-4 py-2">
                              {item.imageUrl ? (
                                <img src={item.imageUrl} alt={item.productName || 'Sản phẩm'} className="w-12 h-12 object-cover" />
                              ) : (
                                'N/A'
                              )}
                            </td>
                            <td className="border px-4 py-2">{item.productName || 'N/A'}</td>
                            <td className="border px-4 py-2">{item.quantity || 'N/A'}</td>
                            <td className="border px-4 py-2">{item.size || 'N/A'}</td>
                            <td className="border px-4 py-2">{item.color || 'N/A'}</td>
                            <td className="border px-4 py-2">
                              {item.price != null ? item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500">Không có sản phẩm trong đơn hàng.</p>
                )}
              </div>
            )}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md"
                disabled={isLoadingDetails}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteConfirmOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Xác nhận xóa đơn hàng: {selectedOrder.orderCode || selectedOrder.receiverName || 'N/A'}
            </h2>
            <p className="text-gray-700 mb-4">
              Bạn có chắc chắn muốn xóa đơn hàng này? Hành động này không thể hoàn tác.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md"
                disabled={isDeleting}
              >
                Hủy
              </button>
              <button
                onClick={handleDeleteOrder}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md"
                disabled={isDeleting}
              >
                {isDeleting ? 'Đang xóa...' : 'Xóa'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}