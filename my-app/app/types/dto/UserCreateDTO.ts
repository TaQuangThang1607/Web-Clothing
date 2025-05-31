interface UserCreateDTO {
  email: string;
  fullName: string;
  phone?: string;
  address?: string;
  roleId?: number; // Nếu cần chỉ định role khi tạo user
}