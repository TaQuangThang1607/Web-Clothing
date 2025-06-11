'use client'
import { useState } from "react";

const slides = [
  {
    id: 1,
    type: 'single',
    image: 'https://themewagon.github.io/stylish/images/card-image1.jpg',
    title: 'Stylish shoes for Women',
    alt: 'shoes'
  },
  {
    id: 2,
    type: 'double',
    items: [
      {
        image: 'https://themewagon.github.io/stylish/images/card-image2.jpg',
        title: 'Sports Wear',
        alt: 'shoes'
      },
      {
        image: 'https://themewagon.github.io/stylish/images/card-image3.jpg',
        title: 'Fashion Shoes',
        alt: 'shoes'
      }
    ]
  },
  {
    id: 3,
    type: 'single',
    image: 'https://themewagon.github.io/stylish/images/card-image5.jpg',
    title: 'Stylish shoes for men',
    alt: 'shoes'
  },
  {
    id: 4,
    type: 'double',
    items: [
      {
        image: 'https://themewagon.github.io/stylish/images/card-image6.jpg',
        title: 'Men Shoes',
        alt: 'shoes'
      },
      {
        image: 'images/card-image6.jpg',
        title: 'Women Shoes',
        alt: 'shoes'
      }
    ]
  }
];

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const renderSlide = (slide: any) => {
    if (slide.type === 'single') {
      return (
        <div className="relative w-full h-96 lg:h-[500px] rounded-lg overflow-hidden group">
          <img 
            src={slide.image} 
            alt={slide.alt} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 lg:p-10 text-white">
            <h2 className="text-3xl lg:text-5xl font-light mb-4 leading-tight">
              {slide.title}
            </h2>
            <a 
              href="#" 
              className="inline-block uppercase text-sm font-bold tracking-wider border-b border-white/50 pb-1 hover:border-white transition-colors duration-300"
            >
              Shop Now
            </a>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-4 h-96 lg:h-[500px]">
        {slide.items.map((item: any, index: number) => (
          <div key={index} className="relative rounded-lg overflow-hidden group">
            <img 
              src={item.image} 
              alt={item.alt} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 lg:p-6 text-white">
              <h2 className="text-2xl lg:text-3xl font-light mb-3 leading-tight">
                {item.title}
              </h2>
              <a 
                href="#" 
                className="inline-block uppercase text-xs font-bold tracking-wider border-b border-white/50 pb-1 hover:border-white transition-colors duration-300"
              >
                Shop Now
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id="intro" className="relative mt-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Carousel Container */}
        <div className="relative overflow-hidden rounded-xl">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="w-full flex-shrink-0 px-2">
                {renderSlide(slide)}
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors duration-300 group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors duration-300 group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 ${
                currentSlide === index 
                  ? 'bg-gray-800 scale-110' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}