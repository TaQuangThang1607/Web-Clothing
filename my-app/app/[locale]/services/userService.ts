import { fetchWithTokenRefresh } from './apiService';
import { User } from '../types/user';

const API_URL = 'http://localhost:8080/admin/users';

interface UserListResponse {
  content: User[];
  page: number;
  totalElements: number;
  totalPages: number;
}

// Lấy danh sách user phân trang
export async function getAllUsers(page: number = 0, size: number = 10): Promise<UserListResponse> {
  try {
    const data = await fetchWithTokenRefresh<UserListResponse>(
      `${API_URL}?page=${page}&size=${size}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    );

    // Xử lý trường hợp không có dữ liệu (trả về content rỗng)
    if (!data.content) {
      return {
        content: [],
        page,
        totalElements: 0,
        totalPages: 0,
      };
    }

    return data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách người dùng:', error);
    throw error;
  }
}

// Tạo user mới
export async function createUser(userData: Omit<User, 'id'> & { password: string }): Promise<User> {
  try {
    const response = await fetchWithTokenRefresh<User>(
      API_URL,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(userData),
      }
    );
    return response;
  } catch (error) {
    console.error('Lỗi khi tạo người dùng:', error);
    throw error;
  }
}

// Xóa user theo id
export async function deleteUser(id: number): Promise<void> {
  try {
    await fetchWithTokenRefresh<void>(
      `${API_URL}/${id}`,
      {
        method: 'DELETE',
        credentials: 'include',
      }
    );
  } catch (error) {
    console.error(`Lỗi khi xóa người dùng có id ${id}:`, error);
    throw error;
  }
}

export async function getUserById(id: number): Promise<User> {
  try {
    const user = await fetchWithTokenRefresh<User>(
      `${API_URL}/${id}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    );
    return user;
  } catch (error) {
    console.error(`Lỗi khi lấy thông tin người dùng với id ${id}:`, error);
    throw error;
  }
}

export async function updateUser(
  id: number, 
  userData: Partial<Omit<User, 'id'>> & { password?: string }
): Promise<User> {
  try {
    const response = await fetchWithTokenRefresh<User>(
      `${API_URL}/${id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(userData),
      }
    );
    return response;
  } catch (error) {
    console.error(`Lỗi khi cập nhật người dùng có id ${id}:`, error);
    throw error;
  }
}