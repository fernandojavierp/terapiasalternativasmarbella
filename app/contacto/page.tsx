// src/app/contacto/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!publicKey) {
      console.error("EmailJS Public Key no está configurada");
      return;
    }

    try {
      emailjs.init(publicKey);
    } catch (error) {
      console.error("Error al inicializar EmailJS:", error);
    }
    
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSubmitStatus({
        success: false,
        message:
          "Error de configuración. Por favor, contacta al administrador.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await emailjs.send(serviceId, templateId, {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });

      if (response.status === 200) {
        setSubmitStatus({
          success: true,
          message:
            "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message:
          "Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-background min-h-screen overflow-x-hidden">
      <div className="container mx-auto px-4 py-16">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Link>
        </Button>

        <h1 className="text-4xl font-bold text-center mb-8">Contacto</h1>
        <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
          ¿Tienes alguna pregunta o deseas programar una cita? ¡Contáctanos!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
                  <a
                    href="https://www.google.es/maps/place/C.+Ramiro+Campos+Turmo,+4,+29602+Marbella,+M%C3%A1laga/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <h3 className="text-xl font-bold">Ubicación</h3>
                    <p className="text-muted-foreground hover:text-primary transition-colors">
                      Calle Ramiro Campos Turmo, local 4, Marbella, España
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitStatus && (
                <div
                  className={`p-4 rounded-md ${
                    submitStatus.success
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
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
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
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
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-2"
                >
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
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
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
                {isSubmitting ? "Enviando..." : "Enviar mensaje"}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12">
          <iframe
            title="Mapa de ubicación"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3237.391052179172!2d-4.88149632419575!3d36.51043037228766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd72f74d81fcf5c3%3A0x9b56a477af402e97!2sC.%20Ramiro%20Campos%20Turmo%2C%20local%204%2C%2029602%20Marbella%2C%20M%C3%A1laga%2C%20Spain!5e0!3m2!1sen!2ses!4v1714837020841!5m2!1sen!2ses"
            width="100%"
            height="400"
            allowFullScreen
            loading="lazy"
            className="rounded-lg shadow-md w-full border-0"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
