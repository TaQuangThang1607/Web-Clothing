import FooterPage from "../components/Footer"
import Header from "../components/Header"

export default function ListProducts() {
    return (
        <>
        <Header />
        <div className="bg-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Fresh Fruits Shop</h1>
                <div className="grid grid-cols-1 gap-6">
                    <div className="col-span-1">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            <div className="lg:col-span-4">
                                <div className="flex w-full">
                                    <input 
                                        type="search" 
                                        className="flex-grow p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                        placeholder="keywords"
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
                                        <h4 className="text-lg font-semibold text-gray-900">Categories</h4>
                                        <ul className="space-y-2">
                                            {[
                                                { name: "Apples", count: 3 },
                                                { name: "Oranges", count: 5 },
                                                { name: "Strawberry", count: 2 },
                                                { name: "Banana", count: 8 },
                                                { name: "Pumpkin", count: 5 }
                                            ].map((category, index) => (
                                                <li key={index} className="flex justify-between items-center">
                                                    <a href="#" className="flex items-center text-gray-700 hover:text-blue-500">
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        {category.name}
                                                    </a>
                                                    <span className="text-gray-500">({category.count})</span>
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
                                    {[
                                        { name: "Grapes", img: "fruite-item-5.jpg" },
                                        { name: "Grapes", img: "fruite-item-5.jpg" },
                                        { name: "Raspberries", img: "fruite-item-2.jpg" },
                                        { name: "Apricots", img: "fruite-item-4.jpg" },
                                        { name: "Banana", img: "fruite-item-3.jpg" },
                                        { name: "Oranges", img: "fruite-item-1.jpg" },
                                        { name: "Raspberries", img: "fruite-item-2.jpg" },
                                        { name: "Grapes", img: "fruite-item-5.jpg" },
                                        { name: "Oranges", img: "fruite-item-1.jpg" }
                                    ].map((item, index) => (
                                        <div key={index} className="relative rounded-lg shadow-md overflow-hidden">
                                            <div className="relative">
                                                <img src={`img/${item.img}`} className="w-full h-48 object-cover rounded-t-lg" alt="" />
                                                <div className="absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 rounded text-sm">Fruits</div>
                                            </div>
                                            <div className="p-4 border border-t-0 border-gray-200 rounded-b-lg">
                                                <h4 className="text-lg font-semibold text-gray-900">{item.name}</h4>
                                                <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                                <div className="flex justify-between items-center mt-4 flex-wrap">
                                                    <p className="text-gray-900 font-bold text-lg">$4.99 / kg</p>
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
                                            <a href="#" className="px-3 py-2 border border-gray-300 rounded hover:bg-blue-500 hover:text-white">«</a>
                                            {[1, 2, 3, 4, 5, 6].map((page) => (
                                                <a key={page} href="#" className={`px-3 py-2 border border-gray-300 rounded ${page === 1 ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'}`}>{page}</a>
                                            ))}
                                            <a href="#" className="px-3 py-2 border border-gray-300 rounded hover:bg-blue-500 hover:text-white">»</a>
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