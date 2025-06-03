import { fetchWithTokenRefresh } from "../apiService";

const CART_API_URL = 'http://localhost:8080/api/cart';
// app/services/client/CartService.ts
// Interface khớp với response từ API
interface CartItemDTO {
  productId: number;
  productName: string;
  price: number;
  productImageUrl: string;
  quantity: number;
  id?: number | null;
  cartId?: number | null;
}

// Interface cho API response wrapper
interface ApiResponse<T> {
  status: number;
  error: string | null;
  message: string;
  data: T;
}

// Lấy danh sách các mục trong giỏ hàng
export const getCart = async (): Promise<CartItemDTO[]> => {
  try {
    const response = await fetchWithTokenRefresh<ApiResponse<CartItemDTO[]>>(`${CART_API_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    console.log('API response in getCart:', response); // Ghi log để kiểm tra
    if (!response.data || !Array.isArray(response.data)) {
      console.error('Expected array in response.data, got:', response.data);
      throw new Error('Invalid cart data from server');
    }
    return response.data;
  } catch (error) {
    console.error('Error in getCart:', error);
    throw error; // Ném lỗi để xử lý ở syncCartFromServer
  }
};


// Thêm sản phẩm vào giỏ hàng
export async function addToCart(productId: number, quantity: number): Promise<CartItemDTO[]> {
  const response = await fetchWithTokenRefresh<ApiResponse<CartItemDTO[]>>(`${CART_API_URL}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId, quantity }),
    credentials: 'include',
  });
  return response.data;
}

// Xóa sản phẩm khỏi giỏ hàng
export async function removeFromCart(productId: number): Promise<void> {
  await fetchWithTokenRefresh<void>(`${CART_API_URL}/remove/${productId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
}

// Cập nhật số lượng sản phẩm trong giỏ hàng
export async function updateCartQuantity(productId: number, quantity: number): Promise<void> {
  await fetchWithTokenRefresh<void>(`${CART_API_URL}/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId, quantity }),
    credentials: 'include',
  });
}

// Xóa toàn bộ giỏ hàng
export async function clearCart(): Promise<void> {
  await fetchWithTokenRefresh<void>(`${CART_API_URL}/clear`, {
    method: 'DELETE',
    credentials: 'include',
  });
}

// Export interface để sử dụng ở component khác
export type { CartItemDTO };