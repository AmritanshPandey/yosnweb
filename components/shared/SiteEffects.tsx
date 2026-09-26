"use client"

import { usePathname } from "next/navigation"
import { SmoothScroll } from "./SmoothScroll"
import { GrainOverlay } from "./GrainOverlay"
import { CustomCursor } from "./CustomCursor"

// Decorative effects for the public site only — the admin CMS doesn't need
// them, and Lenis smooth scrolling fights the forms' scroll-to-error behavior.
export function SiteEffects() {
  const pathname = usePathname()
  if (pathname.startsWith("/admin")) return null

  return (
    <>
      <SmoothScroll />
      <GrainOverlay />
      <CustomCursor />
    </>
  )
}
