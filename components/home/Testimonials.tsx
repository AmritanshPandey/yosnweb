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
    <section className="py-16 bg-black text-white border-t border-white/10 sm:py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <Reveal>
          <h2 className="font-display text-4xl uppercase tracking-tight text-white mb-10 text-center sm:text-5xl sm:mb-14 md:text-7xl">
            CLIENT COMMENTS
          </h2>
        </Reveal>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-3 sm:gap-8">
          {testimonials.map((item, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <Card className="bg-[#080808] border-white/10 hover:border-white/25 transition-all duration-300">
                <CardContent className="p-6 space-y-5 sm:p-8 sm:space-y-6">

                  {/* Quote Accent */}
                  <div className="font-display text-4xl leading-none text-white/30">
                    &ldquo;
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-sm leading-relaxed tracking-wide text-white/50">
                    {item.text}
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-white/10" />

                  {/* Brand + Role */}
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white font-medium">
                      {item.brand}
                    </p>
                    <p className="mt-1 text-xs tracking-wide text-white/40">
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