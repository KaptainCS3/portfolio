import type { Metadata } from "next"
import { getPostMetas } from "@/lib/blog"
import { PostList } from "@/components/blog/PostList"

const description = "Release notes, write-ups and lessons from what I build."

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/blog/rss.xml" },
  },
  openGraph: { title: "Blog", description, url: "/blog" },
  twitter: { title: "Blog", description },
}

export default function BlogPage() {
  return (
    <>
      <section className="mb-8 space-y-1">
        <p className="text-xs text-[#4a6b7a]">{"// ~/blog — newest first"}</p>
        <h1 className="text-xl font-bold uppercase tracking-tight text-white">Blog</h1>
        <p className="text-xs text-[#94a3b8]">{description}</p>
      </section>
      <PostList posts={getPostMetas()} />
    </>
  )
}
