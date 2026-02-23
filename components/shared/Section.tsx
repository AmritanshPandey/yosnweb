import { ReactNode } from "react"

interface SectionProps {
  children: ReactNode
  className?: string
}

export function Section({ children, className }: SectionProps) {
  return (
    <section className={`relative py-20 ${className}`}>
      <div className="container mx-auto px-6">
        {children}
      </div>
    </section>
  )
}