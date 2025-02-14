import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Terapias Alternativas Marbella",
  description: "Terapias Alternativas Marbella ofrece una variedad de tratamientos y técnicas no convencionales para promover la salud y el bienestar en cuerpo, mente y espíritu. Estas terapias buscan complementar la medicina tradicional, brindando opciones naturales y holísticas para quienes buscan alternativas para mejorar su calidad de vida. Ubicado en Marbella, este centro es un refugio de tranquilidad y sanación para aquellos que desean explorar enfoques diferentes para la salud y el equilibrio emocional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
