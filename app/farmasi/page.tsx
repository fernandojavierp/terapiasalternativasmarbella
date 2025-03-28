"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { ShoppingBag, X } from "lucide-react";
import { useState } from "react";

export default function FarmasiPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const products = [
    {
      src: "/aloe-glow-mandarina.webp",
      alt: "Producto Farmasi 1"
    },
    {
      src: "/crema-balsam-tea-tree.webp",
      alt: "Producto Farmasi 2"
    },
    {
      src: "/crema-hidratante-2.webp",
      alt: "Producto Farmasi 3"
    },
    {
      src: "/vitamin-c.webp",
      alt: "Producto Farmasi 4"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-background py-0">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-center">
          <div className="text-center ml-4 lg:text-left space-y-6 lg:mb-28 lg:mr-12">
            <h1 className="font-playfair mt-10 text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              Descubre la
              <br />
              belleza natural
              <br />
              con Farmasi
            </h1>
            <h2 className="text-xl text-muted-foreground">
              Productos de belleza de alta calidad a precios accesibles
            </h2>
            <p className="text-lg text-muted-foreground max-w-lg">
              Descubre la exclusiva selección de cosméticos y productos de cuidado personal, 
              formulados con ingredientes naturales para realzar tu belleza natural.
            </p>
            <Button asChild size="lg">
              <a href="https://www.farmasi.es/inesuria" target="_blank" rel="noopener noreferrer">
                Ver catálogo completo
              </a>
            </Button>
          </div>
          <div className="mt-10 lg:mt-0">
            <Image
              src="/farmasi-portada.webp"
              alt="Farmasi Beauty Products"
              width={600}
              height={600}
              quality={100}
              className=""
              priority
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Productos destacados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product, index) => (
              <div
                key={index}
                className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setSelectedImage(product.src)}
              >
                <Image
                  src={product.src}
                  alt={product.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  width={400}
                  height={400}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-lg font-medium">Ver más</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative max-w-5xl w-full">
            <Image
              src={selectedImage}
              alt="Producto ampliado"
              className="w-full h-auto rounded-lg"
              width={1200}
              height={800}
              priority
            />
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Lista para descubrir tu belleza natural?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explora el catálogo completo de productos Farmasi y encuentra los productos adecuados para ti.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <a href="https://www.farmasi.es/inesuria" target="_blank" rel="noopener noreferrer">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Ver catálogo completo
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
} 