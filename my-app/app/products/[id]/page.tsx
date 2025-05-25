// app/product/[id]/page.tsx
'use client'

import FooterPage from "@/app/components/Footer"
import Header from "@/app/components/Header"
import { getProductById } from "@/app/services/productService"
import { Product } from "@/app/types/product"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function ProductDetail() {
    const { id } = useParams()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [quantity, setQuantity] = useState(1)
    const [selectedImage, setSelectedImage] = useState(0)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true)
                const data = await getProductById(Number(id))
                setProduct(data)
                setLoading(false)
            } catch (err) {
                let errorMessage = 'Failed to fetch product details'
                if (err instanceof Error) {
                    errorMessage = err.message
                }
                setError(errorMessage)
                setLoading(false)
            }
        }

        fetchProduct()
    }, [id])

    const handleQuantityChange = (value: number) => {
        const newQuantity = quantity + value
        if (newQuantity >= 1 && newQuantity <= 10) {
            setQuantity(newQuantity)
        }
    }

    if (loading) {
        return (
            <>
                <Header />
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
                <FooterPage />
            </>
        )
    }

    if (error) {
        return (
            <>
                <Header />
                <div className="flex justify-center items-center h-screen">
                    <div className="text-red-500">{error}</div>
                </div>
                <FooterPage />
            </>
        )
    }

    if (!product) {
        return (
            <>
                <Header />
                <div className="flex justify-center items-center h-screen">
                    <div className="text-gray-500">Product not found</div>
                </div>
                <FooterPage />
            </>
        )
    }

    // Mock multiple images for the product
    const productImages = [
        product.imageUrl,
        "https://via.placeholder.com/600x600?text=Product+Image+2",
        "https://via.placeholder.com/600x600?text=Product+Image+3",
        "https://via.placeholder.com/600x600?text=Product+Image+4"
    ]

    return (
        <>
            <Header />
            <div className="bg-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex mb-6" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                                    <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                                    </svg>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                    </svg>
                                    <Link href="/products" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">Products</Link>
                                </div>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                    </svg>
                                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{product.name}</span>
                                </div>
                            </li>
                        </ol>
                    </nav>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Product Images */}
                        <div>
                            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
                                <img 
                                    src={productImages[selectedImage]} 
                                    alt={product.name} 
                                    className="w-full h-96 object-contain"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {productImages.map((img, index) => (
                                    <button 
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`border-2 rounded-md overflow-hidden ${selectedImage === index ? 'border-blue-500' : 'border-transparent'}`}
                                    >
                                        <img 
                                            src={img} 
                                            alt={`Thumbnail ${index + 1}`} 
                                            className="w-full h-20 object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                            <div className="flex items-center mb-4">
                                <div className="flex items-center">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg
                                            key={star}
                                            className={`w-5 h-5 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-gray-600 ml-2">(24 reviews)</span>
                            </div>

                            <div className="mb-6">
                                <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                                {product.price > 50 && (
                                    <span className="ml-2 text-sm text-gray-500 line-through">${(product.price * 1.2).toFixed(2)}</span>
                                )}
                                {product.price > 50 && (
                                    <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">20% OFF</span>
                                )}
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                                <p className="text-gray-700">{product.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Brand</h4>
                                    <p className="text-gray-900">{product.brand || 'No brand'}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Category</h4>
                                    <p className="text-gray-900">{product.category}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Color</h4>
                                    <p className="text-gray-900">{product.color}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Size</h4>
                                    <p className="text-gray-900">{product.size}</p>
                                </div>
                            </div>

                            <div className="flex items-center mb-8">
                                <div className="flex items-center border border-gray-300 rounded-md mr-4">
                                    <button 
                                        onClick={() => handleQuantityChange(-1)}
                                        className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-2">{quantity}</span>
                                    <button 
                                        onClick={() => handleQuantityChange(1)}
                                        className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                                    >
                                        +
                                    </button>
                                </div>
                                <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Add to Cart
                                </button>
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Shipping & Returns</h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>Free shipping on orders over $50</li>
                                    <li>30-day return policy</li>
                                    <li>Secure checkout</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Related Products */}
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">You may also like</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Mock related products */}
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
                                    <div className="bg-gray-100 h-48 flex items-center justify-center">
                                        <img 
                                            src={`https://via.placeholder.com/300x300?text=Related+Product+${item}`} 
                                            alt={`Related product ${item}`} 
                                            className="h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-medium text-gray-900 mb-1">Related Product {item}</h3>
                                        <div className="flex items-center mb-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <svg
                                                    key={star}
                                                    className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-gray-900">${(product.price * (0.8 + Math.random() * 0.4)).toFixed(2)}</span>
                                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <FooterPage />
        </>
    )
}