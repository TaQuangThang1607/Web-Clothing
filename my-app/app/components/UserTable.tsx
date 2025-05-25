// app/components/UserList.tsx
'use client';

import { useState, useEffect } from 'react';
import { getAllUsers } from '../services/userService';
import { User } from '../types/user';

interface UserListResponse {
    users: User[];
    currentPage: number;
    totalItems: number;
    totalPages: number;
}

export default function UserTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const data: UserListResponse = await getAllUsers(currentPage);
                setUsers(data.users);
                setTotalPages(data.totalPages);
            } catch (err) {
                setError('Không thể tải danh sách người dùng');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Danh sách người dùng</h1>
            {error && <p className="text-red-500">{error}</p>}
            {loading ? (
                <p>Đang tải...</p>
            ) : (
                <>
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border">ID</th>
                                <th className="py-2 px-4 border">Họ tên</th>
                                <th className="py-2 px-4 border">Email</th>
                                <th className="py-2 px-4 border">Địa chỉ</th>
                                <th className="py-2 px-4 border">Số điện thoại</th>
                                <th className="py-2 px-4 border">Vai trò</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="py-2 px-4 border">{user.id}</td>
                                    <td className="py-2 px-4 border">{user.fullName}</td>
                                    <td className="py-2 px-4 border">{user.email}</td>
                                    <td className="py-2 px-4 border">{user.address}</td>
                                    <td className="py-2 px-4 border">{user.phone}</td>
                                    <td className="py-2 px-4 border">{user.role.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Phân trang */}
                    <div className="mt-4 flex justify-center">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 0}
                            className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Trước
                        </button>
                        <span className="px-4 py-2">
                            Trang {currentPage + 1} / {totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage + 1 >= totalPages}
                            className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Sau
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}