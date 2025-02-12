import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-foreground">
          Terapias Alternativas
        </Link>
        <div className="flex items-center gap-8">
          <Link href="#services" className="text-muted-foreground hover:text-foreground">
            Anatheoresis
          </Link>
          <Link href="#services" className="text-muted-foreground hover:text-foreground">
            Kiniseología
          </Link>
          <Link href="#benefits" className="text-muted-foreground hover:text-foreground">
            Coach
          </Link>
          <Link href="#contact" className="text-muted-foreground hover:text-foreground">
            Centro de terapias
          </Link>
          <Button asChild>
            <Link href="#contact">Get A Quote</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}

