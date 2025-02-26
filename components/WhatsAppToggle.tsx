"use client"

import Link from "next/link"
import { MessageCircle } from "lucide-react"

export function WhatsAppToggle() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href="https://wa.me/34628595929" // Reemplaza con tu número
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center"
      >
        <MessageCircle className="w-6 h-6" />
      </Link>
    </div>
  )
}