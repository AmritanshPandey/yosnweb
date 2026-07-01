import { Hero } from "@/components/home/Hero"
import { HomeSections } from "@/components/home/HomeSections"
import { AssetPreloader } from "@/components/shared/AssetPreloader"

export default function Home() {
  const preloadAssets = [
    { href: "/assets/banners/banner.webm", as: "video" as const, type: "video/webm", fetchPriority: "high" as const },
    { href: "/assets/banners/banner.mp4", as: "video" as const, type: "video/mp4", fetchPriority: "high" as const },
    { href: "/assets/banners/banner.png", as: "image" as const, fetchPriority: "high" as const },
    { href: "/assets/logos/logo.png", as: "image" as const, fetchPriority: "high" as const },
    { href: "/assets/banners/new1.jpeg", as: "image" as const, fetchPriority: "high" as const },
  ]

  return (
    <main className="relative overflow-x-hidden bg-black text-white page-fun">
      <AssetPreloader assets={preloadAssets} />
      <div className="pointer-events-none absolute left-[-120px] top-[18%] h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="pointer-events-none absolute right-[-130px] top-[48%] h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
      <Hero />
      <HomeSections />
    </main>
  )
}
