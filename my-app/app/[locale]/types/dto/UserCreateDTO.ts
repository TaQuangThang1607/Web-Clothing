// app/types/dto/UserCreateDTO.tsx
interface UserCreateDTO {
  email: string;
  fullName: string;
  phone?: string;
  address?: string;
  password: string;
  roleId: number;
}