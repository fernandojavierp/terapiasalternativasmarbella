// src/app/page.js
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Brain, Sparkles, HeartPulse, Mail, Phone, MapPin, MessageCircle, X, Send} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import emailjs from '@emailjs/browser';
import TestimonialSlider from "@/components/TestimonialSlider";
import { GallerySlider } from "@/components/GallerySlider";

export default function Home() {
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Toggle de WhatsApp
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWhatsApp(true);
    }, 10000); // Mostrar después de 10 segundos
    return () => clearTimeout(timer);
  }, []);

  // Inicializar EmailJS
  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '');
  }, []);

  const images = [
    {
      src: "/ines-con-paciente.webp",
      alt: "Coaching con Ines Uria"
    },
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
      src: "/taller-empoderamiento.webp",
      alt: "Taller de Empoderamiento"
    },
    {
      src: "/kinesiologia-3.webp",
      alt: "Kinesiología"
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
    {
      src: "/grupo-terapias-alternativas-marbella-con-caballo.webp",
      alt: "Grupo Terapias Alternativas Marbella con Caballo"
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }
      );

      if (response.status === 200) {
        setSubmitStatus({
          success: true,
          message: "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto."
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "Hubo un error al enviar el mensaje. Por favor, intenta nuevamente."
      });
      console.error('Error sending email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-background w-full min-h-screen">
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

      <div className="container mx-auto sm:px-6 text-center">
        {/* Hero Section */}
        <section className="bg-background py-0">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-center">
            <div className="text-center ml-4 lg:text-left space-y-6 lg:mb-28 lg:mr-12">
              <h1 className="font-playfair mt-10  text-5xl sm:text-6xl lg:text-7xl font-bold  leading-tight">
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
                Soy Ines Uria, con más de 30 años como terapeuta he ayudado a personas como tú a alcanzar su bienestar emocional y físico.
              </p>
              <Button asChild size="lg">
                <Link href="#servicios">Comenzar tu viaje</Link>
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
      </div>

      {/* Services Section */}
      <section className="w-full bg-muted/50" id="servicios">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-12">Nuestras terapias</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="text-xl text-center font-bold mb-4">Anatheóresis</h3>
              <p className="text-muted-foreground text-center mb-4">
                Terapia que te ayuda a descubrir y sanar heridas emocionales del pasado.
              </p>
              <div className="flex justify-center">
                <Button asChild variant="outline">
                  <Link href="/servicios/anatheoresis">Conocer más</Link>
                </Button>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="text-xl text-center font-bold mb-4">Kinesiología Holística</h3>
              <p className="text-muted-foreground text-center mb-4">
                Terapia que integra el cuerpo y la mente para lograr un equilibrio completo.
              </p>
              <div className="flex justify-center">
                <Button asChild variant="outline">
                  <Link href="/servicios/kinesiologia">Conocer más</Link>
                </Button>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="text-xl text-center font-bold mb-4">Coaching</h3>
              <p className="text-muted-foreground text-center mb-4">
                Acompañamiento personalizado para alcanzar tus metas y desarrollo personal.
              </p>
              <div className="flex justify-center">
                <Button asChild variant="outline">
                  <Link href="/servicios/coaching">Conocer más</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full bg-background">
        <div className="container mx-auto px-4 py-16">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-6 text-center">
              <div className="flex justify-center mb-4">
                <Brain className="w-12 h-12 text-primary" />
              </div>
              <p className="text-muted-foreground">
                Ayudamos a gestionar tus emociones para alcanzar un estado de armonía interior.
              </p>
            </div>

            <div className="bg-card p-6 text-center">
              <div className="flex justify-center mb-4">
                <HeartPulse className="w-12 h-12 text-primary" />
              </div>
              <p className="text-muted-foreground">
                Mejora tu salud física a través de técnicas holísticas y naturales.
              </p>
            </div>

            <div className="bg-card p-6 text-center">
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

      {/* Testimonials Section */}
      <TestimonialSlider />

      {/* Gallery Section */}
      <GallerySlider 
        images={images} 
        onImageClick={setSelectedImage}
        autoPlay={true}
        autoPlayInterval={4000}
      />

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative max-w-5xl w-full">
            <Image
              src={selectedImage}
              alt="Imagen ampliada"
              className="w-full h-auto rounded-lg"
              width={1200}
              height={800}
              priority
            />
          </div>
        </div>
      )}

      <div className="container mx-auto sm:px-6 text-center">
        {/* Philosophy Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-8">Nuestra filosofía</h2>
            <div className="max-w-2xl mx-auto">
              <p className="text-lg text-muted-foreground">
                En Terapias Alternativas Marbella, creemos en un enfoque holístico que integra mente, cuerpo y espíritu.
                A través de la liberacion emocional y mental, comienza el cambio en tu cuerpo y en tu vida.
                Ofrecemos una variedad de servicios para ayudarte a encontrar el estado de paz que buscas.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Blog Section */}
      <section className="w-full bg-muted/50">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold mb-8 text-center">Artículos destacados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Artículo 1 */}
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">5 Beneficios de la meditación</h3>
              <p className="text-muted-foreground mb-4">
                Descubre cómo la meditación puede mejorar tu bienestar emocional y físico.
              </p>
              <Button asChild size="sm">
                <Link href="/blog/5-beneficios-de-la-meditacion" className="text-primary-foreground">
                  Leer más
                </Link>
              </Button>
            </div>

            {/* Artículo 2 */}
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Cómo manejar el estrés</h3>
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
              <h3 className="text-xl font-bold mb-4">La importancia del autocuidado</h3>
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

      <div className="container mx-auto sm:px-6 text-center">
        {/* About Section */}
        <section id="sobre-nosotros" className="py-12 bg-background">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-10 text-center">Sobre nosotros</h2>
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
      </div>

      {/* Contact Section */}
      <section className="w-full bg-muted/50">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-8">Contacto</h2>
          <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
            ¿Tienes alguna pregunta o deseas programar una cita? ¡Contáctanos! Estamos aquí para ayudarte en tu camino hacia el bienestar.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Información de Contacto */}
            <div className="space-y-8">
              <div className="bg-card p-6 rounded-lg shadow-md">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Email</h3>
                    <a
                      href="mailto:ines.tpmarbella@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      ines.tpmarbella@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-md">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Teléfono</h3>
                    <a
                      href="https://wa.me/34628595929"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +34 628-59-59-29
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-md">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Ubicación</h3>
                    <p className="text-muted-foreground">
              Dirección: <a
                href="https://www.google.es/maps/place/C.+Ramiro+Campos+Turmo,+4,+29602+Marbella,+M%C3%A1laga/@36.5091598,-4.8883642,17z/data=!3m1!4b1!4m6!3m5!1s0xd7327f8acaaaefb:0x87e4a077a7973c3e!8m2!3d36.5091598!4d-4.8883642!16s%2Fg%2F11c2dz7l_1?entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D"
                className="text-primary hover:underline transition-colors"
                target="_blank"
                rel="noopener noreferrer" 
              >Calle Ramiro Campos Turmo, local 4, Marbella</a>
            </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario de Contacto */}
            <div className="bg-card p-6 rounded-lg shadow-md">
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitStatus && (
                  <div className={`p-4 rounded-md ${
                    submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {submitStatus.message}
                  </div>
                )}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}