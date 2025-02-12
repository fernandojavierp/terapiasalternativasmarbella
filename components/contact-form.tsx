"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { sendEmail } from "@/app/actions"

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("loading")

    const formData = new FormData(event.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    }

    const result = await sendEmail(data)
    setStatus(result.success ? "success" : "error")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div>
        <Input name="name" placeholder="Your Name" required className="w-full bg-background text-foreground" />
      </div>
      <div>
        <Input
          name="email"
          type="email"
          placeholder="Your Email"
          required
          className="w-full bg-background text-foreground"
        />
      </div>
      <div>
        <Textarea
          name="message"
          placeholder="Your Message"
          required
          className="w-full min-h-[150px] bg-background text-foreground"
        />
      </div>
      <Button type="submit" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send Message"}
      </Button>
      {status === "success" && <p className="text-green-600 text-center">Message sent successfully!</p>}
      {status === "error" && <p className="text-red-600 text-center">Failed to send message. Please try again.</p>}
    </form>
  )
}

