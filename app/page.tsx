// src/app/page.js
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Brain, Sparkles, HeartPulse, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  // Configuración del Slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768, // Pantallas pequeñas
        settings: {
          arrows: false, // Ocultar flechas en móviles
        },
      },
    ],
  };

  // Toggle de WhatsApp
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWhatsApp(true);
    }, 10000); // Mostrar después de 10 segundos
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-background min-h-screen flex flex-col justify-center items-center">
      {/* Toggle de WhatsApp */}
      {showWhatsApp && (
        <div className="fixed bottom-6 right-6 z-50">
          <a
            href="https://wa.me/34628595929"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-colors"
          >
            <MessageCircle className="w-8 h-8" />
          </a>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 text-center">
        {/* Hero Section */}
        <section className="bg-gray-50 rounded-lg shadow-md py-0">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-center">
            <div className="text-center ml-4 lg:text-left space-y-6 lg:mb-28 lg:mr-12">
              <h1 className="font-playfair mt-10  text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                Terapias
                <br />
                Alternativas
                <br />
                Marbella
              </h1>
              <h2 className="text-xl text-muted-foreground">
                Coach, Inteligencia Emocional, Kinesiología Holística
              </h2>
              <p className="text-lg text-muted-foreground max-w-lg">
                Soy Ines Uria, con más de 30 años de experiencia ayudando a personas como tú a alcanzar su bienestar emocional y físico.
              </p>
              <Button asChild size="lg">
                <Link href="#servicios">Comenzar Tu Viaje</Link>
              </Button>
            </div>
            <div className="mt-10 lg:mt-0">
              <Image
                src="/ines-uria-foto.png"
                alt="Ines Uria - Terapias Alternativas Marbella"
                width={600}
                height={600}
                quality={100}
                className="rounded-lg"
                priority
              />
            </div>
          </div>
        </section>

        {/* Sección "Nuestras Terapias" */}
        <section className="py-12" id="servicios">
          <h2 className="text-3xl font-bold text-foreground mb-8">Nuestras terapias</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Terapia 1: Anatheóresis */}
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-foreground mb-4">Anatheóresis</h3>
              <p className="text-muted-foreground mb-4">
                Terapia que te ayuda a descubrir y sanar heridas emocionales del pasado.
              </p>
              <Button asChild size="sm">
                <Link href="/servicios/anatheoresis" className="text-primary-foreground">
                  Conocer más
                </Link>
              </Button>
            </div>

            {/* Terapia 2: Kinesiología */}
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-foreground mb-4">Kinesiología Holística</h3>
              <p className="text-muted-foreground mb-4">
                Terapia que integra el cuerpo y la mente para lograr un equilibrio completo.
              </p>
              <Button asChild size="sm">
                <Link href="/servicios/kinesiologia" className="text-primary-foreground">
                  Conocer más
                </Link>
              </Button>
            </div>

            {/* Terapia 3: Coaching */}
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-foreground mb-4">Coaching</h3>
              <p className="text-muted-foreground mb-4">
                Acompañamiento personalizado para alcanzar tus metas y desarrollo personal.
              </p>
              <Button asChild size="sm">
                <Link href="/servicios/coaching" className="text-primary-foreground">
                  Conocer más
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Sección "Beneficios" */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">Beneficios de nuestras terapias</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Beneficio 1 */}
              <div className="bg-card p-6 rounded-lg shadow-md">
                <div className="flex justify-center mb-4">
                  <Brain className="w-12 h-12 text-primary" />
                </div>
                
                <p className="text-muted-foreground">
                  Ayudamos a gestionar tus emociones para alcanzar un estado de armonía interior.
                </p>
              </div>

              {/* Beneficio 2 */}
              <div className="bg-card p-6 rounded-lg shadow-md">
                <div className="flex justify-center mb-4">
                  <HeartPulse className="w-12 h-12 text-primary" />
                </div>
                
                <p className="text-muted-foreground">
                  Mejora tu salud física a través de técnicas holísticas y naturales.
                </p>
              </div>

              {/* Beneficio 3 */}
              <div className="bg-card p-6 rounded-lg shadow-md">
                <div className="flex justify-center mb-4">
                  <Sparkles className="w-12 h-12 text-primary" />
                </div>
                
                <p className="text-muted-foreground">
                  Descubre tu potencial y alcanza tus metas con nuestro acompañamiento.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección "Testimonios" */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">Lo que dicen nuestros clientes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Testimonio 1 */}
              <div className="bg-card p-6 rounded-lg shadow-md">
                <p className="text-muted-foreground mb-4">
                  "Gracias a las terapias, he encontrado un equilibrio en mi vida que nunca pensé posible."
                </p>
                <p className="text-sm text-foreground font-semibold">- María G.</p>
              </div>

              {/* Testimonio 2 */}
              <div className="bg-card p-6 rounded-lg shadow-md">
                <p className="text-muted-foreground mb-4">
                  "El coaching me ayudó a clarificar mis metas y a tomar decisiones con confianza."
                </p>
                <p className="text-sm text-foreground font-semibold">- Juan P.</p>
              </div>

              {/* Testimonio 3 */}
              <div className="bg-card p-6 rounded-lg shadow-md">
                <p className="text-muted-foreground mb-4">
                  "La kinesiología holística ha sido una experiencia transformadora para mí."
                </p>
                <p className="text-sm text-foreground font-semibold">- Ana L.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección "Nuestro Enfoque" */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">Nuestro enfoque</h2>
            <div className="max-w-2xl mx-auto">
              <p className="text-lg text-muted-foreground">
                En Terapias Alternativas Marbella, creemos en un enfoque holístico que integra mente, cuerpo y espíritu.
                Nuestras terapias están diseñadas para ayudarte a encontrar equilibrio, sanar heridas emocionales y
                alcanzar tu máximo potencial.
              </p>
            </div>
          </div>
        </section>

        {/* Sección "Galería" */}
        <section className="py-12 bg-background">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Galería</h2>
          <div className="max-w-3xl mx-auto">
            <Slider {...settings}>
              {/* Imagen 1 */}
              <div className="px-2">
                <Image
                  src="/kinesiologia.webp"
                  alt="Terapia de kinesiología holística"
                  className="w-full h-auto md:h-auto object-cover rounded-lg"
                  width={500}
                  height={500}
                />
              </div>

              {/* Imagen 2 */}
              <div className="px-2">
                <Image
                  src="/kinesiologia-3.webp"
                  alt="Sesión de kinesiología holística"
                  className="w-full h-auto md:h-auto object-cover rounded-lg"
                  width={500} 
                  height={500}
                />
              </div>

              {/* Imagen 3 */}
              <div className="px-2">
                <Image
                  src="/coaching-caballos.webp"
                  alt="Coaching Grupal Con Caballos"
                  className="w-full h-auto md:h-auto object-cover rounded-lg"
                  width={500}
                  height={500}
                />
              </div>

              {/* Imagen 4 */}
              <div className="px-2">
                <Image
                  src="/coaching-caballos-3.webp"
                  alt="Coaching Grupal Con Caballos"
                  className="w-full h-auto md:h-auto object-cover rounded-lg"
                  width={500}
                  height={500}
                />
              </div>
              {/* Imagen 5 */}
              <div className="px-2">
                <Image
                  src="/coaching-grupal.webp"
                  alt="Coaching Grupal"
                  className="w-full h-auto md:h-auto object-cover rounded-lg"
                  width={500}
                  height={500}
                />
              </div>
              {/* Imagen 6 */}
              <div className="px-2">
                <Image
                  src="/taller-empoderamiento.webp"
                  alt="Coaching Grupal"
                  className="w-full h-auto md:h-auto object-cover rounded-lg"
                  width={500}
                  height={500}
                />
              </div>
              {/* Imagen 7 */}
              <div className="px-2">
                <Image
                  src="/terapeuta-en-costa-del-sol.webp"
                  alt="Coaching Grupal"
                  className="w-full h-auto md:h-auto object-cover rounded-lg"
                  width={500}
                  height={500}
                />
              </div>
              {/* Imagen 8 */}
              <div className="px-2">
                <Image
                  src="/ines-con-paciente.webp"
                  alt="Coaching Grupal"
                  className="w-full h-auto md:h-auto object-cover rounded-lg"
                  width={500}
                  height={500}
                />
              </div>
            </Slider>
          </div>
        </section>

        {/* Sección "Blog" */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Artículos destacados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Artículo 1 */}
              <div className="bg-card p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-foreground mb-4">5 Beneficios de la meditación</h3>
                <p className="text-muted-foreground mb-4">
                  Descubre cómo la meditación puede mejorar tu bienestar emocional y físico.
                </p>
                <Button asChild size="sm">
                  <Link href="blog/5-beneficios-de-la-meditacion" className="text-primary-foreground">
                    Leer más
                  </Link>
                </Button>
              </div>

              {/* Artículo 2 */}
              <div className="bg-card p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-foreground mb-4">Cómo manejar el estrés</h3>
                <p className="text-muted-foreground mb-4">
                  Aprende técnicas efectivas para reducir el estrés en tu vida diaria.
                </p>
                <Button asChild size="sm">
                  <Link href="/blog/como-manejar-el-estres" className="text-primary-foreground">
                    Leer más
                  </Link>
                </Button>
              </div>

              {/* Artículo 3 */}
              <div className="bg-card p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-foreground mb-4">La importancia del autocuidado</h3>
                <p className="text-muted-foreground mb-4">
                  Descubre por qué el autocuidado es esencial para tu bienestar integral.
                </p>
                <Button asChild size="sm">
                  <Link href="/blog/la-importancia-del-autocuidado" className="text-primary-foreground">
                    Leer más
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Sección "Sobre Mí" */}
        <section id="sobre-nosotros" className="py-12 bg-background">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-foreground mb-10 text-center">Sobre nosotros</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-muted-foreground mb-4">
                  En Terapias Alternativas Marbella, nos dedicamos a ayudar a las personas a encontrar
                  equilibrio y bienestar a través de terapias holísticas y personalizadas.
                </p>
                <p className="text-lg text-muted-foreground">
                  Con más de 30 años de experiencia, nuestra misión es guiarte en tu viaje hacia una vida
                  más plena y saludable.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden">
                <Image
                  src="/sobre-nosotros.webp"
                  alt="Sobre Nosotros"
                  className="w-full h-64 object-cover"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sección "Contacto" */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Contacto</h2>
            <p className="text-lg text-muted-foreground mb-12 text-center">
              ¿Tienes alguna pregunta o deseas programar una cita? ¡Contáctanos!
            </p>

            {/* Datos de contacto con íconos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Email */}
              <div className="bg-card p-6 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-4">
                  <Mail className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Email</h3>
                <p className="text-muted-foreground">
                  <a
                    href="mailto:ines.tpmarbella@gmail.com"
                    className="text-primary hover:underline"
                  >
                    ines.tpmarbella@gmail.com
                  </a>
                </p>
              </div>

              {/* Teléfono */}
              <div className="bg-card p-6 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-4">
                  <Phone className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Teléfono</h3>
                <p className="text-muted-foreground">
                  <a
                    href="https://wa.me/34628595929"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +34 628-59-59-29
                  </a>
                </p>
              </div>

              {/* Dirección */}
              <div className="bg-card p-6 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-4">
                  <MapPin className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Dirección</h3>
                <p className="text-muted-foreground">Marbella, España</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}