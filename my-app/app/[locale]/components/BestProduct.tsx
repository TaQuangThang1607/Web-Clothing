'use client'
import { useState } from "react";
import { ShoppingCart, Eye, ChevronLeft, ChevronRight } from "lucide-react";

// Sample data - bạn có thể thay thế bằng data thực tế
const featuredProducts = [
  { id: 1, image: "images/card-item1.jpg", title: "Running shoes for men", price: 99 },
  { id: 2, image: "images/card-item2.jpg", title: "Sport sneakers", price: 129 },
  { id: 3, image: "images/card-item3.jpg", title: "Casual shoes", price: 89 },
  { id: 4, image: "images/card-item4.jpg", title: "Fashion boots", price: 159 },
  { id: 5, image: "images/card-item5.jpg", title: "Basketball shoes", price: 179 },
  { id: 6, image: "images/card-item6.jpg", title: "Hiking boots", price: 199 },
  { id: 7, image: "images/card-item7.jpg", title: "Tennis shoes", price: 119 },
  { id: 8, image: "images/card-item8.jpg", title: "Formal shoes", price: 149 },
];

const latestProducts = [
  { id: 9, image: "images/card-item6.jpg", title: "Latest running shoes", price: 109 },
  { id: 10, image: "images/card-item7.jpg", title: "New sport shoes", price: 139 },
  { id: 11, image: "images/card-item8.jpg", title: "Premium sneakers", price: 189 },
  { id: 12, image: "images/card-item9.jpg", title: "Designer shoes", price: 229 },
  { id: 13, image: "images/card-item10.jpg", title: "Comfort shoes", price: 99 },
  { id: 14, image: "images/card-item1.jpg", title: "Limited edition", price: 299 },
];

const collections = [
  {
    id: 1,
    image: "https://themewagon.github.io/stylish/images/collection-item1.jpg",
    title: "Minimal Collection",
    alt: "minimal collection"
  },
  {
    id: 2,
    image: "https://themewagon.github.io/stylish/images/collection-item2.jpg",
    title: "Sneakers Collection",
    alt: "sneakers collection"
  }
];

interface ProductCardProps {
  product: {
    id: number;
    image: string;
    title: string;
    price: number;
  };
}

const ProductCard = ({ product }: ProductCardProps) => (
  <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
    <div className="relative overflow-hidden">
      <img 
        src={product.image} 
        alt={product.title}
        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="flex gap-2">
          <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200 group/btn">
            <ShoppingCart className="w-5 h-5 text-gray-700 group-hover/btn:text-gray-900" />
          </button>
          <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200 group/btn">
            <Eye className="w-5 h-5 text-gray-700 group-hover/btn:text-gray-900" />
          </button>
        </div>
      </div>
    </div>
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-normal text-gray-800 hover:text-gray-600 transition-colors cursor-pointer">
          {product.title}
        </h3>
        <span className="text-lg font-bold text-gray-900">${product.price}</span>
      </div>
    </div>
  </div>
);

interface ProductCarouselProps {
  products: Array<{
    id: number;
    image: string;
    title: string;
    price: number;
  }>;
  title: string;
}

const ProductCarousel = ({ products, title }: ProductCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;
  const maxIndex = Math.max(0, products.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-light uppercase tracking-wide text-gray-900">
            {title}
          </h2>
          <a 
            href="#" 
            className="text-sm uppercase font-bold tracking-wider text-gray-700 hover:text-gray-900 border-b border-gray-300 hover:border-gray-900 pb-1 transition-colors duration-300"
          >
            View all
          </a>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
                width: `${(products.length / itemsPerPage) * 100}%`
              }}
            >
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="flex-shrink-0"
                  style={{ width: `${100 / products.length}%` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {currentIndex > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg p-3 rounded-full hover:bg-gray-50 transition-colors duration-200 z-10"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
          )}
          
          {currentIndex < maxIndex && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg p-3 rounded-full hover:bg-gray-50 transition-colors duration-200 z-10"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          )}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                currentIndex === index ? 'bg-gray-800' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default function BestProduct() {
  return (
    <div className="bg-gray-50">
      {/* Featured Products */}
      <ProductCarousel products={featuredProducts} title="Featured Products" />

      {/* Collection Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {collections.map((collection) => (
              <div key={collection.id} className="relative group rounded-xl overflow-hidden">
                <img 
                  src={collection.image} 
                  alt={collection.alt}
                  className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 lg:p-8 text-white">
                  <h3 className="text-3xl lg:text-4xl font-light mb-4">
                    {collection.title}
                  </h3>
                  <a 
                    href="#" 
                    className="inline-block uppercase text-sm font-bold tracking-wider border-b border-white/50 pb-1 hover:border-white transition-colors duration-300"
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Products */}
      <ProductCarousel products={latestProducts} title="Latest Products" />
    </div>
  );
}