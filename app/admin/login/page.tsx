"use client"

import { useState, useEffect } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/navigation"
import { getClientAuth } from "@/lib/firebase/client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { IconLoader2 } from "@tabler/icons-react"
import Image from "next/image"
import { toast } from "sonner"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const auth = getClientAuth()
    if (auth.currentUser) {
      router.replace("/admin")
    }
  }, [router])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) return

    setLoading(true)
    try {
      await signInWithEmailAndPassword(getClientAuth(), email, password)
      router.replace("/admin")
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code
      if (code === "auth/invalid-credential" || code === "auth/user-not-found") {
        toast.error("Invalid email or password.")
      } else {
        toast.error("Login failed. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div
        className="w-full max-w-sm space-y-8"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(49,212,255,0.08), transparent 55%), radial-gradient(circle at 70% 80%, rgba(255,79,216,0.07), transparent 55%)",
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/assets/logos/logo.png"
            alt="YOSN"
            width={96}
            height={48}
            className="h-10 w-auto"
          />
          <div className="text-center">
            <h1 className="font-display text-3xl uppercase tracking-tight text-white">
              Admin Login
            </h1>
            <p className="mt-1 text-xs text-white/35">Authorized access only</p>
          </div>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-4 rounded-2xl border border-white/10 bg-white/3 p-6"
        >
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@yosn.com"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <IconLoader2 size={16} className="animate-spin" />
                Signing In…
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
