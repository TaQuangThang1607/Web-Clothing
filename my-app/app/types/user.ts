// app/types/user.ts
export interface Role {
    id: number;
    name: string;
    description: string;
}

export interface User {
    id: number;
    email: string;
    password: string;
    fullName: string;
    address: string;
    phone: string;
    role: Role;
}