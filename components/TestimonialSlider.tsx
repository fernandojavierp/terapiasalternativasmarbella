// components/TestimonialSlider.tsx
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  nombre: string;
  testimonio: string;
  puntuacion: number;
  aprobado: boolean;
  visible: boolean;
}

export function TestimonialSlider() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonios');
      if (response.ok) {
        const data = await response.json();
        setTestimonials(data);
      }
    } catch (error) {
      console.error('Error loading testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Auto-play functionality
    let interval: NodeJS.Timeout;
    if (isAutoPlaying && testimonials.length > 0) {
      interval = setInterval(() => {
        goToNext();
      }, 5000);
    }

    // Responsive slides to show
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [isAutoPlaying, currentIndex, testimonials.length]);

  const goToPrev = () => {
    setCurrentIndex(prev => 
      prev === 0 ? Math.max(0, testimonials.length - slidesToShow) : prev - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10s
  };

  const goToNext = () => {
    setCurrentIndex(prev => 
      prev >= testimonials.length - slidesToShow ? 0 : prev + 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10s
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10s
  };

  // Adjust currentIndex if it's out of bounds when slidesToShow changes
  useEffect(() => {
    if (currentIndex > testimonials.length - slidesToShow) {
      setCurrentIndex(Math.max(0, testimonials.length - slidesToShow));
    }
  }, [slidesToShow, currentIndex, testimonials.length]);

  if (loading) {
    return (
      <div className="relative w-full overflow-hidden">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-12">Lo que dicen nuestros clientes</h2>
          <div className="text-center">
            <p>Cargando testimonios...</p>
          </div>
        </div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="relative w-full overflow-hidden">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-12">Lo que dicen nuestros clientes</h2>
          <div className="text-center">
            <p className="text-muted-foreground mb-8">
              Pronto tendremos testimonios de nuestros pacientes aquí.
            </p>
            <a
              href="/testimonios"
              className="inline-block bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-all duration-300"
            >
              Deja tu Testimonio
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Lo que dicen nuestros clientes</h2>
        
        <div className="relative">
          {/* Slider container */}
          <div 
            className="transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`
            }}
          >
            <div className="flex">
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="flex-shrink-0 px-4"
                  style={{ width: `${100 / slidesToShow}%` }}
                >
                  <div className="bg-card p-6 rounded-lg shadow-md h-full">
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-xl ${
                            i < testimonial.puntuacion ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.testimonio}"</p>
                    <p className="text-sm text-foreground font-semibold">- {testimonial.nombre}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation arrows */}
          {testimonials.length > slidesToShow && (
            <>
              <Button 
                onClick={goToPrev}
                variant="ghost"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 z-10 rounded-full bg-background/50 backdrop-blur-sm hover:bg-primary/10"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button 
                onClick={goToNext}
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 z-10 rounded-full bg-background/50 backdrop-blur-sm hover:bg-primary/10"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </>
          )}
        </div>
        
        {/* Dots indicator */}
        {testimonials.length > slidesToShow && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.max(1, testimonials.length - slidesToShow + 1) }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Call to action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            ¿Has tenido una experiencia positiva con nuestras terapias?
          </p>
          <a
            href="/testimonios"
            className="inline-block bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-all duration-300"
          >
            Comparte tu Testimonio
          </a>
        </div>
      </div>
    </div>
  );
}

export default TestimonialSlider;