'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { User } from '@/app/[locale]/types/user';
import { getUserById, updateUser } from '@/app/[locale]/services/userService';

export default function UpdateUserPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  
  const [formData, setFormData] = useState<Partial<User>>({
    email: '',
    fullName: '',
    phone: '',
    address: '',
    role: 2
  });
  
  const [errors, setErrors] = useState<Partial<User>>({});
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
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
      } catch (err: any) {
        setApiError(err.message || 'Không thể tải thông tin người dùng.');
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id]);

  const validateForm = (): boolean => {
    const newErrors: Partial<User> = {};
    
    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    // Validate full name
    if (!formData.fullName?.trim()) {
      newErrors.fullName = 'Họ tên là bắt buộc';
    }
    
    // Validate phone
    if (!formData.phone) {
      newErrors.phone = 'Số điện thoại là bắt buộc';
    } else if (!/^\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    
 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'roleId' ? Number(value) : value
    }));
    
    // Clear error khi người dùng bắt đầu nhập
    if (errors[name as keyof User]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setSuccessMessage(null);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);

    try {
      await updateUser(Number(id), {
        email: formData.email,
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        role: formData.role
      });
      setSuccessMessage('Cập nhật tài khoản thành công! Đang chuyển hướng...');
      setTimeout(() => {
        router.push('/admin/users');
      }, 2000);
    } catch (err: any) {
      setApiError(err.message || 'Đã xảy ra lỗi khi cập nhật người dùng.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p className="text-center">Đang tải...</p>;
  if (apiError && !successMessage) return <p className="text-center text-red-500">{apiError}</p>;

  return (
    <div className="container mx-auto p-4 max-w-2xl text-black">
      <h1 className="text-2xl font-bold mb-6 text-center">Cập nhật Tài Khoản</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName || ''}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Số điện thoại <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vai trò <span className="text-red-500">*</span>
          </label>
          <select
            name="role"
            value={formData.role ?? 2}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value={1}>Quản trị viên (ADMIN)</option>
            <option value={2}>Người dùng (USER)</option>
          </select>
          {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {successMessage}
          </div>
        )}

        {/* API Error */}
        {apiError && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {apiError}
          </div>
        )}

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
      </form>
    </div>
  );
}