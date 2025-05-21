// app/admin/products/page.tsx
import ProductTable from '@/app/components/ProductTable'
import { getAllProducts } from '@/app/services/productService'
import Link from 'next/link'

export default async function ProductListPage() {
  const products = await getAllProducts()
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Danh sách sản phẩm</h2>
      <ProductTable products={products} />
      <Link href="/admin/products/create" className="text-blue-500 underline">
        ➕ Thêm sản phẩm mới
      </Link>
    </div>
  )
}
