import Link from "next/link";
import { deleteUser } from "../services/userService";
import { User } from "../types/user";
import { useState } from "react";

interface Props {
  users: User[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function UserTable({ users, currentPage, totalPages, onPageChange }: Props) {
  const [search, setSearch] = useState("");

  const handleDelete = async (id: number) => {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      try {
        await deleteUser(id);
        onPageChange(currentPage);
        alert('Xóa sản phẩm thành công!');
      } catch (error) {
        alert('Lỗi khi xóa sản phẩm');
      }
    }
  };

  // Lọc user theo tên
  const filteredUsers = users.filter(u =>
    u.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Tìm kiếm tên người dùng..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 rounded w-64 mr-2 text-black"
        />
      </div>
      <table className="w-full border-collapse border border-gray-300 text-black">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Full Name</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">hanh dong</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? filteredUsers.map(p => (
            <tr key={p.id}>
              <td className="border p-2">{p.id}</td>
              <td className="border p-2">{p.email}</td>
              <td className="border p-2">{p.fullName}</td>
              <td className="border p-2">{p.phone}</td>
              <td className="border p-2">{p.address}</td>
              <td className="border p-2">
                <Link href={`/admin/users/update/${p.id}`} className="text-blue-500 hover:underline mr-2">
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
          )) : (
            <tr>
              <td colSpan={6} className="text-center p-4">Không có người dùng nào.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center space-x-2">
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