// components/ProductTable.tsx
import Link from "next/link";
import { Product } from "../types/product";

interface Props {
  products: Product[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ProductTable({ products, currentPage, totalPages, onPageChange }: Props) {
  return (
    <div>
      <table className="text-black w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Tên</th>
            <th className="border p-2">Giá</th>
            <th className="border p-2">Size</th>
            <th className="border p-2">Màu</th>
            <th className="border p-2">hanh dong</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td className="border p-2">{p.id}</td>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.price}</td>
              <td className="border p-2">{p.size}</td>
              <td className="border p-2">{p.color}</td>
              <td className="border p-2">
                    <Link href={`/admin/products/update/${p.id}`} className="text-blue-500 hover:underline">
                        Chỉnh sửa
                    </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-black mt-4 flex justify-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Trang trước
        </button>
        <span className="px-4 py-2">
          Trang {currentPage + 1} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Trang sau
        </button>
      </div>
    </div>
  );
}