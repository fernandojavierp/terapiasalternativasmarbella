"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, Sparkles, Target, Heart, Activity, Smile, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Coaching() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    {
      src: "/coaching-grupal.webp",
      alt: "Coaching Grupal"
    },
    {
      src: "/coaching-creativo-ines-uria.webp",
      alt: "Coaching Creativo"
    },
    {
      src: "/coaching-caballos-2.webp",
      alt: "Coaching con Caballos"
    },
    {
      src: "/coaching-caballos.webp",
      alt: "Coaching con Caballos"
    },
    {
      src: "/coaching-con-caballos.webp",
      alt: "Taller de Coaching con Caballos"
    },
    {
      src: "/grupo-terapias-alternativas-marbella-con-caballo.webp",
      alt: "Grupo Terapias Alternativas Marbella con Caballo"
    },
    {
      src: "/paciente-con-caballo.webp",
      alt: "Paciente con Caballo"
    },
    {
      src: "/paciente-con-caballo-1.webp",
      alt: "Paciente con Caballo"
    },
    {
      src: "/paciente-con-caballo-2.webp",
      alt: "Paciente con Caballo"
    },
    {
      src: "/paciente-con-caballo-3.webp",
      alt: "Paciente con Caballo"
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Título y Descripción */}
      <section className="w-full bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-8">Coaching Personal y Profesional</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre tu potencial y alcanza tus objetivos con un acompañamiento personalizado.
            </p>
          </div>
        </div>
      </section>

      {/* Imagen y Descripción Detallada */}
      <section className="w-full bg-muted/50">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/coaching-caballos.webp"
                alt="Coaching Personal y Profesional"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">¿Qué es el Coaching?</h2>
              <p className="text-lg mb-6">
                El Coaching es un proceso de acompañamiento personalizado que te ayuda a identificar tus objetivos,
                superar obstáculos y desarrollar todo tu potencial. A través de técnicas y herramientas específicas,
                trabajamos juntos para alcanzar tus metas tanto en el ámbito personal como profesional.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Como coach, te guío en un viaje de autodescubrimiento y crecimiento, ayudándote a encontrar las
                respuestas que ya están dentro de ti y a desarrollar las habilidades necesarias para alcanzar el
                éxito que deseas.
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/contacto">
                  Agendar Sesión
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Coaching */}
      <section className="w-full bg-background">
        <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-8 text-center">Tipos de coaching</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Coaching Grupal */}
            <div className="bg-card p-6 text-center">
              <div className="flex justify-center mb-4">
                <Users className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Coaching grupal</h3>
              <p className="text-muted-foreground">
                Sesiones en grupo para fomentar el trabajo en equipo, la comunicación y el liderazgo.
              </p>
            </div>

            {/* Coaching Creativo */}
            <div className="bg-card p-6 text-center">
              <div className="flex justify-center mb-4">
                <Sparkles className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Coaching creativo</h3>
              <p className="text-muted-foreground">
                Estimula tu creatividad e innovación para encontrar soluciones únicas a tus desafíos.
              </p>
            </div>

            {/* PNL (Programación Neurolingüística) */}
            <div className="bg-card p-6 text-center">
              <div className="flex justify-center mb-4">
                <Target className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">PNL</h3>
              <p className="text-muted-foreground">
                Técnicas de Programación Neurolingüística para reprogramar patrones mentales y alcanzar tus objetivos.
              </p>
            </div>

            {/* Coaching con Caballos */}
            <div className="bg-card p-6 text-center">
              <div className="flex justify-center mb-4">
                <Activity className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Coaching con caballos</h3>
              <p className="text-muted-foreground">
                Usa la conexión con caballos para desarrollar habilidades de liderazgo y autoconocimiento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios del Coaching */}
      <section className="w-full bg-muted/50">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold mb-8 text-center">Beneficios del coaching</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Beneficio 1 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Heart className="w-12 h-12 text-primary" />
              </div>
              <p className="text-muted-foreground">
                Descubre tus fortalezas, debilidades y áreas de mejora para alcanzar tu máximo potencial.
              </p>
            </div>

            {/* Beneficio 2 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Target className="w-12 h-12 text-primary" />
              </div>
              <p className="text-muted-foreground">
                Define metas claras y alcanzables con un plan de acción personalizado.
              </p>
            </div>

            {/* Beneficio 3 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Smile className="w-12 h-12 text-primary" />
              </div>
              <p className="text-muted-foreground">
                Gestiona tus emociones y reduce el estrés para vivir una vida más equilibrada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Talleres de Coaching con Caballos */}
      <section className="w-full bg-background">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold mb-8 text-center">Talleres de coaching con caballos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Descripción General */}
            <div className="bg-card p-6">
              <h3 className="text-xl font-bold mb-4">Un viaje de autoconocimiento y transformación</h3>
              <p className="text-muted-foreground mb-4">
                En nuestros talleres de coaching con caballos, vivirás una experiencia transformadora donde el coaching y la sensibilidad de los caballos te ayudarán a descubrir y superar bloqueos emocionales. No necesitas experiencia previa.
              </p>
              <p className="text-muted-foreground mb-4">
                Los caballos reflejan nuestras emociones sin juicio, ayudándonos a tomar conciencia de lo que sentimos y a desarrollar una conexión más auténtica con nosotros mismos.
              </p>
              <p className="text-muted-foreground mb-4">
                Estos talleres están dirigidos a quienes buscan crecimiento personal, mejorar su comunicación y gestionar emociones como el estrés, la ansiedad o el miedo. Ideal para quienes se sienten estancados o buscan nuevas formas de desarrollo personal.
              </p>
            </div>

            {/* Beneficios */}
            <div className="bg-card p-6">
              <h3 className="text-xl font-bold mb-4">¿Qué puedes llevarte tras un taller?</h3>
              <ul className="text-muted-foreground list-disc list-inside">
                <li>Mayor claridad emocional y autoconfianza.</li>
                <li>Herramientas para gestionar el estrés.</li>
                <li>Una conexión más profunda contigo mismo y con los demás.</li>
                <li>Una experiencia única y enriquecedora.</li>
              </ul>
              <h3 className="text-xl font-bold mt-6 mb-4">¿Por qué elegirnos?</h3>
              <ul className="text-muted-foreground list-disc list-inside">
                <li>Enfoque integral que combina coaching, PNL y otras terapias.</li>
                <li>Profesionales experimentados.</li>
                <li>Caballos acostumbrados a trabajar en terapia.</li>
                <li>Entorno natural que potencia tu transformación.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Talleres */}
      <section className="w-full bg-muted/50">
        <div className="container mx-auto px-4 py-16">
          <h3 className="text-4xl font-bold mb-6 text-center">Tipos de talleres disponibles</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Taller de Comunicación Auténtica */}
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-bold mb-2">Taller de comunicación auténtica</h4>
              <p className="text-muted-foreground mb-4">
                Mejora la expresión y comprensión emocional para establecer relaciones más sinceras y efectivas.
              </p>
              <ul className="text-muted-foreground list-disc list-inside">
                <li>Desarrollo de habilidades de comunicación asertiva.</li>
                <li>Aprendizaje de escucha activa y empatía.</li>
                <li>Identificación y gestión de barreras emocionales.</li>
              </ul>
            </div>

            {/* Taller para Aumentar la Autoestima */}
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-bold mb-2">Taller para aumentar la autoestima</h4>
              <p className="text-muted-foreground mb-4">
                Fortalece la confianza en ti mismo y fomenta una autoimagen positiva.
              </p>
              <ul className="text-muted-foreground list-disc list-inside">
                <li>Mayor seguridad personal y autoconocimiento.</li>
                <li>Liberación de creencias limitantes.</li>
                <li>Reforzamiento de la autoaceptación y motivación.</li>
              </ul>
            </div>

            {/* Taller de Liderazgo y Trabajo en Equipo */}
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-bold mb-2">Taller de liderazgo y trabajo en equipo</h4>
              <p className="text-muted-foreground mb-4">
                Desarrolla habilidades de liderazgo y fomenta la colaboración efectiva.
              </p>
              <ul className="text-muted-foreground list-disc list-inside">
                <li>Mejora en la toma de decisiones y resolución de conflictos.</li>
                <li>Potenciación de la confianza y el trabajo en equipo.</li>
                <li>Aumento de la capacidad de liderazgo desde la empatía.</li>
              </ul>
            </div>

            {/* Taller para Mujeres */}
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-bold mb-2">Taller para mujeres</h4>
              <p className="text-muted-foreground mb-4">
                Empodera a la mujer a través del autoconocimiento y el desarrollo emocional.
              </p>
              <ul className="text-muted-foreground list-disc list-inside">
                <li>Refuerzo de la autoestima y seguridad personal.</li>
                <li>Desarrollo del autocuidado emocional y físico.</li>
                <li>Mayor claridad en la toma de decisiones.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Galería de Imágenes */}
      <section className="w-full bg-background">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold mb-8 text-center">Galería</h2>
          <div className="relative max-w-4xl mx-auto">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
              <div className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {images.map((image, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={1200}
                      height={675}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Botones de navegación */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
            {/* Indicadores de diapositiva */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-white w-4' : 'bg-white/50'
                  }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Llamada a la Acción */}
      <section className="w-full bg-muted/50">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl font-bold mb-6">¿Listo para transformar tu vida?</h2>
          <p className="text-lg mb-8">
            Agenda una sesión de coaching o únete a nuestros talleres de coaching con caballos para vivir una experiencia única de autoconocimiento y crecimiento.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300">
            <Link href="/contacto">
              Agendar Sesión o Taller
            </Link>
          </Button>
        </div>
      </section>

      {/* Botón para Volver al Inicio */}
      <section className="w-full bg-background">
        <div className="container mx-auto px-4 py-8 text-center">
          <Button asChild variant="outline">
            <Link href="/" className="text-foreground">
              Volver al Inicio
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}