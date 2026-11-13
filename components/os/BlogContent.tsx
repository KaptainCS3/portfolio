"use client"

import { useEffect, useState } from "react"
import { FiExternalLink } from "react-icons/fi"
import type { PostMeta } from "@/lib/blog"
import { PostList } from "@/components/blog/PostList"

export function BlogContent() {
  const [posts, setPosts] = useState<PostMeta[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch("/blog/posts.json")
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then(setPosts)
      .catch(() => setError(true))
  }, [])

  return (
    <div className="h-full flex flex-col font-mono text-sm bg-[#06090c] overflow-hidden">
      <div className="px-4 py-2 border-b border-[#1e3a4a]/30 bg-[#0d1117] flex items-center gap-2 text-[10px] text-[#4a6b7a] shrink-0">
        <span className="opacity-50">portfolio</span>
        <span>/</span>
        <span className="text-[#34d399]">blog</span>
        <a href="/blog" target="_blank" className="ml-auto flex items-center gap-1 hover:text-white">
          open in browser <FiExternalLink />
        </a>
      </div>
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-16 sm:pb-24 custom-scrollbar">
        {error && <p className="text-xs text-red-400">{"// Couldn't load posts."}</p>}
        {!posts && !error && <p className="text-xs text-[#4a6b7a] animate-pulse">Loading posts…</p>}
        {posts && <PostList posts={posts} target="_blank" />}
      </div>
    </div>
  )
}
