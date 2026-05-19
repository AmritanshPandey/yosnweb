import type { Metadata } from "next"
import { Toaster } from "sonner"

export const metadata: Metadata = {
  title: {
    default: "Admin — YOSN CMS",
    template: "%s — YOSN Admin",
  },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "#0d0d0d",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff",
          },
        }}
      />
    </>
  )
}
