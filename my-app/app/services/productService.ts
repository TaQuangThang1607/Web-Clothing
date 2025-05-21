import { Product } from "../types/product"


const API_URL = 'http://localhost:8080/admin/products'

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 0 }, // Disable cache nếu cần real-time
  })

  if (!res.ok) {
    throw new Error('Lỗi khi tải danh sách sản phẩm')
  }

  return res.json()
}
