// services/productService.ts
import { ProductDTO } from "../types/dto/ProductDTO";
import { Product } from "../types/product";

const API_URL = 'http://localhost:8080/admin/products'

interface ProductListResponse {
    content: Product[];
    page: number;
    totalElements: number;
    totalPages: number;
}



export async function getAllProducts(page: number = 0, size: number = 10): Promise<ProductListResponse> {
    try {
        const res = await fetch(`${API_URL}?page=${page}&size=${size}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            next: { revalidate: 0 },
        });

        if (res.status === 204) {
            return {
                content: [], 
                page: page,
                totalElements: 0,
                totalPages: 0
            };
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
      throw new Error(errorData.message || `Không thể lấy thông tin sản phẩm với id ${id}`);
    }

    const response = await res.json();
    return response.data; // Trích xuất trường data
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
export async function updateProduct(id: number, productData: ProductDTO, imageFile?: File) {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(productData)], {
        type: 'application/json'  // Rõ ràng hơn về kiểu dữ liệu
    }));
    
    if (imageFile) {
        formData.append('image', imageFile);
    }

    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        body: formData,
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || `Failed to update product with id ${id}`);
    }

    return res.json();
}


export async function updateProductWithImage(id: number, formData: FormData) {
    const res = await fetch(`${API_URL}/${id}/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!res.ok) {
        let errorMessage = `Failed to update product image with id ${id}`;
        try {
            const errorData = await res.json();
            errorMessage = errorData.message || errorMessage;
        } catch (_) {}
        throw new Error(errorMessage);
    }

    return res.json();
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
// Thêm vào productService.ts
export async function getRandomProducts(count: number = 10): Promise<Product[]> {
  try {
    // Lấy tất cả sản phẩm (hoặc có thể tối ưu bằng cách lấy ngẫu nhiên từ backend)
    const allProducts = await getAllProducts(0, 100); // Lấy nhiều sản phẩm
    
    // Lấy ngẫu nhiên
    const shuffled = [...allProducts.content].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  } catch (error) {
    console.error('Error fetching random products:', error);
    throw error;
  }
}