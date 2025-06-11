export interface User {
  id: number;
  email: string;
  password?: string;
  fullName?: string;
  phone?: string;
  address?: string;
  roleId: number;
}