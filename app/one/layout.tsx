import type { Metadata } from "next"

// The page itself is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "One Night",
  description: "One Night — a signature live entertainment experience curated by YOSN Innovations.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
