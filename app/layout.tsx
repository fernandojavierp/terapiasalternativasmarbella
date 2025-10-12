// src/app/layout.tsx
import "@/app/globals.css"; // Importa los estilos globales
import Header from "@/components/Header"; // Componente del Header
import Footer from "@/components/Footer"; // Componente del Footer
import { ReactNode } from "react"; // Tipo para children
import { Metadata } from "next"; // Tipo para metadatos
import { Toaster } from 'react-hot-toast'; // Importar Toaster

// Define las props del componente RootLayout
interface RootLayoutProps {
  children: ReactNode; // children es de tipo ReactNode
}

// Metadatos para SEO
export const metadata: Metadata = {
  title: "Terapias Alternativas Marbella - Ines Uria",
  description:
    "Descubre nuestras terapias alternativas en Marbella: Anatheóresis, Kinesiología Holística, Coaching y más. Encuentra equilibrio emocional, bienestar físico y crecimiento personal con Ines Uria.",
  keywords: [
    "terapias alternativas Marbella",
    "Anatheóresis Marbella",
    "Kinesiología Holística Marbella",
    "Coaching Marbella",
    "bienestar emocional Marbella",
    "crecimiento personal Marbella",
    "terapias holísticas Marbella",
    "sanación emocional Marbella",
    "equilibrio mental Marbella",
    "salud integral Marbella",
  ],
  authors: [{ name: "Ines Uria", url: "https://www.terapiasalternativasmarbella.com" }],
  robots: "index, follow",
  openGraph: {
    title: "Terapias Alternativas Marbella - Ines Uria",
    description:
      "Descubre nuestras terapias alternativas en Marbella: Anatheóresis, Kinesiología Holística, Coaching y más. Encuentra equilibrio emocional y bienestar físico.",
    type: "website",
    url: "https://www.terapiasalternativasmarbella.com",
    images: [
      {
        url: "https://www.terapiasalternativasmarbella.com/images/terapias_alternativas_marbella.webp",
        width: 800,
        height: 600,
        alt: "Ines Uria - Terapias Alternativas Marbella",
      },
    ],
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}