"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export default function FarmasiPage() {
  
  const products = [
    {
      src: "/aloe-glow-mandarina.webp",
      alt: "Aloe Glow Mandarina",
      link: "https://www.farmasi.es/inesuria/product-detail/aloe-glow-mandarina?pid=1002303",
      benefits: [
        "Hidratación intensa",
        "Brillo natural",
        "Con extracto de mandarina",
        "Textura ligera"
      ]
    },
    {
      src: "/crema-balsam-tea-tree.webp",
      alt: "Crema Balsam Tea Tree",
      link: "https://www.farmasi.es/inesuria/product-detail/set-tea-tree?pid=PK95649",
      benefits: [
        "Propiedades antibacterianas",
        "Calma irritaciones",
        "Ideal para pieles con acné",
        "Contiene aceite de árbol de té"
      ]
    },
    {
      src: "/crema-hidratante-2.webp",
      alt: "Crema Hidratante",
      link: "https://www.farmasi.es/inesuria/product-detail/dr-c-tuna-calendula-balsamo-crema?pid=1000286",
      benefits: [
        "Hidratación 24 horas",
        "Nutrición profunda",
        "Para todo tipo de pieles",
        "Fórmula no comedogénica"
      ]
    },
    {
      src: "/vitamin-c.webp",
      alt: "Vitamina C",
      link: "https://www.farmasi.es/inesuria/product-detail/vitamina-c?pid=1000405",
      benefits: [
        "Antioxidante potente",
        "Unifica el tono de piel",
        "Reduce signos de edad",
        "Protege contra radicales libres"
      ]
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
            <a href="https://www.farmasi.es/inesuria/product-detail/dr-c-tuna-cleansing-balm?pid=1000649" target="_blank" rel="noopener noreferrer">
            <Image
              src="/farmasi-portada.webp"
              alt="Farmasi Beauty Products"
              width={600}
              height={600}
              quality={100}
              className=""
              priority
            />
            </a>
          </div>
        </div>
      </section>

   {/* Benefits Section */}
   <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Beneficios de los productos Farmasi</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre los increíbles beneficios de nuestros geles terapéuticos, 
              formulados con ingredientes naturales para tu bienestar.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Gel Paprika */}
            <div className="group">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src="/gel-paprika.jpg"
                    alt="Gel Paprika"
                    width={600}
                    height={600}
                    quality={100}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">Gel Paprika</h3>
                  <p className="text-muted-foreground mb-6">
                    Gel terapéutico con extracto de paprika que proporciona alivio 
                    y relajación muscular mediante su efecto calor.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mt-1 mr-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">Efecto calor relajante</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mt-1 mr-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">Alivio muscular natural</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mt-1 mr-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">Mejora la circulación</span>
                    </li>
                  </ul>
                  <Button 
                    asChild 
                    className="mt-6 w-full"
                    variant="outline"
                  >
                    <a 
                      href="https://www.farmasi.es/inesuria/product-detail/gel-de-masaje-balsamo-de-pimenton-y-chile?pid=1000305" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Ver producto
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Gel Pferde */}
            <div className="group">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src="/gel-pferde.jpg"
                    alt="Gel Pferde Castaño de Indias"
                    width={600}
                    height={600}
                    quality={100}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">Gel Pferde Castaño de Indias</h3>
                  <p className="text-muted-foreground mb-6">
                    Gel refrescante con extracto de castaño de indias que ayuda 
                    a aliviar la sensación de piernas cansadas.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mt-1 mr-3 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">Efecto refrescante</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mt-1 mr-3 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">Alivia piernas cansadas</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mt-1 mr-3 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">Ingredientes naturales</span>
                    </li>
                  </ul>
                  <Button 
                    asChild 
                    className="mt-6 w-full"
                    variant="outline"
                  >
                    <a 
                      href="https://www.farmasi.es/inesuria/product-detail/gel-de-masaje-balsamo-de-castano-de-indias-pferde?pid=1000304" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Ver producto
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Benefits */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-6">¿Por qué elegir Farmasi?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold mb-2">Calidad Premium</h4>
                  <p className="text-sm text-muted-foreground">Productos formulados con los más altos estándares de calidad</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold mb-2">Ingredientes Naturales</h4>
                  <p className="text-sm text-muted-foreground">Fórmulas con extractos naturales cuidadosamente seleccionados</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold mb-2">Resultados Efectivos</h4>
                  <p className="text-sm text-muted-foreground">Productos probados que brindan resultados visibles</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Productos destacados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <a
                key={index}
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 block"
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={product.src}
                    alt={product.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    width={400}
                    height={400}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.alt}</h3>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-4 h-4 mt-1 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>



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