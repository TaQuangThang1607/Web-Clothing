// services/productService.ts
import { Product } from "../types/product";

const API_URL = 'http://localhost:8080/admin/products'

// Interface cho kết quả trả về khi lấy danh sách sản phẩm
interface ProductListResponse {
    products: Product[];
    currentPage: number;
    totalItems: number;
    totalPages: number;
}

// Lấy tất cả sản phẩm với phân trang
export async function getAllProducts(page: number = 0, size: number = 10): Promise<ProductListResponse> {
    try {
        const res = await fetch(`${API_URL}?page=${page}&size=${size}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            next: { revalidate: 0 },
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to fetch products');
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

// Lấy sản phẩm theo ID
export async function getProductById(id: number): Promise<Product> {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            next: { revalidate: 0 },
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || `Failed to fetch product with id ${id}`);
        }

        return res.json();
    } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error);
        throw error;
    }
}

// Tạo sản phẩm mới
export async function createProduct(productData: FormData): Promise<Product> {
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            body: productData,
            // Không đặt Content-Type header khi sử dụng FormData
            // Browser sẽ tự động thiết lập với boundary
            next: { revalidate: 0 },
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to create product');
        }

        return res.json();
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
}

// Cập nhật sản phẩm
export async function updateProduct(id: number, productData: FormData): Promise<Product> {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            body: productData,
            // Không đặt Content-Type header khi sử dụng FormData
            credentials: 'include',
            next: { revalidate: 0 },
        });

        if (!res.ok) {
            const errorData = await res.json();
            
            if (errorData.errors) {
                // Xử lý lỗi validation từ server
                const errorMessages = errorData.errors
                    .map((err: any) => `${err.field}: ${err.message}`)
                    .join(', ');
                throw new Error(errorMessages);
            }

            throw new Error(errorData.message || `Failed to update product with id ${id}`);
        }

        return res.json();
    } catch (error) {
        console.error(`Error updating product with id ${id}:`, error);
        throw error;
    }
}

// Xóa sản phẩm (nếu cần)
export async function deleteProduct(id: number): Promise<void> {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            next: { revalidate: 0 },
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || `Failed to delete product with id ${id}`);
        }
    } catch (error) {
        console.error(`Error deleting product with id ${id}:`, error);
        throw error;
    }
}