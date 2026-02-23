"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Reveal } from "@/components/shared/Reveal"

export function Artists() {
  return (
    <section className="py-28 bg-black border-t border-white/10 text-white">
      <div className="container mx-auto px-6">

        <Reveal>
          <h2 className="text-4xl font-bold mb-12">
            ARTISTS
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {[1,2,3].map((_, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <Card className="bg-white/5 border-white/10 hover:scale-[1.03] transition duration-300">
                <CardContent className="h-64 flex items-end p-6">
                  <p className="text-lg font-semibold">Artist Name</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}