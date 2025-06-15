import Link from "next/link";
import { Product } from "../types/product";
import { deleteProduct } from "../services/productService";

interface Props {
  products: Product[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ProductTable({ products, currentPage, totalPages, onPageChange }: Props) {
  const handleDelete = async (id: number) => {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      try {
        await deleteProduct(id);
        onPageChange(currentPage); // Làm mới trang
        alert('Xóa sản phẩm thành công!');
      } catch (error) {
        alert('Lỗi khi xóa sản phẩm');
      }
    }
  };

  return (
    <div>
      <table className="w-full border-collapse border border-gray-300 text-black">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Tên</th>
            <th className="border p-2">Giá</th>
            <th className="border p-2">brand</th>
            <th className="border p-2">Màu</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            products.map(p => (
              <tr key={p.id}>
                <td className="border p-2">{p.id}</td>
                <td className="border p-2">{p.name}</td>
                <td className="border p-2">
                  {p.price != null ? p.price.toLocaleString('vi-VN', { minimumFractionDigits: 0 }) : 'N/A'}
                </td>
                <td className="border p-2">{p.brand}</td>
                <td className="border p-2">{p.color}</td>
                <td className="border p-2">
                  <Link href={`/admin/products/update/${p.id}`} className="text-blue-500 hover:underline mr-2">
                    Chỉnh sửa
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-500 hover:underline"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center p-4">Không có sản phẩm nào.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center space-x-2 text-black">
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
