import { Product } from "@/app/types/product";

const API_URL = 'http://localhost:8080/api/'; // Thêm /api/

interface ApiResponse {
  status: number;
  error: string | null;
  message: string;
  data: Product[];
}

export async function getAllProductsInClient(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' // Nếu dùng session/cookie
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse = await response.json();
    
    if (result.status !== 200) {
      throw new Error(result.message || 'API request failed');
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}