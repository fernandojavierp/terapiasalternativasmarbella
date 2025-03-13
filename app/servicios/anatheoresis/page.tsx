// src/app/services/anatheoresis/page.js
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Clock, User, Target, BookOpen, Shield } from "lucide-react"; // Íconos para la sección de beneficios

export default function Anatheoresis() {
  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container mx-auto px-6">
        {/* Título y Descripción */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-8">Anatheóresis: Sanación Emocional y Autoconocimiento</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            La Anatheóresis es una terapia holística que te permite acceder a tu inconsciente para sanar heridas emocionales, liberar bloqueos y alcanzar un estado de equilibrio y bienestar integral. Descubre cómo esta técnica puede transformar tu vida.
          </p>
        </div>

        {/* Imagen y Descripción Detallada */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
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
            <h2 className="text-3xl font-bold text-foreground mb-6">¿Qué es la Anatheóresis?</h2>
            <p className="text-lg text-muted-foreground mb-6">
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

        {/* Beneficios de la Anatheóresis */}
        <section className="py-12 bg-card rounded-lg shadow-md">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Beneficios de la Anatheóresis</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Beneficio 1 */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Brain className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Liberación Emocional</h3>
                <p className="text-muted-foreground">
                  Ayuda a liberar emociones reprimidas y bloqueos emocionales que afectan tu bienestar.
                </p>
              </div>

              {/* Beneficio 2 */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Heart className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Sanación Interior</h3>
                <p className="text-muted-foreground">
                  Facilita la sanación de heridas emocionales y traumas del pasado para una vida más plena.
                </p>
              </div>

              {/* Beneficio 3 */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Clock className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Autoconocimiento</h3>
                <p className="text-muted-foreground">
                  Promueve el autoconocimiento y la comprensión de patrones de comportamiento.
                </p>
              </div>

              {/* Beneficio 4 */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <User className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Bienestar Integral</h3>
                <p className="text-muted-foreground">
                  Contribuye al equilibrio emocional, mental y espiritual para una vida armoniosa.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ¿Cómo Funciona la Anatheóresis? */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">¿Cómo Funciona la Anatheóresis?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Paso 1 */}
            <div className="bg-card p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <BookOpen className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Exploración del Inconsciente</h3>
              <p className="text-muted-foreground">
                A través de la relajación profunda, accedes a recuerdos y emociones almacenados en tu inconsciente.
              </p>
            </div>

            {/* Paso 2 */}
            <div className="bg-card p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <Target className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Identificación de Bloqueos</h3>
              <p className="text-muted-foreground">
                Identificamos los bloqueos emocionales y patrones que limitan tu crecimiento personal.
              </p>
            </div>

            {/* Paso 3 */}
            <div className="bg-card p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <Shield className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Sanación y Liberación</h3>
              <p className="text-muted-foreground">
                Trabajamos en la liberación de emociones reprimidas y la sanación de heridas emocionales.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonios */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Testimonios de Nuestros Pacientes</h2>
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
        </section>

        {/* Llamada a la Acción */}
        <section className="py-12 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">¿Listo para comenzar tu viaje de sanación?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Agenda una sesión de Anatheóresis y descubre cómo esta terapia puede transformar tu vida.
          </p>
          <Button asChild size="lg">
            <Link href="/contacto" className="text-primary-foreground">
              Agendar Sesión
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