import { Navigation } from "@/components/navigation"
import { ContactForm } from "@/components/contact-form"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Brain, Clock, Sparkles, Smile, Target, HeartPulse, Briefcase, Users, Scale, Facebook, Instagram  } from "lucide-react"
import { WhatsAppToggle } from "@/components/WhatsAppToggle" // Importa el componente





export default function Home() {
  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 flex items-center justify-center h-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 mt-28 lg:mt-0">
              <h1 className="text-5xl font-bold text-foreground leading-tight">
                Terapias
                <br />
                Alternativas
                <br />
                Marbella
              </h1>
              <h2 className="text-xl">Coach, inteligencia emocional, Kinesiología holística</h2>
              <p className="max-w-lg">
                Soy Ines Uria, llevo más de 30 años trabajando junta a personas como tú para ayudarles en su progresión
                laboral.
              </p>
              <Button asChild size="lg">
                <Link href="#services">Comenzar Tu Viaje</Link>
              </Button>
            </div>
            <div className="relative rounded-lg overflow-hidden">
              <div className="" />
              <Image
                src="/ines-uria-foto.png"
                alt="Ines Uria - Terapias Alternativas Marbella"
                width={800}
                height={800}
                quality={100}
                className="relative z-10"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-foreground">Sobre Nosotros</h2>
              <p className="text-muted-foreground mb-4">
                Con más de tres décadas de experiencia, nos dedicamos a ayudar a las personas a alcanzar su máximo
                potencial a través de terapias alternativas y coaching personalizado.
              </p>
              <p className="text-muted-foreground mb-6">
                Nuestro enfoque holístico integra diferentes técnicas y metodologías para proporcionar un servicio
                completo y adaptado a las necesidades de cada individuo.
              </p>
              <Button variant="outline" asChild>
                <Link href="#contact">Conoce Más</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-9 rounded-lg">
              <div className="rounded-lg">
                <Image
                  src="/sobre-nosotros.jpg"
                  alt="Ines Uria - Terapias Alternativas Marbella"
                  width={800}
                  height={800}
                />
              </div>
              <div className="rounded-lg">
                <Image
                  src="/coach-caballos.jpg"
                  alt="Ines Uria - Terapias Alternativas Marbella"
                  width={800}
                  height={800}
                />
              </div>
              <div className="rounded-lg">
                <Image
                  src="/ines-uria-sobre-nosotros.png"
                  alt="Ines Uria - Terapias Alternativas Marbella"
                  width={800}
                  height={800}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Nuestras Terapias</h2>
          <div className="grid md:grid-cols-3 gap-8">
          <Link href="#anatheoresis" className="hover:shadow-lg transition-shadow">
              <div className="p-6 rounded-lg bg-card">
                <Clock className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">Anatheoresis</h3>
                <p className="text-muted-foreground">
                  Terapia que te ayuda a descubrir y sanar heridas emocionales del pasado.
                </p>
              </div>
            </Link>
            <Link href="#kinesiologia-holistica " className="hover:shadow-lg transition-shadow">
              <div className="p-6 rounded-lg bg-card">
                <Brain className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">Kinesiología Holística</h3>
                <p className="text-muted-foreground">
                  Terapia que integra el cuerpo y la mente para lograr un equilibrio completo.
                </p>
              </div>
            </Link>
            <Link href="#coach-life" className="hover:shadow-lg transition-shadow">
              <div className="p-6 rounded-lg bg-card">
                <Sparkles className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">Coaching</h3>
                <p className="text-muted-foreground">
                  Acompañamiento personalizado para alcanzar tus metas y desarrollo personal.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
<section id="benefits" className="py-10 bg-background">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Beneficios de la terapia alternativa</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          title: "Mejora del Bienestar",
          description: "Alcanza un estado de equilibrio físico y mental.",
          icon: <Smile className="w-12 h-12 text-primary" />,
        },
        {
          title: "Desarrollo Personal",
          description: "Potencia tus habilidades y alcanza tus metas.",
          icon: <Target className="w-12 h-12 text-primary" />,
        },
        {
          title: "Gestión Emocional",
          description: "Aprende a manejar tus emociones de manera efectiva.",
          icon: <HeartPulse className="w-12 h-12 text-primary" />,
        },
        {
          title: "Mayor Productividad",
          description: "Optimiza tu rendimiento personal y profesional.",
          icon: <Briefcase className="w-12 h-12 text-primary" />,
        },
        {
          title: "Relaciones Saludables",
          description: "Mejora tus relaciones interpersonales.",
          icon: <Users className="w-12 h-12 text-primary" />,
        },
        {
          title: "Equilibrio Vital",
          description: "Encuentra el balance entre trabajo y vida personal.",
          icon: <Scale className="w-12 h-12 text-primary" />,
        },
      ].map((benefit, index) => (
        <div key={index} className="p-6 border rounded-lg hover:shadow-lg transition-shadow bg-card flex flex-col items-center text-center">
          <div className="mb-4">{benefit.icon}</div>
          <h3 className="text-xl font-semibold mb-2 text-card-foreground">{benefit.title}</h3>
          <p className="text-muted-foreground">{benefit.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Brief description for each service */}
<section id="anatheoresis" className="py-24 bg-background">
  <div className="container mx-auto px-6">
    <h2 className="text-4xl font-bold text-left mb-12 text-foreground">Anatheóresis</h2>
    <div className="flex flex-col md:flex-row items-center gap-8">
      <Image
        src="/conexion_regresion_sanacion.webp"
        alt="Terapia de Anatheóresis"
        width={500}
        height={500}
        className="rounded-lg shadow-lg  object-cover md:w-1/2"
      />
      <p className="text-lg leading-relaxed text-muted-foreground w-full md:w-1/2">
        En esta terapia descubrirás aspectos ocultos en tu inconsciente. Al acceder a un estado de relajación
        profunda, es posible experimentar una nueva realidad. Esto permite sanar heridas emocionales y cerrar ciclos
        de vida, logrando así una mayor libertad y bienestar.
      </p>
      <Button asChild size="lg">
      <Link href="#contact" className="inline-block">Mas información</Link>
      </Button>
    </div>
  </div>
</section>

<section id="kinesiologia-holistica" className="py-20 bg-background">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-left mb-12 text-foreground">Kinesiología Holística</h2>
    <div className="flex flex-col md:flex-row items-center gap-8">
      <Image
        src="/kinesiologia.jpg"
        alt="Kinesiología Holística"
        width={500}
        height={500}
        className="rounded-lg shadow-lg w-full md:w-1/2"
      />
      <p className="text-lg text-muted-foreground w-full md:w-1/2">
        La kinesiología holística es una terapia que integra el cuerpo y la mente para lograr un equilibrio completo.
        A través de la kinesiología, se pueden identificar desequilibrios energéticos y emocionales, y encontrar las
        herramientas necesarias para restablecer la armonía en todos los niveles.
      </p>
      <Button asChild size="lg">
      <Link href="#contact" className="inline-block">Mas información</Link>
      </Button>
    </div>
  </div>
</section>

<section id="coach-life" className="py-20 bg-background">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-left mb-12 text-foreground">Coach life y PNL</h2>
    <div className="flex flex-col md:flex-row items-center gap-8">
      <Image
        src="/coach-life.jpg"
        alt="Coaching de vida"
        width={500}
        height={500}
        className="rounded-lg shadow-lg w-full md:w-1/2"
      />
      <p className="text-lg text-muted-foreground w-full md:w-1/2">
        El coaching es un proceso de acompañamiento personalizado que te ayuda a alcanzar tus metas y desarrollar tu
        potencial. A través de sesiones individuales, podrás identificar tus objetivos, superar obstáculos y
        transformar tu vida de manera positiva.
      </p>
      <Button asChild size="lg">
      <Link href="#contact" className="inline-block">Mas información</Link>
      </Button>
    </div>
  </div>
</section>

<section id="coaching-creativo" className="py-20 bg-background">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-left mb-12 text-foreground">Coaching creativo</h2>
    <div className="flex flex-col md:flex-row items-center gap-8">
      <Image
        src="/coaching-creativo.jpg"
        alt="Coaching creativo"
        width={500}
        height={500}
        className="rounded-lg shadow-lg w-full md:w-1/2"
      />
      <p className="text-lg text-muted-foreground w-full md:w-1/2">
        El coaching creativo es una herramienta poderosa para estimular la creatividad y la innovación. A través de
        técnicas y ejercicios creativos, podrás explorar nuevas perspectivas, descubrir soluciones innovadoras y
        potenciar tu creatividad en todos los ámbitos de tu vida.
      </p>
      <Button asChild size="lg">
      <Link href="#contact" className="inline-block">Mas información</Link>
      </Button>
    </div>
  </div>
</section>

<section id="coach-grupal" className="py-20 bg-background">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-left mb-12 text-foreground">Coach Grupal con Caballos</h2>
    <div className="flex flex-col md:flex-row items-center gap-8">
      <Image
        src="/coach-caballos.jpg"
        alt="Coach con caballos"
        width={500}
        height={500}
        className="rounded-lg shadow-lg w-10 md:w-1/2"
      />
      <p className="text-lg text-muted-foreground w-full md:w-1/2">
        El coach grupal con caballos es una experiencia única que combina el coaching con la equinoterapia. A través
        de la interacción con los caballos, podrás desarrollar habilidades de liderazgo, trabajo en equipo,
        comunicación y gestión emocional. Esta experiencia te permitirá conectar contigo mismo y con los demás de
        una manera profunda y significativa.
      </p>
      <Button asChild size="lg">
      <Link href="#contact" className="inline-block">Mas información</Link>
      </Button>
    </div>
  </div>
</section>

      {/* Centro de terapias */}
      <section id="centro-de-terapias" className="py-20 bg-background">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Centro de terapias</h2>
    <div className="flex flex-col md:flex-row items-center gap-8">
      <Image
        src="/centro-terapias.jpg"
        alt="Centro de terapias"
        width={500}
        height={500}
        className="rounded-lg shadow-lg w-full md:w-1/2"
      />
      <p className="text-lg text-muted-foreground w-full md:w-1/2">
        Nuestro centro de terapias ofrece un espacio acogedor y tranquilo donde podrás desconectar del estrés y la
        rutina diaria. Ven a descubrir un lugar donde cuidarte y transformarte.
      </p>
    </div>
  </div>
</section>


      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Contacta con Nosotros</h2>
          <ContactForm />
        </div>
      </section>

       {/* Footer */}
       <footer className="bg-background text-foreground py-12">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-xl font-bold mb-4">Terapias Alternativas Marbella</h3>
        <p className="text-muted-foreground">
          Transformando vidas a través de terapias holísticas y coaching personalizado.
        </p>
      </div>
      <div>
      <h3 className="text-xl font-bold mb-4">Contacto</h3>
        <p className="text-muted-foreground">
          Email:{" "}
          <Link
            href="mailto:example@mail.com" // Reemplaza con tu correo
            className="text-primary hover:underline"
          >
            ines.tpmarbella@gmail.com
          </Link>
        </p>
        <p className="text-muted-foreground">
          Tel:{" "}
          <Link
            href="https://wa.me/34628595929" // Reemplaza con tu número
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            +34 628-59-59-29
          </Link>
        </p>
        <p className="text-muted-foreground">Marbella, España</p>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4">Síguenos</h3>
        <div className="flex space-x-4">
          <Link
            href="https://facebook.com/tu-pagina"
            className="text-muted-foreground hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="w-6 h-6" />
          </Link>
          <Link
            href="https://instagram.com/tu-pagina"
            className="text-muted-foreground hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
    <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
      <p>&copy; {new Date().getFullYear()} Terapias Alternativas Marbella. Todos los derechos reservados.</p>
    </div>
  </div>
</footer>

      {/* Botón flotante de WhatsApp */}
      <WhatsAppToggle />
    </>
  )
}

