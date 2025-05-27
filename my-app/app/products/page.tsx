'use client'
import { useEffect, useState } from "react"
import FooterPage from "../components/Footer"
import Header from "../components/Header"
import { getAllProducts } from "../services/productService"
import { Product } from "../types/product"
// app/products/page.tsx
export default function ListProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null)

    const brands = [
        { name: "Nike", count: 0 },
        { name: "Converse", count: 0 },
        { name: "Adidas", count: 0 },
        { name: "Jordan", count: 0 },
        { name: "Vans", count: 0 }
    ]

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                const data = await getAllProducts(currentPage)
                setProducts(data.content)
                
               const updatedBrands = brands.map(brand => ({
                ...brand,
                count: data.content.filter(p => p.category === brand.name).length
                }))

                
                setFilteredProducts(data.content)
                setTotalPages(data.totalPages)
                setLoading(false)
            } catch (err) {
                let errorMessage = 'Failed to fetch products'
                if (err instanceof Error) {
                    errorMessage = err.message
                }
                setError(errorMessage)
                setLoading(false)
            }
        }

        fetchProducts()
    }, [currentPage])

    const handleBrandFilter = (brand: string) => {
        if (selectedBrand === brand) {
            setSelectedBrand(null)
            setFilteredProducts(products)
        } else {
            setSelectedBrand(brand)
            const filtered = products.filter(product => product.category === brand)
            setFilteredProducts(filtered)
        }
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
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

    return (
        <>
            <Header />
            <div className="bg-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Shoes</h1>
                    <div className="grid grid-cols-1 gap-6">
                        <div className="col-span-1">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                <div className="lg:col-span-4">
                                    <div className="flex w-full">
                                        <input 
                                            type="search" 
                                            className="flex-grow p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                            placeholder=""
                                        />
                                        <span className="bg-gray-100 p-3 border border-l-0 border-gray-300 rounded-r-md">
                                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                <div className="lg:col-span-5"></div>
                                <div className="lg:col-span-3">
                                    <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                                        <label htmlFor="fruits" className="text-gray-700">Default Sorting:</label>
                                        <select 
                                            id="fruits" 
                                            name="fruitlist" 
                                            className="bg-gray-50 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded text-black" 
                                        >
                                            <option value="volvo" className="text-black">Nothing</option>
                                            <option value="saab" className="text-black">Popularity</option>
                                            <option value="opel" className="text-black">Organic</option>
                                            <option value="audi" className="text-black">Fantastic</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
                                <div className="lg:col-span-3">
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900">Brands</h4>
                                            <ul className="space-y-2">
                                                {brands.map((brand, index) => (
                                                    <li 
                                                        key={index} 
                                                        className="flex justify-between items-center cursor-pointer"
                                                        onClick={() => handleBrandFilter(brand.name)}
                                                    >
                                                        <span className={`flex items-center ${selectedBrand === brand.name ? 'text-blue-500 font-medium' : 'text-gray-700 hover:text-blue-500'}`}>
                                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            {brand.name}
                                                        </span>
                                                        <span className="text-gray-500">({brand.count})</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Price</h4>
                                            <input 
                                                type="range" 
                                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                                                id="rangeInput" 
                                                name="rangeInput" 
                                                min="0" 
                                                max="500" 
                                                defaultValue="0" 
                                            />
                                            <output id="amount" name="amount" className="text-gray-700">0</output>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Additional</h4>
                                            {["Organic", "Fresh", "Sales", "Discount", "Expired"].map((item, index) => (
                                                <div key={index} className="mb-2">
                                                    <input 
                                                        type="radio" 
                                                        className="mr-2 focus:ring-blue-500" 
                                                        id={`Categories-${index + 1}`} 
                                                        name="Categories-1" 
                                                        value={item}
                                                    />
                                                    <label htmlFor={`Categories-${index + 1}`} className="text-gray-700">{item}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:col-span-9">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filteredProducts.map((product) => (
                                            <div key={product.id} className="relative rounded-lg shadow-md overflow-hidden">
                                                <div className="relative">
                                                    <img 
                                                        src={`http://localhost:8080${product.imageUrl}`} 
                                                        alt={product.name} 
                                                        className="w-full h-48 object-cover rounded-t-lg" 
                                                        />

                                                    <div className="absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 rounded text-sm">
                                                        {product.category || 'Fruits'}
                                                    </div>
                                                </div>
                                                <div className="p-4 border border-t-0 border-gray-200 rounded-b-lg">
                                                    <h4 className="text-lg font-semibold text-gray-900">{product.name}</h4>
                                                    <p className="text-gray-600 text-sm">{product.description}</p>
                                                    <div className="flex justify-between items-center mt-4 flex-wrap">
                                                        <p className="text-gray-900 font-bold text-lg">{product.price != null && !isNaN(product.price) 
                                                                                                            ? Number(product.price).toFixed(2) 
                                                                                                            : 'N/A'} đ
                                                                                                        / {product.size}</p>
                                                        <a href="#" className="bg-white border border-gray-300 text-blue-500 px-3 py-2 rounded-full hover:bg-blue-500 hover:text-white transition flex items-center">
                                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                            </svg>
                                                            Add to cart
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                                            <div className="flex justify-center mt-8 space-x-2">
                                                <button 
                                                    onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
                                                    disabled={currentPage === 0}
                                                    className="px-3 py-2 border border-gray-300 rounded hover:bg-blue-500 hover:text-white disabled:opacity-50"
                                                >
                                                    «
                                                </button>
                                                {Array.from({ length: Math.min(6, totalPages) }, (_, i) => i).map((page) => (
                                                    <button
                                                        key={page}
                                                        onClick={() => handlePageChange(page)}
                                                        className={`px-3 py-2 border border-gray-300 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'}`}
                                                    >
                                                        {page + 1}
                                                    </button>
                                                ))}
                                                <button 
                                                    onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
                                                    disabled={currentPage >= totalPages - 1}
                                                    className="px-3 py-2 border border-gray-300 rounded hover:bg-blue-500 hover:text-white disabled:opacity-50"
                                                >
                                                    »
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterPage />
        </>
    )
}