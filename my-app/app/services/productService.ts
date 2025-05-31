// services/productService.ts
import { fetchWithTokenRefresh } from './apiService';
import { Product } from '../types/product';

const API_URL = 'http://localhost:8080/admin/products';

interface ProductListResponse {
  content: Product[];
  page: number;
  totalElements: number;
  totalPages: number;
}


// Lấy danh sách sản phẩm
export async function getAllProducts(page: number = 0, size: number = 10): Promise<ProductListResponse> {
  try {
    const data = await fetchWithTokenRefresh<ProductListResponse>(
      `${API_URL}?page=${page}&size=${size}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    );

    // Xử lý trường hợp không có dữ liệu (status 204)
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
    console.error('Lỗi khi lấy danh sách sản phẩm:', error);
    throw error;
  }
}

// Lấy sản phẩm theo ID
// services/productService.ts
export async function getProductById(id: number): Promise<Product> {
  try {
    const product = await fetchWithTokenRefresh<Product>(
      `${API_URL}/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    );

    if (!product) {
      throw new Error(`Sản phẩm với ID ${id} không tồn tại`);
    }

    return product;
  } catch (error) {
    console.error(`Lỗi khi lấy sản phẩm với ID ${id}:`, error);
    throw error;
  }
}
// Tạo sản phẩm mới
export async function createProduct(productData: FormData): Promise<Product> {
  try {
    const response = await fetchWithTokenRefresh<{ data: Product }>(
      API_URL,
      {
        method: 'POST',
        body: productData,
        credentials: 'include',
      }
    );
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo sản phẩm:', error);
    throw error;
  }
}

// Cập nhật sản phẩm
export async function updateProduct(id: number, productData: Product, imageFile?: File): Promise<Product> {
  const formData = new FormData();
  formData.append(
    'product',
    new Blob([JSON.stringify(productData)], {
      type: 'application/json',
    })
  );

  if (imageFile) {
    formData.append('image', imageFile);
  }

  try {
    const response = await fetchWithTokenRefresh<{ data: Product }>(
      `${API_URL}/${id}`,
      {
        method: 'PATCH',
        body: formData,
        credentials: 'include',
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật sản phẩm với id ${id}:`, error);
    throw error;
  }
}

// Xóa sản phẩm
export async function deleteProduct(id: number): Promise<void> {
  try {
    await fetchWithTokenRefresh<void>(
      `${API_URL}/${id}`,
      {
        method: 'DELETE',
        credentials: 'include',
      }
    );
  } catch (error) {
    console.error(`Lỗi khi xóa sản phẩm với id ${id}:`, error);
    throw error;
  }
}