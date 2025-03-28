// src/components/Header.js
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // Importa usePathname
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react"; // Íconos para el menú y cerrar
import Image from "next/image"; // Componente de Next.js para imágenes

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado del menú
  const menuRef = useRef<HTMLDivElement>(null); // Referencia para el menú con tipo explícito
  const pathname = usePathname(); // Obtiene la ruta actual

  // Función para alternar el menú
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-muted/50 border-b border-border transition-colors duration-300 hover:bg-muted/80">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-removebg.png" // Ruta de la imagen en la carpeta public
              alt="Terapias Alternativas Marbella" // Texto alternativo
              width={200} // Ancho de la imagen
              height={50} // Alto de la imagen
              className="hover:scale-105 transition-all duration-300 ease-in-out" // Estilos personalizados
            />
          </Link>
          {/* Menú de navegación para escritorio */}
          <ul className="hidden md:flex space-x-8 text-xl font-poppins">
            <li>
              <Link
                href="/servicios/anatheoresis"
                className={`text-foreground hover:text-destructive transition-colors ${
                  pathname === "/servicios/anatheoresis" ? "text-destructive font-bold" : ""
                }`}
              >
                Anatheóresis
              </Link>
            </li>
            <li>
              <Link
                href="/servicios/kinesiologia"
                className={`text-foreground hover:text-destructive transition-colors ${
                  pathname === "/servicios/kinesiologia" ? "text-destructive font-bold" : ""
                }`}
              >
                Kinesiología
              </Link>
            </li>
            <li>
              <Link
                href="/servicios/coaching"
                className={`text-foreground hover:text-destructive transition-colors ${
                  pathname === "/servicios/coaching" ? "text-destructive font-bold" : ""
                }`}
              >
                Coaching
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className={`text-foreground hover:text-destructive transition-colors ${
                  pathname === "/blog" ? "text-destructive font-bold" : ""
                }`}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/farmasi"
                className={`text-foreground hover:text-destructive transition-colors ${
                  pathname === "/farmasi" ? "text-destructive font-bold" : ""
                }`}
              >
                FARMASi
              </Link>
            </li>
            <li>
              <Link
                href="/contacto"
                className={`text-foreground hover:text-destructive transition-colors ${
                  pathname === "/contacto" ? "text-destructive font-bold" : ""
                }`}
              >
                Contacto
              </Link>
            </li>
          </ul>

          {/* Botón de menú para móviles */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-foreground hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Menú de navegación para móviles */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="md:hidden absolute top-20 left-0 right-0 bg-background border-t border-border z-50"
          >
            <ul className="flex flex-col text-left font-poppins text-xl space-y-4 p-4">
              <li>
                <Link
                  href="/"
                  className={`block text-foreground hover:text-primary transition-colors ${
                    pathname === "/" ? "text-destructive font-bold" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/anatheoresis"
                  className={`block text-foreground hover:text-primary transition-colors ${
                    pathname === "/servicios/anatheoresis" ? "text-destructive font-bold" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Anatheóresis
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/kinesiologia"
                  className={`block text-foreground hover:text-primary transition-colors ${
                    pathname === "/servicios/kinesiologia" ? "text-destructive font-bold" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Kinesiología
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/coaching"
                  className={`block text-foreground hover:text-primary transition-colors ${
                    pathname === "/servicios/coaching" ? "text-destructive font-bold" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Coaching
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className={`block text-foreground hover:text-primary transition-colors ${
                    pathname === "/blog" ? "text-destructive font-bold" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/farmasi"
                  className={`block text-foreground hover:text-primary transition-colors ${
                    pathname === "/farmasi" ? "text-destructive font-bold" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  FARMASI
                </Link>
              </li> 
              <li>
                <Link
                  href="/contacto"
                  className={`block text-foreground hover:text-primary transition-colors ${
                    pathname === "/contacto" ? "text-destructive font-bold" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}