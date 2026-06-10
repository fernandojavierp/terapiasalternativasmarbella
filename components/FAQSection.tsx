"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "¿Qué es la Anatheóresis y cómo puede ayudarme?",
    answer: "La Anatheóresis es una terapia regresiva profunda y perceptiva que te permite acceder al estado meditativo de ondas cerebrales theta (el estado natural de la infancia). A través de este proceso, podemos localizar el origen de traumas, miedos o bloqueos emocionales gestados en la niñez o etapa prenatal para comprenderlos y sanarlos definitivamente."
  },
  {
    question: "¿Cómo funciona la Kinesiología Holística?",
    answer: "Es un método de diagnóstico y tratamiento que utiliza el test muscular (o test de AR - Arm Reflex) para dialogar con el cuerpo. Nos permite identificar desequilibrios en el plano físico, químico/nutricional, emocional o energético, y determinar exactamente qué tipo de terapia, nutriente o técnica natural necesita el organismo para recuperar su equilibrio."
  },
  {
    question: "¿En qué consiste el Coaching con caballos?",
    answer: "Es una modalidad de acompañamiento de desarrollo personal donde los caballos actúan como espejos de nuestras emociones. Al ser animales de presa altamente sensibles, reflejan nuestro estado interno de forma honesta y no verbal, facilitando una profunda toma de conciencia sobre el liderazgo, la coherencia emocional, los límites y la comunicación asertiva."
  },
  {
    question: "¿Cuántas sesiones se suelen necesitar para ver resultados?",
    answer: "Depende completamente de la persona y de la situación a tratar. Sin embargo, al ser terapias holísticas que actúan a nivel inconsciente y corporal, los cambios suelen experimentarse de forma muy profunda desde las primeras sesiones. Tras la primera consulta, trazamos una propuesta personalizada según tus necesidades específicas."
  },
  {
    question: "¿Estas terapias sustituyen al tratamiento médico convencional?",
    answer: "En absoluto. Nuestras terapias son complementarias y holísticas. Acompañan y potencian cualquier tratamiento médico, psicológico o farmacológico oficial ayudando a liberar la carga emocional y el estrés asociado a la dolencia, pero nunca pretenden sustituir las indicaciones de los profesionales de la salud."
  },
  {
    question: "¿Es posible realizar las sesiones de manera online?",
    answer: "Sí, especialmente los procesos de Coaching y acompañamiento emocional se adaptan perfectamente a videollamadas. Para terapias corporales como la Kinesiología, es recomendable el formato presencial, aunque existen técnicas de testaje a distancia aplicables en ciertos casos."
  }
];

function FAQCard({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-border bg-card rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left font-medium transition-colors hover:bg-muted/30 focus:outline-none"
      >
        <span className="text-lg text-foreground font-semibold pr-4">{item.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="text-muted-foreground flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-5 pt-0 text-muted-foreground leading-relaxed border-t border-border/50 text-base">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-background py-16" id="faq">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-center mb-4">
          Preguntas frecuentes
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto text-lg">
          Respuestas a las dudas más comunes sobre nuestras terapias y metodología de trabajo holístico.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQCard
              key={index}
              item={faq}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
