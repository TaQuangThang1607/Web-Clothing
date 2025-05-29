// services/apiService.ts

const API_URL = 'http://localhost:8080/api/v1/auth';

interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    email: string;
    fullName: string;
  };
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include', // QUAN TRỌNG để Spring set cookie (refreshToken)
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Login failed');
    }

    const data: LoginResponse = await res.json();
    // Ví dụ: lưu vào localStorage (hoặc context, Redux tuỳ dự án)
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('user', JSON.stringify(data.user));


    return data;
  } catch (err) {
    console.error('Login error:', err);
    throw err;
  }
}
