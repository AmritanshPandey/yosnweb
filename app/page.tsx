import { Hero } from "@/components/home/Hero"
import { WeAre } from "@/components/home/WeAre"
import { ManagedLocations } from "@/components/home/ManagedLocations"
import { ArtistsPreview } from "@/components/home/Artists"
import { PastEvents } from "@/components/home/PastEvents"
import { Clients } from "@/components/home/Clients"
import { Footer } from "@/components/shared/Footer"

export default function Home() {
  return (
    <main className="relative overflow-x-hidden bg-black text-white page-fun">
      <div className="pointer-events-none absolute left-[-120px] top-[18%] h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="pointer-events-none absolute right-[-130px] top-[48%] h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
      <Hero />
      <WeAre />
      <ManagedLocations />
      <ArtistsPreview />
      <PastEvents />
      <Clients />
      <Footer />
    </main>
  )
}
