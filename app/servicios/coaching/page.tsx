"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, Sparkles, Target, Heart, Activity, Smile } from "lucide-react"; // Íconos para las secciones
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Definición de tipos para las props de las flechas
interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function Coaching() {
  
   // Configuración del Slider con estilos personalizados para las flechas
   const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  // Componente para la flecha siguiente personalizada
  function SampleNextArrow(props: ArrowProps) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, 
          display: "block", 
          color: "black", 
          fontSize: "24px",
          top: "40%",
          right: "25px",
          zIndex: 1
        }}
        onClick={onClick}
      />
    );
  }
    // Componente para la flecha anterior personalizada
    function SamplePrevArrow(props: ArrowProps) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ ...style, 
            display: "block", 
            color: "black", 
            fontSize: "24px",
            top: "40%",
            left: "25px",
            zIndex: 1
          }}
          onClick={onClick}
        />
      );
    }
  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container mx-auto px-6">
        {/* Título y Descripción */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-8">Coaching</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre cómo el coaching puede ayudarte a alcanzar tus metas, superar obstáculos y transformar tu vida.
          </p>
        </div>

        {/* Tipos de Coaching */}
        <section className="py-12">
          <h2 className="text-4xl font-bold text-foreground mb-8 text-center">Tipos de coaching</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Coaching Grupal */}
            <div className="bg-card p-6 text-center">
              <div className="flex justify-center mb-4">
                <Users className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Coaching grupal</h3>
              <p className="text-muted-foreground">
                Sesiones en grupo para fomentar el trabajo en equipo, la comunicación y el liderazgo.
              </p>
            </div>

            {/* Coaching Creativo */}
            <div className="bg-card p-6 text-center">
              <div className="flex justify-center mb-4">
                <Sparkles className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Coaching creativo</h3>
              <p className="text-muted-foreground">
                Estimula tu creatividad e innovación para encontrar soluciones únicas a tus desafíos.
              </p>
            </div>

            {/* PNL (Programación Neurolingüística) */}
            <div className="bg-card p-6 text-center">
              <div className="flex justify-center mb-4">
                <Target className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">PNL</h3>
              <p className="text-muted-foreground">
                Técnicas de Programación Neurolingüística para reprogramar patrones mentales y alcanzar tus objetivos.
              </p>
            </div>

            {/* Coaching con Caballos */}
            <div className="bg-card p-6 text-center">
              <div className="flex justify-center mb-4">
                <Activity className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Coaching con caballos</h3>
              <p className="text-muted-foreground">
                Usa la conexión con caballos para desarrollar habilidades de liderazgo y autoconocimiento.
              </p>
            </div>
          </div>
        </section>

        {/* Beneficios del Coaching */}
        <section className="py-12 bg-card">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-foreground mb-8 text-center">Beneficios del coaching</h2>
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
        <section className="py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-foreground mb-8 text-center">Talleres de coaching con caballos</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {/* Descripción General */}
              <div className="bg-card p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Un viaje de autoconocimiento y transformación</h3>
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
                <h3 className="text-xl font-bold text-foreground mb-4">¿Qué puedes llevarte tras un taller?</h3>
                <ul className="text-muted-foreground list-disc list-inside">
                  <li>Mayor claridad emocional y autoconfianza.</li>
                  <li>Herramientas para gestionar el estrés.</li>
                  <li>Una conexión más profunda contigo mismo y con los demás.</li>
                  <li>Una experiencia única y enriquecedora.</li>
                </ul>
                <h3 className="text-xl font-bold text-foreground mt-6 mb-4">¿Por qué elegirnos?</h3>
                <ul className="text-muted-foreground list-disc list-inside">
                  <li>Enfoque integral que combina coaching, PNL y otras terapias.</li>
                  <li>Profesionales experimentados.</li>
                  <li>Caballos acostumbrados a trabajar en terapia.</li>
                  <li>Entorno natural que potencia tu transformación.</li>
                </ul>
              </div>
            </div>

            {/* Tipos de Talleres */}
            <div className="mt-12">
              <h3 className="text-4xl font-bold text-foreground mb-6 text-center">Tipos de talleres disponibles</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Taller de Comunicación Auténtica */}
                <div className="bg-card p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-bold text-foreground mb-2">Taller de comunicación auténtica</h4>
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
                  <h4 className="text-lg font-bold text-foreground mb-2">Taller para aumentar la autoestima</h4>
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
                  <h4 className="text-lg font-bold text-foreground mb-2">Taller de liderazgo y trabajo en equipo</h4>
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
                  <h4 className="text-lg font-bold text-foreground mb-2">Taller para mujeres</h4>
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
          </div>
        </section>

        {/* Galería de Imágenes */}
        <section className="py-12 relative">
          <h2 className="text-4xl font-bold text-foreground mb-8 text-center">Galería</h2>
          <div className="max-w-3xl mx-auto">
            <Slider {...settings}>
              {/* Imagen 1 */}
              <div className="px-2">
                <Image
                  src="/coaching-grupal.webp"
                  alt="Coaching Grupal"
                  width={800}
                  height={500}
                  className="w-full h-auto md:h-auto object-center rounded-lg"
                />
              </div>

              {/* Imagen 2 */}
              <div className="px-2">
                <Image
                  src="/coaching-creativo-ines-uria.webp"
                  alt="Coaching Creativo"
                  width={800}
                  height={500}
                  className="w-full h-auto md:h-auto object-center rounded-lg"
                />
              </div>

              {/* Imagen 3 */}
              <div className="px-2">
                <Image
                  src="/coaching-caballos-2.webp"
                  alt="Coaching con Caballos"
                  width={800}
                  height={500}
                  className="w-full h-auto md:h-auto object-cover rounded-lg"
                />
              </div>

              {/* Imagen 4 */}
              <div className="px-2">
                <Image
                  src="/coaching-caballos.webp"
                  alt="Coaching con Caballos"
                  width={800}
                  height={500}
                  className="w-full h-auto md:h-auto object-center rounded-lg"
                />
              </div>
              {/* Imagen 5 */}
              <div className="px-2">
                <Image
                  src="/coaching-con-caballos.webp"
                  alt="Taller de Coaching con Caballos"
                  width={800}
                  height={500}
                  className="w-full h-auto md:h-auto object-center rounded-lg"
                />
              </div>
            </Slider>
          </div>
        </section>

        {/* Llamada a la Acción */}
        <section className="py-12 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">¿Listo para transformar tu vida?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Agenda una sesión de coaching o únete a nuestros talleres de coaching con caballos para vivir una experiencia única de autoconocimiento y crecimiento.
          </p>
          <Button asChild size="lg">
            <Link href="/contacto" className="text-primary-foreground">
              Agendar Sesión o Taller
            </Link>
          </Button>
        </section>

        {/* Botón para Volver al Inicio */}
        <div className="text-center mt-12">
          <Button asChild variant="outline">
            <Link href="/" className="text-foreground">
              Volver al Inicio
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}