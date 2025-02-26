import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    // Validar que los campos no estén vacíos
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Todos los campos son obligatorios." },
        { status: 400 }
      )
    }

    // Enviar el correo electrónico
    await resend.emails.send({
      from: process.env.EMAIL_USER!,
      to: process.env.EMAIL_USER!,
      subject: `Nuevo mensaje de ${name}`,
      text: `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error en la API Route:", error)
    return NextResponse.json(
      { success: false, error: "Error al enviar el correo." },
      { status: 500 }
    )
  }
}