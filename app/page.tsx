import { Hero } from "@/components/home/Hero"
import { WeAre } from "@/components/home/WeAre"
import { ArtistsPreview } from "@/components/home/Artists"
import { PastEvents } from "@/components/home/PastEvents"
import { Clients } from "@/components/home/Clients"
import { Footer } from "@/components/shared/Footer"

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Hero />
      <WeAre />
     <ArtistsPreview />
      <PastEvents />
      <Clients />
      <Footer />
    </main>
  )
}