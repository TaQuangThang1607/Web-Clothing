// app/services/userService.ts
import { User } from "../types/user";

const API_URL = "http://localhost:8080/admin/users";

export async function getAllUsers(page: number = 0, size: number = 10): Promise<{
    users: User[];
    currentPage: number;
    totalItems: number;
    totalPages: number;
}> {
    const res = await fetch(`${API_URL}?page=${page}&size=${size}`, {
        method: 'GET',
        next: { revalidate: 0 },
    });

    if (!res.ok) {
        throw new Error('Lỗi khi lấy danh sách người dùng');
    }

    return res.json();
}