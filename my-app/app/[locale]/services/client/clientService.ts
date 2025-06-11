import { ApiResponse, PageResponse } from "../../types/dto/apiResponse";
import { Product } from "../../types/product";


const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function getAllProductsInClient(
  page: number = 0,
  size: number = 10,
  sort: string = 'name,asc',
  queryParams: string = ''
): Promise<PageResponse<Product>> {
  try {
    const url = `${API_URL}products?${queryParams || `page=${page}&size=${size}&sort=${sort}`}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new ApiError(response.status, `HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<PageResponse<Product>> = await response.json();

    if (result.status !== 200) {
      throw new ApiError(result.status, result.message || 'API request failed');
    }

    if (!result.data || !Array.isArray(result.data.content)) {
      throw new ApiError(500, 'Invalid response data format');
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}