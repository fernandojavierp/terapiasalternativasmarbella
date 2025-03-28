"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Image from "next/image";

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "5 beneficios de la meditación",
      description: "Descubre cómo la meditación puede mejorar tu bienestar emocional y físico.",
      image: "/meditacion-abrazo-autoestima.webp",
      author: "Ines Uria",
      date: "2023-10-15",
      readingTime: "5 min",
      slug: "5-beneficios-de-la-meditacion",
    },
    {
      id: 2,
      title: "Cómo manejar el estrés",
      description: "Aprende técnicas efectivas para reducir el estrés en tu vida diaria.",
      image: "/estres.webp",
      author: "Ines Uria",
      date: "2023-10-10",
      readingTime: "7 min",
      slug: "como-manejar-el-estres",
    },
    {
      id: 3,
      title: "La importancia del autocuidado",
      description: "Descubre por qué el autocuidado es esencial para tu bienestar integral.",
      image: "/autocuidado.webp",
      author: "Ines Uria",
      date: "2023-10-05",
      readingTime: "6 min",
      slug: "la-importancia-del-autocuidado",
    }
  ];

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Link>
        </Button>

        <h1 className="text-4xl font-bold text-center mb-8">Blog</h1>
        <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
          Descubre artículos sobre bienestar, salud y desarrollo personal.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Imagen del artículo */}
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Contenido del artículo */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-4">{post.description}</p>

                {/* Metadatos del artículo */}
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{post.readingTime}</span>
                  </div>
                </div>

                {/* Botón para leer más */}
                <div className="mt-6">
                  <Button asChild>
                    <Link href={`/blog/${post.slug}`}>Leer más</Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}