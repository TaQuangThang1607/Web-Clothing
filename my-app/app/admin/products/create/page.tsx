'use client';

import { createProduct } from "@/app/services/productService";
import { ProductDTO } from "@/app/types/ProductDTO";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CreateProductPage() {
    const [formData, setFormData] = useState<ProductDTO>({
        name: '',
        description: '',
        size: '',
        color: '',
        price: 0,
        imageUrl: '', // Giữ lại để lưu URL từ backend sau khi upload
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null); // State để lưu URL preview hình ảnh
    const [imageFile, setImageFile] = useState<File | null>(null); // State để lưu file hình ảnh
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Xử lý thay đổi input text
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) : value,
        }));
    };

    // Xử lý chọn file hình ảnh
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file)); // Tạo URL tạm để preview
        } else {
            setImageFile(null);
            setImagePreview(null);
        }
    };

    // Xử lý submit form
    const handleSubmit = async (e: React.FormEvent) => {
        const router = useRouter();
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = new FormData();

            // Tạo 1 blob JSON từ DTO
            const jsonBlob = new Blob(
                [JSON.stringify({
                    name: formData.name,
                    description: formData.description,
                    size: formData.size,
                    color: formData.color,
                    price: formData.price
                })],
                { type: 'application/json' }
            );

            // Gắn DTO vào dưới tên dto để match với @RequestPart("product")
            data.append('product', jsonBlob);

            // Gắn ảnh
            if (imageFile) {
                data.append('image', imageFile);
            }

            await createProduct(data);
            setSuccess('Tạo sản phẩm thành công');
            setFormData({ name: '', description: '', size: '', color: '', price: 0, imageUrl: '' });
            setImageFile(null);
            setImagePreview(null);
            setError(null);
            router.push('/admin/product');
        } catch (error) {
            setError('Lỗi khi tạo sản phẩm. Vui lòng kiểm tra lại.');
            setSuccess(null);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Tạo Sản Phẩm</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block">Tên sản phẩm</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block">Mô tả</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border p-2"
                    />
                </div>
                <div>
                    <label htmlFor="size" className="block">Kích thước</label>
                    <input
                        type="text"
                        id="size"
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        className="w-full border p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="color" className="block">Màu sắc</label>
                    <input
                        type="text"
                        id="color"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        className="w-full border p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price" className="block">Giá</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full border p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image" className="block">Hình ảnh</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full border p-2"
                        required
                    />
                </div>
                {imagePreview && (
                    <div>
                        <p className="block">Preview hình ảnh:</p>
                        <img src={imagePreview} alt="Preview" className="mt-2 max-w-xs" />
                    </div>
                )}
                <button
                    type="submit"
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    disabled={isLoading}
                >
                    {isLoading ? 'Đang tạo...' : 'Tạo sản phẩm'}
                </button>
                <Link href="/admin/products" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Quay về trang product
                </Link>
            </form>
            {success && <p className="text-green-500 mt-4">{success}</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
}