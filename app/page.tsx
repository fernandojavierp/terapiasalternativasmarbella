import { Navigation } from "@/components/navigation";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Brain, Heart, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-r from-primary/30 to-accent/30 pt-15">
        <div className="container mx-auto px-4 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold text-foreground leading-tight">
                Terapias
                <br />
                Alternativas
                <br />
                Marbella
              </h1>
              <h2 className="text-xl text-muted-foreground">Coach, inteligencia emocional, Kinesiología holística</h2>
              <p className="text-muted-foreground max-w-lg">
                Soy Ines Uria, llevo más de 30 años trabajando junta a personas como tú para ayudarles en su progresión
                laboral.
              </p>
              <Button asChild size="lg">
                <Link href="#contact">Comenzar Tu Viaje</Link>
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-accent rounded-full transform scale-90 translate-x-4 translate-y-4" />
              <Image
                src="/coaching_Programacion_neurolinguistica_marbella.webp"
                alt="Ines Uria - Terapias Alternativas Marbella"
                width={600}
                height={600}
                className="relative z-10"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Nuestros Servicios</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-card">
              <Brain className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">Kinesiología Holística</h3>
              <p className="text-muted-foreground">
                Terapia que integra el cuerpo y la mente para lograr un equilibrio completo.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card">
              <Heart className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">Inteligencia Emocional</h3>
              <p className="text-muted-foreground">
                Desarrollo de habilidades emocionales para mejorar relaciones y bienestar.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card">
              <Sparkles className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">Coaching Personal</h3>
              <p className="text-muted-foreground">
                Acompañamiento personalizado para alcanzar tus metas y desarrollo personal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Service Sections */}
      <section id="anatheoresis" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 text-foreground">ANATHEÓRESIS</h2>
          <p className="text-left text-muted-foreground">
            En esta terapia descubriras cosas que se hallaban ocultas en el inconsciente. El acceder un estado de
            relajación, nos permite vivir una nueva realidad. De esta manera vamos sanando y cerrando ciclos de nuestra
            vida, es decir, vivir más libres.
          </p>
        </div>
      </section>

      <section id="kinesiologia-holistica" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 text-foreground">KINESIOLOGÍA HOLÍSTICA</h2>
          <p className="text-left text-muted-foreground">
            Descripción detallada del servicio de Kinesiología Holística.
          </p>
        </div>
      </section>

      <section id="coach-life" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 text-foreground">Coach life y PNL</h2>
          <p className="text-left text-muted-foreground">
            El coaching es una herramienta que te ayuda a descrubrir tus habilidades a través de respuesas propias y
            alcanzar tus metas. Es un proceso que te empodera y respeta tu propio ritmo. La PNL te ayuda a reprogramas
            patrones mentales positivo s a través de una practica vivencial y transformadora. La combinación de ambas
            metodologías no solo te harán sentirte mejor si no , que verás resultados tangibles en tu vida como mejores
            relaciones; una mayor confianza y productividad.
          </p>
        </div>
      </section>

      <section id="coaching-creativo" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 text-foreground">Coaching creativo</h2>
          <p className="text-left text-muted-foreground">
            Descripción detallada del servicio de Coaching Creativo.
          </p>
        </div>
      </section>

      <section id="coach-grupal" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 text-foreground">Coach grupal con caballos</h2>
          <p className="text-left text-muted-foreground">
            ¿Como funciona? Durante las sesiones; los cabellos actuan como espejos emocionales, generando confinaza y
            comunicación. Aprendiendo a gestionar las emociones. ¿A quien va dirigido? Personas buscan mejorar su
            habilidades de liderazgo. Explorar su inteligencia emocial y conectar con la naturaleza y el poder de los
            caballos.
          </p>
        </div>
      </section>

      <section id="centro-de-terapias" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 text-foreground">Centro de terapias</h2>
          <p className="text-left text-muted-foreground">Descripción detallada del centro de terapias.</p>
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
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-primary mb-2">30+</h3>
                <p className="text-muted-foreground">Años de Experiencia</p>
              </div>
              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-primary mb-2">1000+</h3>
                <p className="text-muted-foreground">Clientes Satisfechos</p>
              </div>
              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-primary mb-2">100%</h3>
                <p className="text-muted-foreground">Compromiso</p>
              </div>
              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-primary mb-2">5⭐</h3>
                <p className="text-muted-foreground">Valoración Media</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Beneficios</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Mejora del Bienestar",
                description: "Alcanza un estado de equilibrio físico y mental.",
              },
              {
                title: "Desarrollo Personal",
                description: "Potencia tus habilidades y alcanza tus metas.",
              },
              {
                title: "Gestión Emocional",
                description: "Aprende a manejar tus emociones de manera efectiva.",
              },
              {
                title: "Mayor Productividad",
                description: "Optimiza tu rendimiento personal y profesional.",
              },
              {
                title: "Relaciones Saludables",
                description: "Mejora tus relaciones interpersonales.",
              },
              {
                title: "Equilibrio Vital",
                description: "Encuentra el balance entre trabajo y vida personal.",
              },
            ].map((benefit, index) => (
              <div key={index} className="p-6 border rounded-lg hover:shadow-lg transition-shadow bg-card">
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
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
              <p className="text-muted-foreground">Email: example@mail.com</p>
              <p className="text-muted-foreground">Tel: +34 123 456 789</p>
              <p className="text-muted-foreground">Marbella, España</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#services" className="text-muted-foreground hover:text-foreground">
                    Servicios
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="text-muted-foreground hover:text-foreground">
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="#benefits" className="text-muted-foreground hover:text-foreground">
                    Beneficios
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-muted-foreground hover:text-foreground">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Terapias Alternativas Marbella. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
}