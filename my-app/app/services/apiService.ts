// services/apiService.ts

const API_URL = 'http://localhost:8080/api/v1/auth';

interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    email: string;
    fullName: string | null;
  };
}

export async function loginApi(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });

  if (!res.ok) {
    const errorRes = await res.json();
    throw new Error(errorRes.message || 'Login failed');
  }

  const resJson = await res.json();
  const { data } = resJson;

  if (!data || !data.access_token || !data.user) {
    throw new Error('Invalid login response');
  }

  return {
    access_token: data.access_token,
    user: data.user,
  };
}
