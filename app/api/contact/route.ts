import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { render } from "@react-email/components"
import { createElement } from "react"
import { ContactEmail } from "@/components/emails/ContactEmail"
import { contactSchema, getSubject, toReplyTo } from "@/lib/schemas/contact"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors
      return NextResponse.json({ errors: fieldErrors }, { status: 400 })
    }

    const { name, email, service, customSubject, message } = parsed.data
    const replyTo = toReplyTo(email)
    if (!replyTo) {
      return NextResponse.json({ errors: { email: ["Please enter a valid email"] } }, { status: 400 })
    }
    const subject = getSubject(service, customSubject)

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT!),
      secure: Number(process.env.SMTP_PORT!) === 465,
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
      // The message is an inline html string; never let nodemailer read files or fetch URLs.
      disableFileAccess: true,
      disableUrlAccess: true,
    })

    const html = await render(
      createElement(ContactEmail, {
        name,
        email,
        service,
        subject,
        message,
      }),
    )

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER!}>`,
      to: process.env.CONTACT_EMAIL!,
      replyTo,
      subject: `[Portfolio] ${subject}`,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact email error:", error)
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 },
    )
  }
}
