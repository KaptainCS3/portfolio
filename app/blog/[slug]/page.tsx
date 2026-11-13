import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllPosts, getPost, renderMarkdown } from "@/lib/blog"
import { PostInfo } from "@/components/blog/PostInfo"

type Props = { params: Promise<{ slug: string }> }

// Only posts that exist at build time; drafts are left out of production builds.
export const dynamicParams = false

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug)
  if (!post) return {}
  const url = `/blog/${post.slug}`
  return {
    title: post.title,
    description: post.summary,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.summary },
    robots: post.draft ? { index: false, follow: false } : undefined,
  }
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug)
  if (!post) notFound()

  return (
    <article>
      <header className="mb-8 space-y-3 border-b border-[#1e3a4a]/30 pb-6">
        <PostInfo post={post} />
        <h1 className="text-2xl font-bold leading-tight text-white">{post.title}</h1>
        <p className="flex flex-wrap gap-2 text-[11px] text-[#34d399]/80">
          {post.tags.map((t) => (
            <span key={t}>#{t}</span>
          ))}
        </p>
      </header>
      <div className="blog-prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
      <footer className="mt-12 border-t border-[#1e3a4a]/30 pt-6 text-xs">
        <Link href="/blog" className="text-[#34d399] hover:underline">← all posts</Link>
      </footer>
    </article>
  )
}
