"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Reveal } from "@/components/shared/Reveal"

const testimonials = [
  {
    brand: "BookMyShow",
    text: "YOSN executed our ticketed live experience flawlessly. From artist coordination to on-ground production, the audience engagement exceeded expectations and delivered strong turnout.",
    person: "Regional Marketing Lead",
  },
  {
    brand: "Amazon Music",
    text: "Their team brought strategic clarity and high production value to our music showcase. The energy, branding integration, and audience management were executed at a global standard.",
    person: "Partnerships Manager",
  },
  {
    brand: "Kingfisher",
    text: "YOSN understands how to build experiential moments that feel authentic. Our brand activation blended seamlessly into the event environment and drove strong social traction.",
    person: "Brand Experience Head",
  },
  {
    brand: "Pee Safe",
    text: "We partnered with YOSN for a youth-focused activation, and their attention to detail ensured strong visibility and impactful engagement across demographics.",
    person: "Marketing Director",
  },
  {
    brand: "Bacardi",
    text: "The collaboration resulted in a high-energy, premium experience aligned with our brand positioning. YOSN handled execution with precision and creative excellence.",
    person: "Events & Culture Lead",
  },
  {
    brand: "Red Bull",
    text: "From artist curation to crowd management, YOSN delivered a performance-driven event that matched the intensity and spirit of our brand.",
    person: "Experiential Marketing Manager",
  },
]

export function Testimonials() {
  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">

        <Reveal>
          <h2 className="text-4xl font-bold mb-14 text-center">
            CLIENT COMMENTS
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:border-[#2AAFFB]/40 transition duration-300">
                <CardContent className="p-8 space-y-6">

                  {/* Quote Accent */}
                  <div className="text-[#2AAFFB] text-3xl font-bold leading-none">
                    “
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-white/80 text-sm leading-relaxed">
                    {item.text}
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-white/10" />

                  {/* Brand + Role */}
                  <div>
                    <p className="text-sm font-semibold">
                      {item.brand}
                    </p>
                    <p className="text-xs text-white/50">
                      {item.person}
                    </p>
                  </div>

                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}