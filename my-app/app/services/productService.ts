import { Product } from "../types/product"
import { ProductDTO } from "../types/ProductDTO"

//app/services/productService.ts
const API_URL = 'http://localhost:8080/admin/products'
//handle get all product
// app/services/productService.ts
export async function getAllProducts(page: number = 0, size: number = 10): Promise<{
    products: Product[];
    currentPage: number;
    totalItems: number;
    totalPages: number;
}> {
    const res = await fetch(`${API_URL}?page=${page}&size=${size}`);
    
    if (!res.ok) {
        throw new Error('Lỗi khi lấy danh sách sản phẩm');
    }

    const data = await res.json();
    
    // Thêm log để kiểm tra dữ liệu trả về
    console.log('API Response:', data);
    
    return {
        products: data.content || [],
        currentPage: data.number || 0,
        totalItems: data.totalElements || 0,
        totalPages: data.totalPages || 1
    };
}

//handle create product(productService.ts)
export async function createProduct(formData: FormData): Promise<Product> {
    const res = await fetch(API_URL, {
        method: 'POST',
        body: formData,
        next: { revalidate: 0 },
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Lỗi khi tạo sản phẩm');
    }

    return res.json();
}
// productService.ts
export async function getProductById(id: number): Promise<Product> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'GET',
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error(`Lỗi khi lấy thông tin sản phẩm: ${res.statusText}`);
  }

  return res.json();
}

export async function updateProduct(id: number, formData: FormData): Promise<Product> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    body: formData,
    credentials: 'include',
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    const errorData = await res.json();
    if (errorData.errors) {
        const errorMessages = errorData.errors.map((err: any) => `${err.field}: ${err.message}`).join(', ');
        throw new Error(errorMessages);
    }

    throw new Error(errorData.message || 'Lỗi khi cập nhật sản phẩm');
  }

  return res.json();
}