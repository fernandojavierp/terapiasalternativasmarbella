"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCoachDropdownOpen, setIsCoachDropdownOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Toggle coach dropdown
  const toggleCoachDropdown = () => {
    setIsCoachDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-foreground">
          Terapias Alternativas
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#anatheoresis"
            className="text-muted-foreground hover:text-foreground"
          >
            Anatheoresis
          </Link>
          <Link
            href="#kinesiologia-holistica"
            className="text-muted-foreground hover:text-foreground"
          >
            Kiniseología
          </Link>

          {/* Coach Dropdown */}
          <div className="relative group">
            <Link
              href="#coach-life"
              className="text-muted-foreground hover:text-foreground"
            >
              Coach
            </Link>
            {/* Dropdown Menu */}
            <div className="absolute left-0 top-full mt-0 hidden group-hover:block bg-white shadow-md rounded-md py-2 w-56">
              <Link
                href="#coach-life"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Coach Life y PNL
              </Link>
              <Link
                href="#coaching-creativo"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Coaching Creativo
              </Link>
              <Link
                href="#coach-grupal"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Coach Grupal con Caballos
              </Link>
            </div>
          </div>

          <Link
            href="#centro-de-terapias"
            className="text-muted-foreground hover:text-foreground"
          >
            Centro de terapias
          </Link>
          <Button asChild>
            <Link href="#contact">Pide tu cita!</Link>
          </Button>
          <Link 
            href="/blog"
            className="text-muted-foreground hover:text-foreground"
          >
            Blog
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button className="md:hidden hover:bg-gray-100" onClick={toggleMobileMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 py-4 bg-background/80 backdrop-blur-md">
          <Link
            href="#anatheoresis"
            className="text-muted-foreground hover:text-foreground"
          >
            Anatheoresis
          </Link>
          <Link
            href="#kinesiologia-holistica"
            className="text-muted-foreground hover:text-foreground"
          >
            Kiniseología
          </Link>

          {/* Coach Dropdown for Mobile */}
          <div className="relative">
            <button
              onClick={toggleCoachDropdown}
              className="text-muted-foreground hover:text-foreground"
            >
              Coach ▾
            </button>
            {isCoachDropdownOpen && (
              <div className="mt-2 bg-white shadow-md rounded-md py-2 w-56">
                <Link
                  href="#coach-life"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Coach Life y PNL
                </Link>
                <Link
                  href="#coaching-creativo"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Coaching Creativo
                </Link>
                <Link
                  href="#coach-grupal"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Coach Grupal con Caballos
                </Link>
              </div>
            )}
          </div>

          <Link
            href="#centro-de-terapias"
            className="text-muted-foreground hover:text-foreground"
          >
            Centro de terapias
          </Link>
          <Button asChild>
            <Link href="#contact">Pide una cita!</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}