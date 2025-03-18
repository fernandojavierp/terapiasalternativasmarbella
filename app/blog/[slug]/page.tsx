import { notFound } from "next/navigation";
import { Calendar, Clock, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Datos de ejemplo para los artículos del blog
const blogPosts = [
  {
    id: 1,
    title: "5 Beneficios de la Meditación",
    description:
      "Descubre cómo la meditación puede mejorar tu bienestar emocional y físico.",
    image: "/meditacion-abrazo-autoestima.webp",
    author: "Ines Uria",
    date: "2023-10-15",
    readingTime: "5 min",
    slug: "5-beneficios-de-la-meditacion",
    content: `
      <h2>1. Reduce el Estrés y la Ansiedad</h2>
      <p>La meditación es una herramienta poderosa para manejar el estrés y la ansiedad. Al enfocarte en tu respiración y en el momento presente, puedes calmar tu mente y reducir los niveles de cortisol, la hormona del estrés. Estudios científicos han demostrado que la meditación regular disminuye los síntomas de ansiedad y mejora la sensación de calma.</p>
      <p><strong>Consejo práctico:</strong> Dedica 10 minutos al día a meditar. Siéntate en un lugar tranquilo, cierra los ojos y concéntrate en tu respiración. Notarás cómo tu mente se relaja.</p>

      <h2>2. Mejora la Concentración y la Claridad Mental</h2>
      <p>La meditación fortalece la capacidad de concentración y ayuda a despejar la mente. Al practicar la atención plena (mindfulness), entrenas tu cerebro para enfocarse en una sola tarea, lo que mejora tu productividad y claridad mental.</p>
      <p><strong>Ejercicio:</strong> Prueba la meditación de enfoque en un objeto. Elige un objeto (como una vela o una flor) y concéntrate en él durante 5 minutos. Si tu mente divaga, vuelve suavemente al objeto.</p>

      <h2>3. Promueve el Bienestar Emocional</h2>
      <p>La meditación fomenta una actitud positiva y ayuda a gestionar las emociones de manera saludable. Al observar tus pensamientos sin juzgarlos, desarrollas una mayor conciencia emocional y aprendes a responder en lugar de reaccionar ante situaciones difíciles.</p>
      <p><strong>Beneficio adicional:</strong> La meditación regular puede aumentar la producción de serotonina, la hormona de la felicidad, lo que mejora tu estado de ánimo.</p>

      <h2>4. Fortalece el Sistema Inmunológico</h2>
      <p>La meditación no solo beneficia la mente, sino también el cuerpo. Estudios han demostrado que la práctica regular de la meditación puede fortalecer el sistema inmunológico, ayudando a tu cuerpo a combatir enfermedades de manera más efectiva.</p>
      <p><strong>Dato curioso:</strong> La meditación reduce la inflamación en el cuerpo, lo que está relacionado con una mejor salud general.</p>

      <h2>5. Mejora la Calidad del Sueño</h2>
      <p>Si tienes problemas para dormir, la meditación puede ser tu aliada. Al relajar la mente y el cuerpo, la meditación te ayuda a conciliar el sueño más fácilmente y a disfrutar de un descanso más profundo y reparador.</p>
      <p><strong>Técnica para dormir mejor:</strong> Antes de acostarte, practica una meditación guiada para dormir. Enfócate en tu respiración y visualiza un lugar tranquilo y seguro.</p>

      <h2>Conclusión</h2>
      <p>La meditación es una práctica accesible y efectiva que puede transformar tu vida. Desde reducir el estrés hasta mejorar la concentración y fortalecer tu sistema inmunológico, los beneficios de la meditación son innumerables. ¿Por qué no empezar hoy mismo? Dedica unos minutos al día a meditar y descubre cómo esta práctica puede mejorar tu bienestar emocional y físico.</p>

      <p>¿Te gustaría aprender más sobre cómo la meditación puede mejorar tu vida? ¡No dudes en contactarnos para más información o para programar una sesión personalizada!</p>
    `,
  },
  {
    id: 2,
    title: "Cómo Manejar el Estrés",
    description:
      "Aprende técnicas efectivas para reducir el estrés en tu vida diaria.",
    image: "/estres.webp",
    author: "Ines Uria",
    date: "2023-10-10",
    readingTime: "7 min",
    slug: "como-manejar-el-estres",
    content: `
      <h2>1. Identifica las Fuentes de Estrés</h2>
      <p>El primer paso para manejar el estrés es identificar sus fuentes. Pueden ser el trabajo, las relaciones personales, las finanzas o cualquier situación que te cause tensión. Llevar un diario de estrés puede ayudarte a reconocer patrones y desencadenantes.</p>

      <h2>2. Practica la Respiración Profunda</h2>
      <p>La respiración profunda es una técnica sencilla pero efectiva para reducir el estrés. Inhala lentamente por la nariz, sostén la respiración por unos segundos y exhala por la boca. Repite este proceso varias veces hasta que te sientas más relajado.</p>

      <h2>3. Establece Límites Saludables</h2>
      <p>Aprende a decir "no" cuando sea necesario. Establecer límites claros en tu vida personal y profesional te ayudará a evitar la sobrecarga y a mantener un equilibrio saludable.</p>

      <h2>4. Haz Ejercicio Regularmente</h2>
      <p>El ejercicio físico libera endorfinas, las hormonas del bienestar, que ayudan a reducir el estrés. Incluso una caminata diaria de 30 minutos puede marcar una gran diferencia en tu estado de ánimo.</p>

      <h2>5. Practica la Meditación y el Mindfulness</h2>
      <p>La meditación y el mindfulness son herramientas poderosas para manejar el estrés. Dedica unos minutos al día a meditar y enfócate en el momento presente. Esto te ayudará a calmar tu mente y a reducir la ansiedad.</p>

      <h2>Conclusión</h2>
      <p>Manejar el estrés es esencial para mantener una vida equilibrada y saludable. Con estas técnicas, podrás reducir el estrés y mejorar tu calidad de vida. Recuerda que es importante cuidar de ti mismo y buscar ayuda profesional si lo necesitas.</p>

      <p>¿Necesitas ayuda para manejar el estrés? ¡Contáctanos para más información o para programar una sesión personalizada!</p>
    `,
  },
  {
    id: 3,
    title: "La Importancia del Autocuidado",
    description:
      "Descubre por qué el autocuidado es esencial para tu bienestar integral.",
    image: "/autocuidado.webp",
    author: "Ines Uria",
    date: "2023-10-05",
    readingTime: "6 min",
    slug: "la-importancia-del-autocuidado",
    content: `
      <h2>1. ¿Qué es el Autocuidado?</h2>
      <p>El autocuidado es cualquier actividad que realizamos de manera deliberada para cuidar de nuestra salud mental, emocional y física. Incluye desde dormir lo suficiente hasta practicar hobbies que nos gustan.</p>

      <h2>2. Beneficios del Autocuidado</h2>
      <p>El autocuidado mejora tu bienestar general, reduce el estrés, aumenta la productividad y fortalece tu autoestima. Además, te ayuda a mantener un equilibrio entre tus responsabilidades y tus necesidades personales.</p>

      <h2>3. Tipos de Autocuidado</h2>
      <ul>
        <li><strong>Físico:</strong> Ejercicio, alimentación saludable y descanso adecuado.</li>
        <li><strong>Emocional:</strong> Expresar tus sentimientos y practicar la gratitud.</li>
        <li><strong>Mental:</strong> Leer, aprender algo nuevo o meditar.</li>
        <li><strong>Social:</strong> Pasar tiempo con seres queridos y construir relaciones saludables.</li>
      </ul>

      <h2>4. Cómo Incorporar el Autocuidado en tu Rutina</h2>
      <p>Empieza con pequeñas acciones, como dedicar 10 minutos al día a meditar o tomar un baño relajante. Planifica actividades que disfrutes y asegúrate de priorizarlas en tu agenda.</p>

      <h2>5. Señales de que Necesitas Más Autocuidado</h2>
      <p>Si te sientes constantemente agotado, irritable o desconectado, es probable que necesites dedicar más tiempo al autocuidado. Escucha a tu cuerpo y mente, y no tengas miedo de pedir ayuda si la necesitas.</p>

      <h2>Conclusión</h2>
      <p>El autocuidado no es egoísta, sino una necesidad básica para mantener tu bienestar integral. Al cuidar de ti mismo, estás mejor preparado para enfrentar los desafíos de la vida y para cuidar de los demás.</p>

      <p>¿Quieres aprender más sobre cómo incorporar el autocuidado en tu vida? ¡Contáctanos para más información o para programar una sesión personalizada!</p>
    `,
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
        <div
          className="prose prose-lg max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        {/* Llamada a la Acción */}
        <section className="py-12 text-center">
          <Button asChild size="lg">
            <Link href="/contacto" className="text-primary-foreground">
              Agendar Sesión
            </Link>
          </Button>
        </section>

        {/* Botón para Volver al Inicio */}
        <div className="text-center mt-12">
          <Button asChild variant="outline">
            <Link href="/blog" className="text-foreground">
              Volver al Blog
            </Link>
          </Button>
        </div>
      </div>
    </div>

  );
}