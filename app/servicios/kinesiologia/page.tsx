// src/app/services/kinesiologia/page.js
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Shield, Leaf, Smile, Clock } from "lucide-react"; // Íconos para las secciones

export default function Kinesiologia() {
  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container mx-auto px-6">
        {/* Título y Descripción */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-8">Kinesiología Holística</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conectando cuerpo y energía para un equilibrio integral.
          </p>
        </div>

        {/* Imagen y Descripción Detallada */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/kinesiologia.webp"
              alt="Kinesiología Holística"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">¿Qué es la Kinesiología Holística?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              La Kinesiología Holística es mucho más que una manipulación física o una técnica alternativa. Es una
              puerta a la sabiduría interior de nuestro propio cuerpo. Con un enfoque integral, esta disciplina busca
              entender y equilibrar los sistemas físicos, emocionales, químicos y energéticos de la persona, todo a
              través de una conexión directa con el inconsciente del paciente mediante el uso de un test muscular.
            </p>
            <p className="text-lg text-muted-foreground">
              Durante una sesión, el terapeuta utiliza puntos reflejos y preguntas específicas para obtener respuestas
              claras y precisas del cuerpo. A través de este test muscular, se abre una comunicación con el inconsciente,
              permitiendo identificar el estado de salud del organismo y las áreas que necesitan apoyo.
            </p>
          </div>
        </div>

        {/* Beneficios de la Kinesiología Holística */}
        <section className="py-12 bg-card rounded-lg shadow-md">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Beneficios de la Kinesiología Holística</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Beneficio 1 */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Heart className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Reducción del Estrés</h3>
                <p className="text-muted-foreground">
                  Libera bloqueos energéticos y recupera la calma y el bienestar profundo.
                </p>
              </div>

              {/* Beneficio 2 */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Brain className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Equilibrio Emocional</h3>
                <p className="text-muted-foreground">
                  Aborda emociones no resueltas y creencias limitantes para ganar claridad y estabilidad.
                </p>
              </div>

              {/* Beneficio 3 */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Shield className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Mejora de la Salud Física</h3>
                <p className="text-muted-foreground">
                  Alivia dolores físicos, corrige la postura y optimiza el funcionamiento del cuerpo.
                </p>
              </div>

              {/* Beneficio 4 */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Leaf className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Aumento de Energía</h3>
                <p className="text-muted-foreground">
                  Libera bloqueos energéticos y recupera la vitalidad y claridad mental.
                </p>
              </div>

              {/* Beneficio 5 */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Smile className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Adaptación Natural</h3>
                <p className="text-muted-foreground">
                  Mejora la resistencia y resiliencia para afrontar cambios y desafíos.
                </p>
              </div>

              {/* Beneficio 6 */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Clock className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Equilibrio Digestivo</h3>
                <p className="text-muted-foreground">
                  Trata problemas digestivos desde la raíz, mejorando el tránsito y reduciendo el estrés.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Historia y Filosofía */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-foreground mb-14 text-center">Historia y Filosofía</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-muted-foreground mb-6">
                La Kinesiología Holística tiene sus raíces en la visión holística de la salud, inspirada en el trabajo de
                pioneros como el Dr. George Goodheart. Este método evalúa los desequilibrios del cuerpo a través de la
                prueba muscular, conocida como Arm Reflex (AR), y aborda no solo el cuerpo físico, sino también el
                emocional, energético y químico.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Creada por el osteópata belga Raphael Van Assche, esta técnica identifica desequilibrios emocionales que
                impactan el tono muscular, permitiendo un tratamiento personalizado y efectivo.
              </p>
              <p className="text-lg text-muted-foreground">
                La enfermedad no tiene una sola causa, sino que es un bloqueo de la capacidad de autocuración del cuerpo,
                afectada por varios factores. La Kinesiología Holística permite liberar estos bloqueos y restaurar el
                equilibrio natural.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/kinesiologia-historica.webp"
                alt="Historia de la Kinesiología Holística"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>

        {/* Problemas Digestivos */}
        <section className="py-12 bg-card rounded-lg shadow-md">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-foreground mb-14 text-center">Problemas Digestivos</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg text-muted-foreground mb-6">
                  Los problemas digestivos son cada vez más comunes en nuestra sociedad actual, donde los alimentos
                  procesados, ricos en azúcares y grasas trans, junto con el exceso de proteínas animales, predominan en
                  la dieta y carecen de nutrientes vivos. Estos hábitos pueden alterar el delicado equilibrio de nuestra
                  microbiota intestinal, generando malestares como digestiones pesadas, hinchazón, gases o incluso
                  gastritis.
                </p>
                <p className="text-lg text-muted-foreground">
                  La Kinesiología Holística es una herramienta poderosa que trata la raíz de estos desequilibrios. A
                  través de un test muscular, identificamos los desajustes energéticos, emocionales y químicos que
                  afectan tu sistema digestivo, y no solo tratamos los síntomas, sino que ayudamos a tu cuerpo a volver a
                  su armonía natural.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/problemas-digestivos-kinesiologia.webp"
                  alt="Problemas Digestivos"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Llamada a la Acción */}
        <section className="py-12 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">¿Listo para reconectar con tu bienestar?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Agenda una sesión de Kinesiología Holística y descubre cómo esta terapia puede transformar tu vida.
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