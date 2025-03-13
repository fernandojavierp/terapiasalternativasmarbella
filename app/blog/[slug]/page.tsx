// src/app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Calendar, Clock, User } from "lucide-react";
import Image from "next/image";

// Datos de ejemplo para los artículos del blog
const blogPosts = [
  {
    id: 1,
    title: "5 Beneficios de la Meditación",
    description:
      "Descubre cómo la meditación puede mejorar tu bienestar emocional y físico.",
    image: "/meditacion.jpg",
    author: "Ines Uria",
    date: "2023-10-15",
    readingTime: "5 min",
    slug: "5-beneficios-de-la-meditacion",
    content:
      "La meditación es una práctica milenaria que ha demostrado tener numerosos beneficios para la salud mental y física. En este artículo, exploramos cómo la meditación puede ayudarte a reducir el estrés, mejorar la concentración y promover el bienestar general.",
  },
  {
    id: 2,
    title: "Cómo Manejar el Estrés",
    description:
      "Aprende técnicas efectivas para reducir el estrés en tu vida diaria.",
    image: "/estres.jpg",
    author: "Ines Uria",
    date: "2023-10-10",
    readingTime: "7 min",
    slug: "como-manejar-el-estres",
    content:
      "El estrés es una respuesta natural del cuerpo, pero cuando se vuelve crónico, puede tener efectos negativos en la salud. Aquí te presentamos algunas técnicas efectivas para manejar el estrés y mejorar tu calidad de vida.",
  },
  {
    id: 3,
    title: "La Importancia del Autocuidado",
    description:
      "Descubre por qué el autocuidado es esencial para tu bienestar integral.",
    image: "/autocuidado.jpg",
    author: "Ines Uria",
    date: "2023-10-05",
    readingTime: "6 min",
    slug: "la-importancia-del-autocuidado",
    content:
      "El autocuidado no es un lujo, sino una necesidad. En este artículo, exploramos por qué es importante dedicar tiempo a cuidar de ti mismo y cómo esto puede mejorar tu bienestar emocional y físico.",
  },
];

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound(); // Muestra la página 404 si el artículo no existe
  }

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Título del artículo */}
        <h1 className="text-4xl font-bold text-foreground text-center mb-8">
          {post.title}
        </h1>

        {/* Imagen del artículo */}
        <div className="relative h-96 mb-8">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Metadatos del artículo */}
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-8">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>{post.readingTime}</span>
          </div>
        </div>

        {/* Contenido del artículo */}
        <div className="prose prose-lg max-w-3xl mx-auto">
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
}