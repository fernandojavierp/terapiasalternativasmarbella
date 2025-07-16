// components/TestimonialSlider.tsx
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  content: string;
  author: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    content: "Siempre me ha interesado el mundo de las terapias alternativas, pero me costaba mucho encontrar a la persona o lugar adecuado. Hoy doy las gracias de tener a Inés en mi vida, es a la persona en quién más confío para entregarme a lo que venga. Se sale de su consulta flotando, llena de energía y diferentes perspectivas. Ya se lo recomendé a vari@s amig@s y familiares, por lo que lo recomiendo igual a cualquiera que tenga algo de curiosidad, merece muchísimo probar con ella, además que cada sesión es toda una experiencia en si misma. Muchísimas gracias por todo, una gozada siempre ponerme en tus manos🙏🏼🧡",
    author: "Yolanda VD."
  },
  {
    id: 2,
    content: "Me siento, flotando como en una nube .. la sensación de que todo está bien y todo va a ir bien .. es un despertar y una sensación increíble e indescriptible al 100x100 pero es como si toda preocupación o desestabilización volviera a ponerse todo en donde tiene que estar , sin ninguna duda terapias alternativas es la mejor opción ante cualquier malestar emocional o físico . Sin olvidarnos de que Inés es increíble en todos los aspectos con ella te sientes en paz y en las mejores manos . La quiero tener siempre en mi vida y todas sus terapias♥",
    author: "Victoria Jaramillo Gutiérrez"
  },
  {
    id: 3,
    content: "Tuve la suerte de conocer a Inés gracias a una amiga. Recuerdo perfectamente la sensación de paz y relajación desde la primera sesión: con solo su presencia, su tacto y su voz, logra llevarte a un estado de calma profunda. Ahora vivo fuera de España y, en un momento de bajón, me atendió online… y aunque no fue presencial, noté una mejora tanto física como emocional. Incluso le regalé una sesión a mi madre, que es bastante escéptica con las terapias naturales, y salió feliz y completamente relajada. Súper encantada contigo, Inés. ¡Qué ganas de volver a España para tener otra consulta presencial contigo! 🙏💫",
    author: "Clarice"
  },
  {
    id: 4,
    content: "Después de cada sesión con Inés he sentido un cambio espectacular sobretodo en mi forma de sobrellevar las cosas, con más fluidez y comprensión. La última especialmente me desbloqueo a nivel tan profundo que hasta mi psicóloga me dio la enhorabuena por el cambio, sintiendo ella no haber podido ayudarme hasta ese nivel tan profundo. Estoy muy agradecida a Inés por su ayuda y sobretodo porque es una persona muy cariñosa y atenta , gracias 😘",
    author: "Inma Sánchez"
  },
  {
    id: 5,
    content: "Hola, quería compartirte que Inés es una terapeuta excelente. Me ha ayudado muchísimo, especialmente con el sueño y la intolerancia. Trabaja con mucho cariño y dedicación, y algo que valoro mucho es que no está pendiente del reloj: si necesita estar un poco más contigo, lo hace sin problema. La recomiendo al 100%, ha sido un verdadero apoyo para mí, gracias Inés.",
    author: "Loli Reyes"
  },
  {
    id: 6,
    content: "Todas las terapias con Inés ,super bien ,me ha ayudado a encontrarme bastante mejor tanto anímicamente como fisica ,si lo recomendaría te ayuda bastante a superar barreras que tienes y no conocías !!!",
    author: "María del Carmen Morales Rodríguez"
  },
  {
    id: 7,
    content: "Sentí en la sesión confianza para dejar fluir. La paz surgía de mi interior. La sensación me continuo por varios días. Una labor hermosa y encomiable la que realiza la Sra Inés Uría. Gracias. Volvería a repetir. Por si dedicación y buen hacer.",
    author: "Raúl Fernández Rodríguez"
  },
  {
    id: 8,
    content: "Buenos días!!! Aquí va mi opinión: Quiero dar gracias a la vida por poner a Inés en mi camino, es una excelente profesional capaz de captar tus nesidades y aplicar la terapia que mejor te va a cada momento y siempre con resultados maravillosos. Muchas gracias!!! 🙏🙏🙏",
    author: "Claudia Ferrari"
  },
  {
    id: 9,
    content: "Mi experiencia con Ines fue encantadora, la recomiendo sin duda. Una persona agradable, donde te hace poder sanar todo tu interior y llegar a conseguir la paz y sanacion, propusimos varios objetivos y todos tuvieron buenos resultados, me encantó compartir con ella y pronto volveré 💕",
    author: "Lydia"
  },
  {
    id: 10,
    content: "Conocí a Inés de casualidad por Instagram, desde el día que la conocí fue como si nos conociésemos de toda la vida. Es una maravillosa persona y profesional, después de mi Terapia con ella, la cuál me trató durante toda una mañana, salí del centro relajada, como en una nube, como si me quitasen un gran peso de encima.La terapia me vino genial para saber gestionar y soltar cosas. Además de unos consejos que me han venido super bien y que practico semanalmente. Agradecida de conocerte y de tenerte en mi vida Inés 💖",
    author: "Sandra Maderal"
  },
  {
    id: 11,
    content: "Tuve la suerte de estar en Terapias con Ines. Es espectacular como profesional y qué decir como persona!!!!!! Su presencia, su voz.....te relajan tanto....que te transporta a otro lugar! Se lo recomiendo a todos y todas. Muchas gracias por todo Ines.",
    author: "Miriam Beldarrain Uria"
  },
  {
    id: 12,
    content: "Te agradezco muchísimo Ines por esa terapia!! Me siento liberada, me siento que me quitaste un saco de piedras.  Todo camino de Marbella asta la cala me llore de liberación que sentía. Mil gracias por todo lo que me hisiste ! Te admiro 😘❤",
    author: "Inga"
  },
];

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    // Auto-play functionality
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
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
  }, [isAutoPlaying, currentIndex]);

  const goToPrev = () => {
    setCurrentIndex(prev => 
      prev === 0 ? testimonials.length - slidesToShow : prev - 1
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
  }, [slidesToShow, currentIndex]);

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
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                    <p className="text-sm text-foreground font-semibold">- {testimonial.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation arrows */}
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
        </div>
        
        {/* Dots indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: testimonials.length - slidesToShow + 1 }).map((_, index) => (
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
      </div>
    </div>
  );
}