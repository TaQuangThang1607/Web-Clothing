import { fetchWithTokenRefresh } from "../apiService";

const CART_API_URL = 'http://localhost:8080/api/cart';
// app/services/client/CartService.ts
interface ApiResponse<T> {
  status: number;
  error: string | null;
  message: string;
  data: T;
}

export interface CartDetail {
  id: number;
  cartId: number;
  quantity: number;
  price: number;
  productId: number;
  productName: string;
  productImageUrl: string | null;
  size: string | null;
  brand: string | null;
}

export async function getCartApi(): Promise<CartDetail[]> {
  return fetchWithTokenRefresh<CartDetail[]>(`${CART_API_URL}`, {
    method: 'GET',
    credentials: 'include',
  });
}

export async function addToCartApi(productId: number, quantity: number): Promise<CartDetail[]> {
  return fetchWithTokenRefresh<CartDetail[]>(`${CART_API_URL}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId, quantity }),
    credentials: 'include',
  });
}

export async function removeFromCartApi(productId: number): Promise<void> {
  return fetchWithTokenRefresh<void>(`${CART_API_URL}/remove/${productId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
}

export async function updateCartQuantityApi(productId: number, quantity: number): Promise<void> {
  return fetchWithTokenRefresh<void>(`${CART_API_URL}/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId, quantity }),
    credentials: 'include',
  });
}

export async function clearCartApi(): Promise<void> {
  return fetchWithTokenRefresh<void>(`${CART_API_URL}/clear`, {
    method: 'DELETE',
    credentials: 'include',
  });
}