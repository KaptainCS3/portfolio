"use client"

import Link from "next/link"
import { useState } from "react"
import type { PostMeta } from "@/lib/blog"
import { PostInfo } from "./PostInfo"

interface PostListProps {
  posts: PostMeta[]
  /** "_blank" when rendered inside the desktop window. */
  target?: "_blank"
}

export function PostList({ posts, target }: PostListProps) {
  const [tag, setTag] = useState<string | null>(null)
  const tags = [...new Set(posts.flatMap((p) => p.tags))].sort()
  const shown = tag ? posts.filter((p) => p.tags.includes(tag)) : posts

  if (posts.length === 0) {
    return <p className="text-xs text-[#4a6b7a]">{"// No posts yet."}</p>
  }

  const chip = (active: boolean) =>
    `rounded-md border px-2 py-0.5 text-[10px] transition-colors ${
      active
        ? "border-[#34d399]/60 bg-[#34d399]/10 text-[#34d399]"
        : "border-[#1e3a4a]/50 text-[#4a6b7a] hover:text-white"
    }`

  return (
    <div className="space-y-6">
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2" aria-label="Filter by tag">
          <button type="button" className={chip(tag === null)} onClick={() => setTag(null)}>
            all
          </button>
          {tags.map((t) => (
            <button key={t} type="button" className={chip(tag === t)} onClick={() => setTag(t)}>
              #{t}
            </button>
          ))}
        </div>
      )}

      <ul className="space-y-4">
        {shown.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              target={target}
              className="block rounded-xl border border-[#1e3a4a]/30 bg-[#0d1117]/50 p-4 transition-colors hover:border-[#34d399]/40"
            >
              <PostInfo post={post} />
              <h2 className="mt-2 text-base font-bold text-white">{post.title}</h2>
              <p className="mt-1 text-xs leading-relaxed text-[#94a3b8]">{post.summary}</p>
              <p className="mt-3 flex flex-wrap gap-2 text-[10px] text-[#34d399]/80">
                {post.tags.map((t) => (
                  <span key={t}>#{t}</span>
                ))}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
