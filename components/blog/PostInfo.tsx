import type { PostMeta } from "@/lib/blog"

export function formatDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })
}

/** Date · reading time · draft badge — shared by the list, the post page and the desktop window. */
export function PostInfo({ post }: { post: PostMeta }) {
  return (
    <p className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-widest text-[#4a6b7a]">
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span>·</span>
      <span>{post.readingTime} min read</span>
      {post.draft && (
        <span className="rounded border border-amber-400/40 px-1.5 text-amber-300">draft</span>
      )}
    </p>
  )
}
