// src/app/services/anatheoresis/page.js
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Clock, User, Target, BookOpen, Shield } from "lucide-react"; // Íconos para la sección de beneficios

export default function Anatheoresis() {
  return (
    <div className="bg-background min-h-screen">
      {/* Título y Descripción */}
      <section className="w-full bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-8">Anatheóresis: sanación emocional y autoconocimiento</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              La Anatheóresis es una terapia holística que te permite acceder a tu inconsciente para sanar heridas emocionales, liberar bloqueos y alcanzar un estado de equilibrio y bienestar integral. Descubre cómo esta técnica puede transformar tu vida.
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
                src="/conexion_regresion_sanacion.webp"
                alt="Terapia de Anatheóresis - Sanación Emocional"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">¿Qué es la Anatheóresis?</h2>
              <p className="text-lg mb-6">
                La Anatheóresis es una técnica terapéutica que combina la regresión consciente con la relajación profunda. A través de esta terapia, puedes acceder a recuerdos y emociones almacenados en tu inconsciente, permitiéndote liberar bloqueos emocionales y sanar heridas del pasado.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Esta terapia es ideal para personas que buscan comprender y superar traumas, fobias, ansiedad o patrones repetitivos en su vida. Además, promueve el autoconocimiento y el crecimiento personal.
              </p>
              <Button asChild size="lg">
                <Link href="/contacto" className="text-primary-foreground">
                  Agenda tu Sesión
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios de la Anatheóresis */}
      <section className="w-full bg-background">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold mb-8 text-center">Beneficios de la Anatheóresis</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Beneficio 1 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Brain className="w-12 h-12 text-primary" />
              </div>
              <p className="text-muted-foreground">
                Ayuda a liberar emociones reprimidas y bloqueos emocionales que afectan tu bienestar.
              </p>
            </div>

            {/* Beneficio 2 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Heart className="w-12 h-12 text-primary" />
              </div>
              <p className="text-muted-foreground">
                Facilita la sanación de heridas emocionales y traumas del pasado para una vida más plena.
              </p>
            </div>

            {/* Beneficio 3 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Clock className="w-12 h-12 text-primary" />
              </div>
              <p className="text-muted-foreground">
                Promueve el autoconocimiento y la comprensión de patrones de comportamiento.
              </p>
            </div>

            {/* Beneficio 4 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <User className="w-12 h-12 text-primary" />
              </div>
              <p className="text-muted-foreground">
                Contribuye al equilibrio emocional, mental y espiritual para una vida armoniosa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Cómo Funciona la Anatheóresis? */}
      <section className="w-full bg-muted/50">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold mb-8 text-center">¿Cómo funciona la Anatheóresis?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Paso 1 */}
            <div className="bg-card p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <BookOpen className="w-12 h-12 text-primary" />
              </div>
              <p className="text-muted-foreground">
                A través de la relajación profunda, accedes a recuerdos y emociones almacenados en tu inconsciente.
              </p>
            </div>

            {/* Paso 2 */}
            <div className="bg-card p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <Target className="w-12 h-12 text-primary" />
              </div>
              <p className="text-muted-foreground">
                Identificamos los bloqueos emocionales y patrones que limitan tu crecimiento personal.
              </p>
            </div>

            {/* Paso 3 */}
            <div className="bg-card p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <Shield className="w-12 h-12 text-primary" />
              </div>
              <p className="text-muted-foreground">
                Trabajamos en la liberación de emociones reprimidas y la sanación de heridas emocionales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="w-full bg-background">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold mb-8 text-center">Testimonios de nuestros pacientes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonio 1 */}
            <div className="bg-card p-6 rounded-lg shadow-md">
              <p className="text-muted-foreground mb-4">
                "La Anatheóresis me ayudó a entender y superar traumas que arrastraba desde la infancia. Ahora me siento más libre y en paz."
              </p>
              <p className="text-sm text-foreground font-semibold">- María G.</p>
            </div>

            {/* Testimonio 2 */}
            <div className="bg-card p-6 rounded-lg shadow-md">
              <p className="text-muted-foreground mb-4">
                "Gracias a esta terapia, pude liberar emociones que tenía reprimidas y ahora vivo con más claridad y tranquilidad."
              </p>
              <p className="text-sm text-foreground font-semibold">- Juan P.</p>
            </div>

            {/* Testimonio 3 */}
            <div className="bg-card p-6 rounded-lg shadow-md">
              <p className="text-muted-foreground mb-4">
                "Fue una experiencia transformadora. Recomiendo la Anatheóresis a cualquiera que busque sanar heridas emocionales."
              </p>
              <p className="text-sm text-foreground font-semibold">- Ana L.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Llamada a la Acción */}
      <section className="w-full bg-muted/50">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl font-bold mb-6">¿Listo para comenzar tu viaje de sanación?</h2>
          <p className="text-lg mb-8">
            Agenda una sesión de Anatheóresis y descubre cómo esta terapia puede transformar tu vida.
          </p>
          <Button asChild size="lg">
            <Link href="/contacto" className="text-primary-foreground">
              Agendar Sesión
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