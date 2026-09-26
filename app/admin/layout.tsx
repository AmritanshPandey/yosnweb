import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Admin — YOSN CMS",
    template: "%s — YOSN Admin",
  },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children
}
