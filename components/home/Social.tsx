"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Reveal } from "@/components/shared/Reveal"

export function Social() {
  return (
    <section className="py-16 bg-black border-t border-white/10 text-white sm:py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <Reveal>
          <h2 className="font-display text-4xl uppercase tracking-tight text-white mb-8 sm:text-5xl sm:mb-12 md:text-7xl">
            SOCIAL MEDIA POSTS
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-4">
          {[1,2,3,4].map((_, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <Card className="bg-[#080808] border-white/10 hover:scale-105 transition-all duration-300">
                <CardContent className="h-32 sm:h-40" />
              </Card>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}