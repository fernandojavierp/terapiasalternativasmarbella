// src/components/Footer.js
import { Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background text-foreground py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Columna 1: Información general */}
          <div>
            <h3 className="text-xl font-bold mb-4">Terapias Alternativas Marbella</h3>
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
            <p className="text-muted-foreground">
              Dirección: <a
                href="https://www.google.es/maps/place/C.+Ramiro+Campos+Turmo,+4,+29602+Marbella,+M%C3%A1laga/@36.5091598,-4.8883642,17z/data=!3m1!4b1!4m6!3m5!1s0xd7327f8acaaaefb:0x87e4a077a7973c3e!8m2!3d36.5091598!4d-4.8883642!16s%2Fg%2F11c2dz7l_1?entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D"
                className="text-primary hover:underline transition-colors"
                target="_blank"
                rel="noopener noreferrer" 
              >Calle Ramiro Campos Turmo, local 4, Marbella</a>
            </p>
            

            
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
                href="https://www.facebook.com/profile.php?id=100089596534661"
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