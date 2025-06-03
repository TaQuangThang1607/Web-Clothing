import { User } from "../types/user";

// services/apiService.ts
const API_URL = 'http://localhost:8080/api/v1/auth';

interface ApiResponse<T> {
  status: number;
  error: string | null;
  message: string;
  data: T;
}

interface LoginData {
  user: User;
  access_token: string;
}

interface AccountData {
  user: User;
}

export async function fetchWithTokenRefresh<T>(url: string, options: RequestInit): Promise<T> {
  
  
  const accessToken = localStorage.getItem('access_token');
  const isFormData = options.body instanceof FormData;

  const headers = {
    ...options.headers,
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
  };

  const res = await fetch(url, { ...options, headers, credentials: 'include' });
    if (res.status === 200 && (options.method === 'DELETE' || options.method === 'PUT')) {
        return undefined as T; 
    }
  if (res.status === 204) {
    return {
      content: [],
      page: 0,
      totalElements: 0,
      totalPages: 0,
    } as T;
  }

  if (res.status === 404) {
    throw new Error(`Tài nguyên không tồn tại: ${url}`);
  }

  if (res.status === 401) {
    try {
      const { access_token, user } = await refreshTokenApi();
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user', JSON.stringify(user));

      const retryRes = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
        credentials: 'include',
      });

      if (retryRes.status === 204) {
        return {
          content: [],
          page: 0,
          totalElements: 0,
          totalPages: 0,
        } as T;
      }

      if (retryRes.status === 404) {
        throw new Error(`Tài nguyên không tồn tại: ${url}`);
      }

      if (!retryRes.ok) {
        const retryErrorText = await retryRes.text();
        throw new Error(retryErrorText || 'Yêu cầu thất bại sau khi làm mới token');
      }

      const contentType = retryRes.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const retryResponse = await retryRes.json();
        return retryResponse.data || retryResponse;
      } else {
        throw new Error(`Phản hồi không phải JSON: ${await retryRes.text()}`);
      }
    } catch (refreshError) {
      console.error('Lỗi làm mới token:', refreshError);
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      throw new Error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
    }
  }

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `Yêu cầu thất bại: ${res.status}`);
  }

  const contentType = res.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    const response = await res.json();
    return response.data || response;
  } else {
    throw new Error(`Phản hồi không phải JSON: ${await res.text()}`);
  }
}

export async function refreshTokenApi(): Promise<LoginData> {
  const res = await fetch(`${API_URL}/refresh`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Làm mới token thất bại');
  }

  const contentType = res.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    const response = await res.json();
    return response.data;
  } else {
    throw new Error('Phản hồi làm mới token không phải JSON');
  }
}

export async function loginApi(email: string, password: string): Promise<LoginData> {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });

  const response: ApiResponse<LoginData> = await res.json();

  if (!res.ok) {
    throw new Error(response.message || 'Đăng nhập thất bại');
  }

  if (!response.data || !response.data.access_token || !response.data.user) {
    throw new Error('Phản hồi đăng nhập không hợp lệ');
  }

  return response.data;
}

export async function getAccountApi(): Promise<User> {
  return fetchWithTokenRefresh<AccountData>(`${API_URL}/account`, {
    method: 'GET',
    credentials: 'include',
  }).then((data) => data.user);
}
