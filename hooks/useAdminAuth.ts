"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged, type User } from "firebase/auth"
import { useRouter } from "next/navigation"
import { getClientAuth } from "@/lib/firebase/client"

type AuthState =
  | { status: "loading" }
  | { status: "authenticated"; user: User }
  | { status: "unauthenticated" }

export function useAdminAuth(): AuthState {
  const [state, setState] = useState<AuthState>({ status: "loading" })
  const router = useRouter()

  useEffect(() => {
    const auth = getClientAuth()
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setState({ status: "authenticated", user })
      } else {
        setState({ status: "unauthenticated" })
        router.replace("/admin/login")
      }
    })
    return unsub
  }, [router])

  return state
}
