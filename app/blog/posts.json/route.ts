import { getPostMetas } from "@/lib/blog"

// Post list for the desktop "Blog" window (the OS shell is client-only and can't read files).
export const dynamic = "force-static"

export function GET() {
  return Response.json(getPostMetas())
}
