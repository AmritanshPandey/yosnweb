"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Reveal } from "@/components/shared/Reveal"

export function Social() {
  return (
    <section className="py-24 bg-black border-t border-white/10 text-white">
      <div className="container mx-auto px-6">

        <Reveal>
          <h2 className="text-4xl font-bold mb-12">
            SOCIAL MEDIA POSTS
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-4 gap-6">
          {[1,2,3,4].map((_, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <Card className="bg-white/5 border-white/10 hover:scale-105 transition duration-300">
                <CardContent className="h-40" />
              </Card>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}