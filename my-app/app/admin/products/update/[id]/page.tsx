'use client';

import { getProductById, updateProduct } from '@/app/services/productService';
import { ProductDTO } from '@/app/types/ProductDTO';
import { useRouter, useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
// app/admin/products/[id]/page.tsx
export default function UpdateProduct() {
  const router = useRouter();
  const { id } = useParams(); // Lấy id từ dynamic route

  const [formData, setFormData] = useState<ProductDTO>({
    name: '',
    description: '',
    size: '',
    color: '',
    price: 0,
    imageUrl: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const product = await getProductById(parseInt(id as string));
          setFormData({
            name: product.name,
            description: product.description || '',
            size: product.size,
            color: product.color,
            price: product.price,
            imageUrl: product.imageUrl || '',
          });
          setImagePreview(product.imageUrl || null);
        } catch (err) {
          setError('Lỗi khi lấy thông tin sản phẩm');
        }
      };
      fetchProduct();
    } else {
      setError('Không tìm thấy ID sản phẩm');
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? (value ? parseFloat(value) : 0) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Vui lòng chọn một file hình ảnh hợp lệ (jpg, png, ...).');
        setImageFile(null);
        setImagePreview(null);
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError(null);
    } else {
      setImageFile(null);
      setImagePreview(formData.imageUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) {
      setError('Không tìm thấy ID sản phẩm');
      return;
    }

    if (formData.name.length > 100) {
      setError('Tên sản phẩm không được vượt quá 100 ký tự');
      return;
    }
    if (formData.description.length > 500) {
      setError('Mô tả không được vượt quá 500 ký tự');
      return;
    }
    if (formData.size.length > 10) {
      setError('Kích thước không được vượt quá 10 ký tự');
      return;
    }
    if (formData.color.length > 10) {
      setError('Màu sắc không được vượt quá 10 ký tự');
      return;
    }
    if (formData.price <= 0) {
      setError('Giá phải lớn hơn 0');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const data = new FormData();
      const jsonBlob = new Blob(
        [JSON.stringify({
          name: formData.name,
          description: formData.description,
          size: formData.size,
          color: formData.color,
          price: formData.price,
        })],
        { type: 'application/json' }
      );

      data.append('product', jsonBlob);
      if (imageFile) {
        data.append('image', imageFile);
      }

      await updateProduct(parseInt(id as string), data);
      setSuccess('Cập nhật sản phẩm thành công!');
      setTimeout(() => {
        router.push('/admin/products');
      }, 1000);
    } catch (error: any) {
      setError(error.message || 'Lỗi khi cập nhật sản phẩm. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Chỉnh sửa sản phẩm</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên sản phẩm <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Mô tả</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
          />
        </div>
        <div>
          <label htmlFor="size" className="block text-sm font-medium text-gray-700">Kích thước <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="color" className="block text-sm font-medium text-gray-700">Màu sắc <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Giá <span className="text-red-500">*</span></label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price || ''}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Hình ảnh</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 w-full border rounded-md p-2"
          />
        </div>
        {imagePreview && (
          <div>
            <p className="block text-sm font-medium text-gray-700">Preview hình ảnh:</p>
            <img src={imagePreview} alt="Preview" className="mt-2 max-w-xs rounded-md shadow-sm" />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Đang cập nhật...
            </>
          ) : (
            'Cập nhật sản phẩm'
          )}
        </button>
      </form>
      {success && <p className="text-green-600 mt-4 font-medium">{success}</p>}
      {error && <p className="text-red-600 mt-4 font-medium">{error}</p>}
    </div>
  );
}