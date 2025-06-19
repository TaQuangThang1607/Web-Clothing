import { fetchWithTokenRefresh } from "./apiService";

const ADMIN_ORDER_API_URL = 'http://localhost:8080/admin/order';

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

export interface OrderItem {
  productId: number;
  productName: string;
  imageUrl: string | null;
  size: string | null;
  color: string | null;
  quantity: number;
  price: number;
}

export interface PagedResponse<T> {
  content: T[];
  page: number;
  totalElements: number;
  totalPages: number;
}

export async function getAllOrdersApi(
  page: number = 0,
  size: number = 10,
  search: string = '',
  status: string = '',
  startDate: string = '',
  endDate: string = ''
): Promise<PagedResponse<OrderDTO>> {
  
const user = JSON.parse(localStorage.getItem('user') || '{}');
if (!user || user.role !== 1) { 
  throw new Error('Chỉ admin mới có quyền truy cập danh sách đơn hàng');
}

  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  if (search) params.append('search', search);
  if (status) params.append('status', status);
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);

  return fetchWithTokenRefresh<PagedResponse<OrderDTO>>(`${ADMIN_ORDER_API_URL}?${params.toString()}`, {
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