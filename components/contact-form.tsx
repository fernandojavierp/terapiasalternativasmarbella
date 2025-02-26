"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("loading")
    setErrorMessage(null)

    const formData = new FormData(event.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    }

    // Validar que los campos no estén vacíos
    if (!data.name || !data.email || !data.message) {
      setStatus("error")
      setErrorMessage("Todos los campos son obligatorios.")
      return
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      // Verificar si la respuesta es JSON
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("La respuesta no es JSON.")
      }

      const result = await response.json()

      if (result.success) {
        setStatus("success")
      } else {
        setStatus("error")
        setErrorMessage(result.error || "Ha habido un error. Por favor, inténtalo de nuevo.")
      }
    } catch (error) {
      console.error("Error en handleSubmit:", error)
      setStatus("error")
      setErrorMessage("Ha habido un error. Por favor, inténtalo de nuevo.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div>
        <Input
          name="name"
          placeholder="Tu nombre"
          required
          className="w-full bg-background text-foreground"
          disabled={status === "loading"}
        />
      </div>
      <div>
        <Input
          name="email"
          type="email"
          placeholder="Tu Correo"
          required
          className="w-full bg-background text-foreground"
          disabled={status === "loading"}
        />
      </div>
      <div>
        <Textarea
          name="message"
          placeholder="Tu mensaje"
          required
          className="w-full min-h-[150px] bg-background text-foreground"
          disabled={status === "loading"}
        />
      </div>
      <Button type="submit" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? "Enviando..." : "Enviar Mensaje"}
      </Button>
      {status === "success" && (
        <p className="text-green-600 text-center">Mensaje enviado correctamente.</p>
      )}
      {status === "error" && (
        <p className="text-red-600 text-center">{errorMessage}</p>
      )}
    </form>
  )
}