import { SITE_URL, getPostMetas } from "@/lib/blog"

export const dynamic = "force-static"

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

export function GET() {
  const items = getPostMetas()
    .map((p) => {
      const url = `${SITE_URL}/blog/${p.slug}`
      return `    <item>
      <title>${escape(p.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escape(p.summary)}</description>
${p.tags.map((t) => `      <category>${escape(t)}</category>`).join("\n")}
    </item>`
    })
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>KaptainCS3 Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Release notes, write-ups and lessons from what I build.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } })
}
