import type { Metadata } from "next"

// The page itself is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming YOSN shows and tours, plus the nights we've produced — book tickets for concerts, comedy and live experiences.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
