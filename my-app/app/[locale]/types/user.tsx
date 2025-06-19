export interface User {
  id: number;
  email: string;
  password?: string;
  fullName?: string;
  phone?: string;
  address?: string;
  role: number;
}