import { User } from "../types/user";

const API_URL = 'http://localhost:8080/admin/users'

interface UserListResponse {
    content: User[];
    page: number;
    totalElements: number;
    totalPages: number;
}

export async function getAllUsers(page: number = 0, size: number = 10): Promise<UserListResponse> {
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

export async function deleteUser(id: number): Promise<void> {
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