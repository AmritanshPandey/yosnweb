import type { Metadata } from "next"

// The page itself is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Artists",
  description: "Musicians, comedians, storytellers and dance crews YOSN has brought to stages across India, the UK and Dubai.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
