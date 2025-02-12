import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-300 to-purple-300">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex justify-end items-center gap-8">
        <Link href="#" className="text-gray-800 hover:text-gray-600">
          Anatheoresis
        </Link>
        <Link href="#" className="text-gray-800 hover:text-gray-600">
          Kiniseología
        </Link>
        <Link href="#" className="text-gray-800 hover:text-gray-600">
          Coach
        </Link>
        <Link href="#" className="text-gray-800 hover:text-gray-600">
          Centro de terapias
        </Link>
        <Button className="bg-white text-black hover:bg-gray-100">Get A Quote</Button>
      </nav>

      {/* Hero Content */}
      <div className="container mx-auto px-4 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-gray-800 leading-tight">
              Terapias
              <br />
              Alternativas
              <br />
              Marbella
            </h1>
            <h2 className="text-xl text-gray-700">Coach, inteligencia emocional, Kinesiología holística</h2>
            <p className="text-gray-600 max-w-lg">
              Soy Ines Uria, llevo más de 30 años trabajando junta a personas como tú para ayudarles en su progresión
              laboral.
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-orange-400 rounded-full transform scale-90 translate-x-4 translate-y-4" />
            <Image
              src={`https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ABHfn5WawctxKnndwtE4GIU0AxsntN.png`}
              alt="Ines Uria"
              width={600}
              height={600}
              className="relative z-10"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}

