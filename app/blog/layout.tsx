import Link from "next/link"
import "./blog.css"

// The root <body> is overflow-hidden for the desktop UI, so the blog scrolls in its own container.
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-y-auto bg-[#06090c] font-mono text-[#e2e8f0]">
      <header className="sticky top-0 z-10 border-b border-[#1e3a4a]/30 bg-[#0d1117]/90 backdrop-blur">
        <nav className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-2 text-[11px] text-[#4a6b7a]">
          <Link href="/" className="hover:text-white">portfolio</Link>
          <span>/</span>
          <Link href="/blog" className="text-[#34d399]">blog</Link>
          <a href="/blog/rss.xml" className="ml-auto hover:text-white">rss</a>
        </nav>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-10">{children}</main>
    </div>
  )
}
