import { fetchWithTokenRefresh } from "./apiService";

// Định nghĩa API URL cho admin order
const ADMIN_ORDER_API_URL = 'http://localhost:8080/admin/order';

// Giao diện cho OrderDTO (dựa trên OrderDetailDTO.java)
export interface OrderDTO {
  id?: number;
  orderCode?: string;
  totalPrice?: number;
  paymentMethod: string;
  status?: string;
  createdAt?: string;
  receiverName?: string; 
  receiverAddress?: string; 
  receiverPhone?: string; 
  receiverNote?: string;
  items?: OrderItem[] | null;
}

// Giao diện cho OrderItem (dựa trên OrderDetailDTO.Item)
export interface OrderItem {
  productId: number;
  productName: string;
  imageUrl: string | null;
  size: string | null;
  color: string | null;
  quantity: number;
  price: number;
}

// Giao diện cho phản hồi phân trang
export interface PagedResponse<T> {
  content: T[];
  page: number;
  totalElements: number;
  totalPages: number;
}

// Hàm lấy danh sách đơn hàng cho admin
export async function getAllOrdersApi(page: number = 0, size: number = 10): Promise<PagedResponse<OrderDTO>> {
  // Kiểm tra vai trò admin trước khi gọi API
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!user || user.role !== 'ADMIN') {
    throw new Error('Chỉ admin mới có quyền truy cập danh sách đơn hàng');
  }

  return fetchWithTokenRefresh<PagedResponse<OrderDTO>>(`${ADMIN_ORDER_API_URL}?page=${page}&size=${size}`, {
    method: 'GET',
    credentials: 'include',
  });
}

export interface UpdateStatusInput {
  status: string;
  note: string;
}

export async function updateOrderStatusApi(orderId: number, input: UpdateStatusInput): Promise<OrderDTO> {
  return fetchWithTokenRefresh<OrderDTO>(`http://localhost:8080/admin/order/${orderId}/status`, {
    method: 'PUT',
    body: JSON.stringify(input),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}