"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Reveal } from "@/components/shared/Reveal"

export function Testimonials() {
  return (
    <section className="py-28 bg-black border-t border-white/10 text-white">
      <div className="container mx-auto px-6">

        <Reveal>
          <h2 className="text-4xl font-bold mb-12">
            CLIENT COMMENTS
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {[1,2,3].map((_, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6 space-y-4">
                  <p className="text-white/70 text-sm">
                    “YOSN delivered an unforgettable experience.”
                  </p>
                  <p className="text-sm font-semibold">— Client Name</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}