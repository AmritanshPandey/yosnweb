"use client"

import { useAdminAuth } from "@/hooks/useAdminAuth"
import { AdminNav } from "./AdminNav"

export function AdminShell({ children }: { children: React.ReactNode }) {
  const auth = useAdminAuth()

  if (auth.status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-cyan-300" />
          <p className="text-xs uppercase tracking-[0.25em] text-white/35">Authenticating</p>
        </div>
      </div>
    )
  }

  if (auth.status === "unauthenticated") {
    return null
  }

  return (
    <>
      <AdminNav />
      <main className="min-h-screen bg-black pt-16 sm:pt-20 md:pl-56">
        <div className="mx-auto max-w-6xl p-5 sm:p-8">
          {children}
        </div>
      </main>
    </>
  )
}
