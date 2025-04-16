// src/components/Header.js
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
              src="/logo-removebg.png"
              alt="Terapias Alternativas Marbella"
              width={200}
              height={50}
              className="hover:scale-105 transition-all duration-300 ease-in-out"
            />
          </Link>
          
          {/* Menú de escritorio */}
          <ul className="hidden md:flex space-x-8 text-xl font-poppins">
            <li>
              <Link
                href="/servicios/anatheoresis"
                className={`hover:text-destructive transition-colors ${
                  pathname === "/servicios/anatheoresis" ? "text-destructive" : "text-foreground"
                }`}
              >
                Anatheóresis
              </Link>
            </li>
            <li>
              <Link
                href="/servicios/kinesiologia"
                className={`hover:text-destructive transition-colors ${
                  pathname === "/servicios/kinesiologia" ? "text-destructive" : "text-foreground"
                }`}
              >
                Kinesiología
              </Link>
            </li>
            <li>
              <Link
                href="/servicios/coaching"
                className={`hover:text-destructive transition-colors ${
                  pathname === "/servicios/coaching" ? "text-destructive" : "text-foreground"
                }`}
              >
                Coaching
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className={`hover:text-destructive transition-colors ${
                  pathname === "/blog" ? "text-destructive" : "text-foreground"
                }`}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/farmasi"
                className={`hover:text-destructive transition-colors ${
                  pathname === "/farmasi" ? "text-destructive" : "text-foreground"
                }`}
              >
                FARMASi
              </Link>
            </li>
            <li>
              <Link
                href="/contacto"
                className={`hover:text-destructive transition-colors ${
                  pathname === "/contacto" ? "text-destructive" : "text-foreground"
                }`}
              >
                Contacto
              </Link>
            </li>
          </ul>

          {/* Botón de menú móvil */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-foreground hover:text-destructive transition-colors"
          >
            {isMenuOpen ? <X className="w-10 h-10" /> : <Menu className="w-10 h-10" />}
          </button>
        </nav>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="md:hidden absolute top-20 left-0 right-0 bg-background border-t border-border z-50"
          >
            <ul className="flex flex-col text-right font-poppins text-xl space-y-4 p-4">
              <li>
                <Link
                  href="/"
                  className={`hover:text-destructive transition-colors ${
                    pathname === "/" ? "text-destructive" : "text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/anatheoresis"
                  className={`hover:text-destructive transition-colors ${
                    pathname === "/servicios/anatheoresis" ? "text-destructive" : "text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Anatheóresis
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/kinesiologia"
                  className={`hover:text-destructive transition-colors ${
                    pathname === "/servicios/kinesiologia" ? "text-destructive" : "text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Kinesiología
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/coaching"
                  className={`hover:text-destructive transition-colors ${
                    pathname === "/servicios/coaching" ? "text-destructive" : "text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Coaching
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className={`hover:text-destructive transition-colors ${
                    pathname === "/blog" ? "text-destructive" : "text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/farmasi"
                  className={`hover:text-destructive transition-colors ${
                    pathname === "/farmasi" ? "text-destructive" : "text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  FARMASI
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className={`hover:text-destructive transition-colors ${
                    pathname === "/contacto" ? "text-destructive" : "text-foreground"
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