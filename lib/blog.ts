import fs from "node:fs"
import path from "node:path"
import { Marked } from "marked"
import { highlight } from "sugar-high"

export const SITE_URL = "https://kaptaincs3.dev"
const POSTS_DIR = path.join(process.cwd(), "content/blog")

export interface PostMeta {
  slug: string
  title: string
  date: string
  summary: string
  tags: string[]
  draft: boolean
  readingTime: number
}

export interface Post extends PostMeta {
  content: string
}

// Drafts are visible in `next dev` only, never in production builds.
const showDrafts = process.env.NODE_ENV !== "production"

// Minimal frontmatter parser: `key: value`, quoted strings, `[a, b]` lists, booleans.
function parseFrontmatter(raw: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw)
  const data: Record<string, string | string[] | boolean> = {}
  if (!match) return { data, body: raw }
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(":")
    if (i === -1) continue
    const key = line.slice(0, i).trim()
    const value = line.slice(i + 1).trim()
    const unquote = (s: string) => s.trim().replace(/^["']|["']$/g, "")
    if (value.startsWith("[") && value.endsWith("]")) {
      data[key] = value.slice(1, -1).split(",").map(unquote).filter(Boolean)
    } else if (value === "true" || value === "false") {
      data[key] = value === "true"
    } else {
      data[key] = unquote(value)
    }
  }
  return { data, body: raw.slice(match[0].length) }
}

function readPost(file: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8")
  const { data, body } = parseFrontmatter(raw)
  const words = body.split(/\s+/).filter(Boolean).length
  return {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title ?? ""),
    date: String(data.date ?? ""),
    summary: String(data.summary ?? ""),
    tags: Array.isArray(data.tags) ? data.tags : [],
    draft: data.draft === true,
    readingTime: Math.max(1, Math.round(words / 200)),
    content: body,
  }
}

/** Published posts (plus drafts in dev), newest first. */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readPost)
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPostMetas(): PostMeta[] {
  return getAllPosts().map((post) => {
    const meta: PostMeta & { content?: string } = { ...post }
    delete meta.content
    return meta
  })
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug)
}

const marked = new Marked({
  renderer: {
    code({ text, lang }) {
      const cls = lang ? ` class="language-${lang.replace(/[^\w-]/g, "")}"` : ""
      return `<pre><code${cls}>${highlight(text)}</code></pre>\n`
    },
  },
})

/** Markdown comes from files in this repo, so the HTML is trusted. */
export function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false })
}
