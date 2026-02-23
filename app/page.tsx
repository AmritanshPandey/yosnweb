import { Hero } from "@/components/home/Hero"
import { WeAre } from "@/components/home/WeAre"
import { Stats } from "@/components/home/Stats"
import { Biz } from "@/components/home/Biz"
import { Social } from "@/components/home/Social"
import { Artists } from "@/components/home/Artists"
import { Testimonials } from "@/components/home/Testimonials"
import { PastEvents } from "@/components/home/PastEvents"
import { Clients } from "@/components/home/Clients"
import { Footer } from "@/components/shared/Footer"

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Hero />
      <WeAre />
      <Stats />
      <Biz />
      <Social />
      <Artists />
      <Testimonials />
      <PastEvents />
      <Clients />
      <Footer />
    </main>
  )
}