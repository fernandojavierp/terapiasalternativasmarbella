"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Sparkles, Heart, Star } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Definición de tipos para las props de las flechas
interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function FarmasiPage() {
  // Configuración del Slider con estilos personalizados para las flechas
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  // Componente para la flecha siguiente personalizada
  function SampleNextArrow(props: ArrowProps) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, 
          display: "block", 
          color: "black", 
          fontSize: "24px",
          top: "40%",
          right: "25px",
          zIndex: 1
        }}
        onClick={onClick}
      />
    );
  }

  // Componente para la flecha anterior personalizada
  function SamplePrevArrow(props: ArrowProps) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, 
          display: "block", 
          color: "black", 
          fontSize: "24px",
          top: "40%",
          left: "25px",
          zIndex: 1
        }}
        onClick={onClick}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Descubre la Belleza Natural con Farmasi
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Productos de belleza de alta calidad a precios accesibles. 
                Descubre nuestra exclusiva selección de cosméticos y cuidado personal.
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <a href="https://www.farmasi.es/inesuria" target="_blank" rel="noopener noreferrer">
                  Ver Catálogo Completo
                </a>
              </Button>
            </div>
            <div className="lg:w-1/2">
              <Image
                src="/farmasi-hero.webp"
                alt="Farmasi Beauty Products"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Slider Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Productos Destacados</h2>
          <div className="max-w-3xl mx-auto">
            <Slider {...settings}>
              {/* Imagen 1 */}
              <div className="px-2">
                <Image
                  src="/farmasi-product-1.webp"
                  alt="Producto Farmasi 1"
                  className="w-full h-auto md:h-auto object-cover rounded-lg"
                  width={500}
                  height={500}
                />
              </div>

              {/* Imagen 2 */}
              <div className="px-2">
                <Image
                  src="/farmasi-product-2.webp"
                  alt="Producto Farmasi 2"
                  className="w-full h-auto md:h-auto object-cover rounded-lg"
                  width={500}
                  height={500}
                />
              </div>

              {/* Imagen 3 */}
              <div className="px-2">
                <Image
                  src="/farmasi-product-3.webp"
                  alt="Producto Farmasi 3"
                  className="w-full h-auto md:h-auto object-cover rounded-lg"
                  width={500}
                  height={500}
                />
              </div>

              {/* Imagen 4 */}
              <div className="px-2">
                <Image
                  src="/farmasi-product-4.webp"
                  alt="Producto Farmasi 4"
                  className="w-full h-auto md:h-auto object-cover rounded-lg"
                  width={500}
                  height={500}
                />
              </div>

              {/* Imagen 5 */}
              <div className="px-2">
                <Image
                  src="/farmasi-product-5.webp"
                  alt="Producto Farmasi 5"
                  className="w-full h-auto md:h-auto object-cover rounded-lg"
                  width={500}
                  height={500}
                />
              </div>

              {/* Imagen 6 */}
              <div className="px-2">
                <Image
                  src="/farmasi-product-6.webp"
                  alt="Producto Farmasi 6"
                  className="w-full h-auto md:h-auto object-cover rounded-lg"
                  width={500}
                  height={500}
                />
              </div>
            </Slider>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <Sparkles className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Calidad Premium</h3>
              <p className="text-muted-foreground">
                Productos de alta calidad formulados con ingredientes naturales
              </p>
            </div>
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <Heart className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Cuidado Personal</h3>
              <p className="text-muted-foreground">
                Amplia gama de productos para el cuidado de la piel y el cuerpo
              </p>
            </div>
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <Star className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Precios Accesibles</h3>
              <p className="text-muted-foreground">
                Excelente relación calidad-precio en todos nuestros productos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Categorías Destacadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Cuidado Facial</h3>
              <p className="text-muted-foreground mb-4">
                Descubre nuestra línea de productos para el cuidado facial
              </p>
              <Button asChild variant="outline">
                <a href="https://www.farmasi.es/inesuria/product-list/cuidado-de-piel?cid=5aecb19a-63d3-eb11-a315-005056010963" target="_blank" rel="noopener noreferrer">
                  Explorar
                </a>
              </Button>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Maquillaje</h3>
              <p className="text-muted-foreground mb-4">
                Productos de maquillaje de alta calidad y larga duración
              </p>
              <Button asChild variant="outline">
                <a href="https://www.farmasi.es/inesuria/product-list/maquillaje?cid=2bf65b5e-60d3-eb11-a315-005056010963" target="_blank" rel="noopener noreferrer">
                  Explorar
                </a>
              </Button>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Cuidado Corporal</h3>
              <p className="text-muted-foreground mb-4">
                Productos para el cuidado y bienestar de tu cuerpo
              </p>
              <Button asChild variant="outline">
                <a href="https://www.farmasi.es/inesuria/product-list/ba%C3%B1o-y-cuidado-corporal?cid=5abd0786-9f61-ed11-83af-000d3a71539d" target="_blank" rel="noopener noreferrer">
                  Explorar
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Lista para descubrir tu belleza natural?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explora nuestro catálogo completo de productos Farmasi y encuentra los productos perfectos para ti.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <a href="https://www.farmasi.es/inesuria" target="_blank" rel="noopener noreferrer">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Ver Catálogo Completo
            </a>
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Tienes alguna pregunta?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Estamos aquí para ayudarte con cualquier consulta sobre nuestros productos
          </p>
          <Button asChild variant="outline">
            <Link href="/contacto">
              Contactar
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
} 