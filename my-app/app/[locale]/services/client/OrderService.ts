// services/client/OrderService.ts
import { fetchWithTokenRefresh } from "../apiService";

const ORDER_API_URL = 'http://localhost:8080/api/order';

interface ApiResponse<T> {
  status: number;
  error: string | null;
  message: string;
  data: T;
}

export interface OrderDetail {
  id: number;
  orderCode: string;
  totalPrice: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
  items: OrderItem[];
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

export interface OrderInput {
  receiverName: string;
  receiverAddress: string;
  receiverPhone: string;
  receiverNote?: string;
  paymentMethod: string;
  items: OrderInputItem[];
}

export interface OrderInputItem {
  productId: number;
  quantity: number;
  size: string;
  color: string;
}

export interface OrderHistory {
  status: string;
  note: string;
  createdAt: string;
  changedBy: string;
}

export interface UpdateStatusInput {
  status: string;
  note: string;
}

// Tạo đơn hàng mới
export async function createOrderApi(order: OrderInput): Promise<OrderDetail> {
  return fetchWithTokenRefresh<OrderDetail>(`${ORDER_API_URL}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
    credentials: 'include',
  });
}

// Lấy danh sách đơn hàng của người dùng
export async function getUserOrdersApi(): Promise<OrderDetail[]> {
  return fetchWithTokenRefresh<OrderDetail[]>(`${ORDER_API_URL}`, {
    method: 'GET',
    credentials: 'include',
  });
}

// Lấy chi tiết một đơn hàng
export async function getOrderDetailsApi(orderId: number): Promise<OrderDetail> {
  return fetchWithTokenRefresh<OrderDetail>(`${ORDER_API_URL}/${orderId}`, {
    method: 'GET',
    credentials: 'include',
  });
}

// Cập nhật trạng thái đơn hàng (dành cho admin)
export async function updateOrderStatusApi(orderId: number, update: UpdateStatusInput): Promise<OrderDetail> {
  return fetchWithTokenRefresh<OrderDetail>(`${ORDER_API_URL}/${orderId}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(update),
    credentials: 'include',
  });
}

// Lấy lịch sử trạng thái đơn hàng
export async function getOrderHistoryApi(orderId: number): Promise<OrderHistory[]> {
  return fetchWithTokenRefresh<OrderHistory[]>(`${ORDER_API_URL}/${orderId}/history`, {
    method: 'GET',
    credentials: 'include',
  });
}
