// src/app/contacto/page.js
"use client";

import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";


export default function Contacto() {
  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            Contacta con nosotros
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Si tienes preguntas, deseas programar una cita o necesitas más información sobre nuestras terapias, no dudes en ponerte en contacto con nosotros.
          </p>
        </section>

        {/* Detalles de Contacto */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Tarjeta de Email */}
          <div className="bg-card p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Mail className="w-8 h-8 text-primary" />
              </div>
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

          {/* Tarjeta de Teléfono */}
          <div className="bg-card p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Phone className="w-8 h-8 text-primary" />
              </div>
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

          {/* Tarjeta de Dirección */}
          <div className="bg-card p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Dirección</h3>
            <p className="text-muted-foreground">Marbella, España</p>
          </div>

          {/* Tarjeta de Horario */}
          <div className="bg-card p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Clock className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Horario</h3>
            <p className="text-muted-foreground">
              Lunes a Viernes: 9:00 - 18:00
              <br />
              Sábados: 10:00 - 14:00
            </p>
          </div>
        </section>

        {/* Mapa de Ubicación */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
            Nuestra Ubicación
          </h2>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12843.123456789012!2d-4.885826!3d36.510071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDMwJzM2LjMiTiA0wrA1MycwOS4xIlc!5e0!3m2!1ses!2ses!4v1234567890123!5m2!1ses!2ses"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="w-full h-96"
              title="Ubicación de Terapias Alternativas Marbella"
            ></iframe>
          </div>
        </section>

        {/* Llamada a la Acción */}
        <section className="text-center py-12 bg-card rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            ¿Listo para comenzar tu viaje de sanación?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Contáctanos hoy mismo y descubre cómo nuestras terapias pueden transformar tu vida.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild size="lg">
              <a
                href="mailto:ines.tpmarbella@gmail.com"
                className="text-primary-foreground"
              >
                <Mail className="mr-2" /> Enviar Email
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href="https://wa.me/34628595929"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground"
              >
                <MessageCircle className="mr-2" /> Enviar WhatsApp
              </a>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}