import type { Metadata } from "next"

// The page itself is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "About Us",
  description: "YOSN Innovations is a Mumbai-based live entertainment studio producing concerts, comedy tours and brand experiences.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
