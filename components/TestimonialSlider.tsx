// components/TestimonialSlider.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: string | number;
  nombre: string;
  contenido: string;
  puntuacion?: number;
  calificacion?: number;
  aprobado: boolean;
  visible: boolean;
}

// Componente para testimonio individual con truncado
function TestimonialCard({ 
  testimonial, 
  isExpanded, 
  onToggleExpand 
}: { 
  testimonial: Testimonial;
  isExpanded: boolean;
  onToggleExpand: () => void;
}) {
  const maxLength = 150; // Caracteres máximos antes de truncar

  const shouldTruncate = testimonial.contenido.length > maxLength;
  const displayText = isExpanded 
    ? testimonial.contenido  
    : testimonial.contenido.slice(0, maxLength) + (shouldTruncate ? "..." : "");
  const rating = (testimonial.puntuacion ?? testimonial.calificacion ?? 0);

  return (
    <div className="bg-card bg-gray-100 p-6 rounded-lg shadow-md h-full flex flex-col">
      <div className="flex justify-center mb-4">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-xl ${
              i < rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ⭐
          </span>
        ))}
      </div>
      
      <div className="flex-grow">
        <p className="text-muted-foreground mb-4 italic">"{displayText}"</p>
        
        {shouldTruncate && (
          <button
            onClick={onToggleExpand}
            className="text-primary hover:text-primary/80 text-sm font-medium transition-colors mb-4"
          >
            {isExpanded ? "Leer menos" : "Leer más"}
          </button>
        )}
      </div>
      
      <p className="text-sm text-foreground font-semibold mt-auto">- {testimonial.nombre}</p>
    </div>
  );
}

export function TestimonialSlider() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [loading, setLoading] = useState(true);
  const [expandedTestimonialId, setExpandedTestimonialId] = useState<string | number | null>(null);
  
  const autoPlayRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonios');
      if (response.ok) {
        const data = await response.json() as Testimonial[];
        // Mapear para asegurar que 'puntuacion' exista
        const normalized: Testimonial[] = data.map((t) => ({
          ...t,
          puntuacion: t.puntuacion ?? t.calificacion ?? 0
        }));
        setTestimonials(normalized);
      }
    } catch (error) {
      console.error('Error loading testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar el toggle de expansión
  const handleToggleExpand = (testimonialId: string | number) => {
    if (expandedTestimonialId === testimonialId) {
      // Si ya está expandido, lo cerramos y reactivamos el auto-play
      setExpandedTestimonialId(null);
      setIsAutoPlaying(true);
    } else {
      // Si se expande uno nuevo, detenemos el auto-play
      setExpandedTestimonialId(testimonialId);
      setIsAutoPlaying(false);
      
      // Limpiamos cualquier timeout existente
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    }
  };

  // Función para cerrar todos los testimonios expandidos y reactivar auto-play
  const closeAllExpanded = () => {
    setExpandedTestimonialId(null);
    setIsAutoPlaying(true);
  };

  useEffect(() => {
    // Auto-play functionality
    if (isAutoPlaying && testimonials.length > 0 && expandedTestimonialId === null) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex(prev => 
          prev >= testimonials.length - slidesToShow ? 0 : prev + 1
        );
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, testimonials.length, slidesToShow, expandedTestimonialId]);

  useEffect(() => {
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
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const goToPrev = () => {
    closeAllExpanded(); // Cerrar cualquier testimonio expandido al navegar
    setCurrentIndex(prev => 
      prev === 0 ? Math.max(0, testimonials.length - slidesToShow) : prev - 1
    );
    setIsAutoPlaying(false);
    
    // Reactivar auto-play después de 10 segundos
    setTimeout(() => {
      if (expandedTestimonialId === null) {
        setIsAutoPlaying(true);
      }
    }, 10000);
  };

  const goToNext = () => {
    closeAllExpanded(); // Cerrar cualquier testimonio expandido al navegar
    setCurrentIndex(prev => 
      prev >= testimonials.length - slidesToShow ? 0 : prev + 1
    );
    setIsAutoPlaying(false);
    
    // Reactivar auto-play después de 10 segundos
    setTimeout(() => {
      if (expandedTestimonialId === null) {
        setIsAutoPlaying(true);
      }
    }, 10000);
  };

  const goToSlide = (index: number) => {
    closeAllExpanded(); // Cerrar cualquier testimonio expandido al navegar
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    
    // Reactivar auto-play después de 10 segundos
    setTimeout(() => {
      if (expandedTestimonialId === null) {
        setIsAutoPlaying(true);
      }
    }, 10000);
  };

  // Adjust currentIndex if it's out of bounds when slidesToShow changes
  useEffect(() => {
    if (currentIndex > testimonials.length - slidesToShow) {
      setCurrentIndex(Math.max(0, testimonials.length - slidesToShow));
    }
  }, [slidesToShow, currentIndex, testimonials.length]);

  // Efecto para cerrar testimonio expandido si sale de la vista
  useEffect(() => {
    if (expandedTestimonialId) {
      const isVisible = testimonials
        .slice(currentIndex, currentIndex + slidesToShow)
        .some(testimonial => testimonial.id === expandedTestimonialId);
      
      if (!isVisible) {
        setExpandedTestimonialId(null);
        setIsAutoPlaying(true);
      }
    }
  }, [currentIndex, expandedTestimonialId, testimonials, slidesToShow]);

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
                  <TestimonialCard 
                    testimonial={testimonial}
                    isExpanded={expandedTestimonialId === testimonial.id}
                    onToggleExpand={() => handleToggleExpand(testimonial.id)}
                  />
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

        {/* Indicador de auto-play pausado */}
        {!isAutoPlaying && expandedTestimonialId && (
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              Auto-pausado - Leyendo testimonio
            </p>
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