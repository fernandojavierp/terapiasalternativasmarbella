// src/components/Footer.js
import { Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background text-foreground py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Columna 1: Información general */}
          <div>
            <h3 className="text-xl font-bold font-playfair mb-4">Terapias Alternativas Marbella</h3>
            <p className="text-muted-foreground">
              Transformando vidas a través de terapias holísticas y coaching personalizado.
            </p>
          </div>

          {/* Columna 2: Contacto */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <p className="text-muted-foreground">
              Email:{" "}
              <a
                href="mailto:ines.tpmarbella@gmail.com"
                className="text-primary hover:underline transition-colors"
              >
                ines.tpmarbella@gmail.com
              </a>
            </p>
            <p className="text-muted-foreground">
              Tel:{" "}
              <a
                href="https://wa.me/34628595929"
                className="text-primary hover:underline transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                +34 628-59-59-29
              </a>
            </p>
            <p className="text-muted-foreground">Marbella, España</p>
          </div>

          {/* Columna 3: Redes sociales */}
          <div>
            <h3 className="text-xl font-bold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/terapiasalternativasmarbella"
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://facebook.com/terapiasalternativasmarbella"
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
             >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Derechos de autor */}
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Terapias Alternativas Marbella. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}