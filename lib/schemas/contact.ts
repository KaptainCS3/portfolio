import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  service: z.string().min(1, "Please select a service"),
  customSubject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
}).refine(
  (data) => data.service !== "other" || (data.customSubject && data.customSubject.length >= 3),
  { message: "Please describe your subject", path: ["customSubject"] },
)

export type FormValues = z.infer<typeof contactSchema>

export interface ServiceOption {
  value: string
  label: string
}

export const SERVICE_OPTIONS: ServiceOption[] = [
  { value: "web-development", label: "Web Development" },
  { value: "mobile-development", label: "Mobile App Development" },
  { value: "freelance-project", label: "Freelance Project" },
  { value: "collaboration", label: "Collaboration" },
  { value: "job-opportunity", label: "Job Opportunity" },
  { value: "other", label: "Other" },
]

export const SERVICE_LABELS: Record<string, string> = Object.fromEntries(
  SERVICE_OPTIONS.map((opt) => [opt.value, opt.label]),
)

export function getSubject(service: string, customSubject?: string): string {
  if (service === "other" && customSubject) return customSubject
  const label = SERVICE_LABELS[service] || service
  return `${label} Inquiry`
}

// One bare addr-spec: no whitespace (so no CR/LF), no display name, comment, group or second address.
const SINGLE_ADDRESS = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+$/

/**
 * The visitor's email as a Reply-To mailbox object, so nodemailer never runs it through its
 * address parser. Returns null for anything that isn't exactly one plain address.
 */
export function toReplyTo(email: string): { name: string; address: string } | null {
  if (!SINGLE_ADDRESS.test(email)) return null
  const at = email.lastIndexOf("@")
  return { name: "", address: `${email.slice(0, at)}@${email.slice(at + 1).toLowerCase()}` }
}
