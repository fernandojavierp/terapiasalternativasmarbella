"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
}

interface GallerySliderProps {
  images: GalleryImage[];
  onImageClick: (src: string) => void;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function GallerySlider({ 
  images, 
  onImageClick, 
  autoPlay = false, 
  autoPlayInterval = 5000 
}: GallerySliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesPerView, setImagesPerView] = useState(1);

  // Responsive images per view
  useEffect(() => {
    const updateImagesPerView = () => {
      if (window.innerWidth >= 1280) {
        setImagesPerView(4);
      } else if (window.innerWidth >= 1024) {
        setImagesPerView(3);
      } else if (window.innerWidth >= 640) {
        setImagesPerView(2);
      } else {
        setImagesPerView(1);
      }
    };

    updateImagesPerView();
    window.addEventListener('resize', updateImagesPerView);
    
    return () => window.removeEventListener('resize', updateImagesPerView);
  }, []);

  // Auto play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.max(0, images.length - imagesPerView);
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, images.length, imagesPerView]);

  const nextSlide = () => {
    const maxIndex = Math.max(0, images.length - imagesPerView);
    setCurrentIndex((prevIndex) => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    const maxIndex = Math.max(0, images.length - imagesPerView);
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? maxIndex : prevIndex - 1
    );
  };



  return (
    <section className="w-full bg-muted/50">
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Galería</h2>
        
        <div className="relative">
          {/* Slider container */}
          <div className="overflow-hidden rounded-lg">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / imagesPerView)}%)`
              }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-2"
                  style={{ width: `${100 / imagesPerView}%` }}
                >
                  <div
                    className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                    onClick={() => onImageClick(image.src)}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      width={400}
                      height={400}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          {images.length > imagesPerView && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 z-10"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 z-10"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
} 