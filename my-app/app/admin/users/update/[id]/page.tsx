// app/admin/update/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getUserById, updateUser } from '@/app/services/userService';
import { User } from '@/app/types/user';

export default function UpdateUserPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  
  const [formData, setFormData] = useState<Partial<User>>({
    email: '',
    fullName: '',
    phone: '',
    address: '',
    role: { id: 2, name: 'USER', description: '' }
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getUserById(Number(id));
        setFormData({
          email: user.email,
          fullName: user.fullName,
          phone: user.phone,
          address: user.address,
          role: user.role
        });
      } catch (err) {
        setError('Không thể tải thông tin người dùng.');
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id]);

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;

  if (name === 'role') {
    setFormData(prev => ({
      ...prev,
      role: {
        id: value === 'ADMIN' ? 1 : 2, // ADMIN=1, USER=2
        name: value,
        description: prev.role?.description || '' // đảm bảo là string
      }
    }));
  } else {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await updateUser(Number(id), {
        email: formData.email,
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        role: formData.role
      });
      router.push('/admin/users');
    } catch (err) {
      setError('Đã xảy ra lỗi khi cập nhật người dùng.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p className="text-center">Đang tải...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4 max-w-2xl text-black">
      <h1 className="text-2xl font-bold mb-6 text-center">Cập nhật Tài Khoản</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded border-gray-300"
          />
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded border-gray-300"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded border-gray-300"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
          <textarea
            name="address"
            value={formData.address || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded border-gray-300"
            rows={3}
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
          <select
            name="role"
            value={formData.role?.name || 'USER'}
            onChange={handleChange}
            className="w-full p-2 border rounded border-gray-300"
          >
            <option value="USER">Người dùng (USER)</option>
            <option value="ADMIN">Quản trị viên (ADMIN)</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded text-white font-medium ${
              isSubmitting ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật tài khoản'}
          </button>
        </div>

        {/* API Error */}
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
