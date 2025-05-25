import { Product } from "../types/product"
import { ProductDTO } from "../types/ProductDTO"


const API_URL = 'http://localhost:8080/admin/products'
//handle get all product
export async function getAllProducts(page: number = 0, size: number = 10): Promise<{
    products: Product[];
    currentPage: number;
    totalItems: number;
    totalPages: number;
}> {
    const res = await fetch(`${API_URL}?page=${page}&size=${size}`, {
        method: 'GET',
        next: { revalidate: 0 },
    });

    if (!res.ok) {
        throw new Error('Lỗi khi lấy danh sách sản phẩm');
    }

    return res.json();
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