import { Hero } from "@/components/home/Hero"
import { HomeSections } from "@/components/home/HomeSections"

export default function Home() {
  return (
    <main className="relative overflow-x-hidden bg-black text-white page-fun">
      {/*
        Rendered server-side (not via a client effect) so the browser's preload
        scanner picks these up immediately, before any JS runs. The hero video
        itself is intentionally not preloaded here: <video preload="auto"> in
        Hero.tsx already fetches whichever single source (webm or mp4) the
        browser actually needs — preloading both formats via <link> would have
        downloaded the full video twice and starved these real first-paint
        assets of bandwidth.
      */}
      <link rel="preload" href="/assets/banners/banner.png" as="image" fetchPriority="high" />
      <link rel="preload" href="/assets/logos/logo.png" as="image" fetchPriority="high" />
      <link rel="preload" href="/assets/banners/new1.jpeg" as="image" fetchPriority="high" />
      <div className="pointer-events-none absolute left-[-120px] top-[18%] h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="pointer-events-none absolute right-[-130px] top-[48%] h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
      <Hero />
      <HomeSections />
    </main>
  )
}
