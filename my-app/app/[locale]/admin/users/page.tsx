'use client'
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "../../types/user";
import { getAllUsers } from "../../services/userService";
import UserTable from "../../components/UserTable";

// app/admin/users/page.tsx
export default function UserListPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [products, setProducts] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(parseInt(searchParams.get('page') || '0'));
    const [totalPages, setTotalPages] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
          setIsLoading(true);
          try {
            const data = await getAllUsers(currentPage, 10);
            setProducts(data.content);
            setTotalPages(data.totalPages);
          } catch (error) {
            console.error('Lỗi khi lấy sản phẩm:', error);
          } finally {
            setIsLoading(false);
          }
        };
        fetchProducts();
      }, [currentPage]);

        const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        router.push(`/admin/users?page=${newPage}`); // Sửa lại thành /admin/users
    };

    return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4 text-black">Danh sách sản phẩm</h2>
      <Link href="/admin/users/create" className="inline-block mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Thêm người dùng mới
      </Link>
      {isLoading ? (
        <p>Đang tải...</p>
      ) : (
        <UserTable
          users={products}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}