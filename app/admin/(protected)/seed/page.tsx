"use client"

import { useState } from "react"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { getClientDb } from "@/lib/firebase/client"
import { Button } from "@/components/ui/button"
import { IconCheck, IconLoader2, IconAlertTriangle } from "@tabler/icons-react"

type Status = "idle" | "loading" | "done" | "error"

export default function SeedPage() {
  const [status, setStatus] = useState<Status>("idle")
  const [artistId, setArtistId] = useState("")
  const [eventId, setEventId] = useState("")
  const [error, setError] = useState("")

  async function handleSeed() {
    setStatus("loading")
    setError("")
    try {
      const db = getClientDb()

      // 1 — Create artist
      const artistRef = await addDoc(collection(db, "artists"), {
        name: "The Quick Style",
        slug: "the-quick-style",
        handle: "@thequickstyle",
        profileImage: "",
        bio: "With 20 years of legacy, two world championship titles, and viral videos that captivated billions online, Quick Style has grown into one of the most influential dance collectives in the world.",
        instagram: "https://www.instagram.com/thequickstyle/",
        youtube: "https://www.youtube.com/c/TheQuickStyle",
        spotify: "",
        verified: true,
        createdAt: serverTimestamp(),
      })

      // 2 — Create event linked to artist
      const eventRef = await addDoc(collection(db, "events"), {
        name: "Quick Style India Tour",
        slug: "quick-style-india-tour",
        featured: true,
        category: "tour",
        status: "on-sale",
        heroImage: "/assets/events/upcoming.avif",
        imageMeta: { width: 1200, height: 1500 },
        duration: "1 hour 30 minutes",
        genres: ["Bollywood", "Hip Hop"],
        ticketsFrom: "INR 999",
        artistId: artistRef.id,
        cities: [
          {
            name: "Delhi",
            date: "Fri, 23 Oct",
            ticketLink: "https://in.bookmyshow.com/events/quick-style-india-tour/ET00495699",
            soldOut: false,
          },
          {
            name: "Mumbai",
            date: "Sat, 24 Oct",
            ticketLink: "https://in.bookmyshow.com/events/quick-style-india-tour/ET00495699",
            soldOut: false,
          },
          {
            name: "Pune",
            date: "Sun, 25 Oct",
            ticketLink: "https://in.bookmyshow.com/events/quick-style-india-tour/ET00495699",
            soldOut: false,
          },
          {
            name: "Kolkata",
            date: "Fri, 30 Oct",
            ticketLink: "https://in.bookmyshow.com/events/quick-style-india-tour/ET00495699",
            soldOut: false,
          },
          {
            name: "Bengaluru",
            date: "Sat, 31 Oct",
            ticketLink: "https://in.bookmyshow.com/events/quick-style-india-tour/ET00495699",
            soldOut: false,
          },
          {
            name: "Hyderabad",
            date: "Sun, 01 Nov",
            ticketLink: "https://in.bookmyshow.com/events/quick-style-india-tour/ET00495699",
            soldOut: false,
          },
        ],
        createdAt: serverTimestamp(),
      })

      setArtistId(artistRef.id)
      setEventId(eventRef.id)
      setStatus("done")
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : "Unknown error")
      setStatus("error")
    }
  }

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <p className="eyebrow-fun">One-time setup</p>
        <h1 className="font-display text-5xl uppercase tracking-tight text-white">Seed Data</h1>
        <p className="body-fun mt-2">
          Creates the Quick Style artist and India Tour event in Firestore.
          Run this once, then delete this page.
        </p>
      </div>

      <div className="fun-card space-y-4 rounded-2xl p-6">
        <div className="space-y-2 text-sm text-white/60">
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
            Artist: The Quick Style (@thequickstyle)
          </p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
            Event: Quick Style India Tour (featured)
          </p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
            6 tour cities with BookMyShow links
          </p>
        </div>

        {status === "idle" && (
          <Button onClick={handleSeed} size="lg" className="w-full">
            Create Artist + Event
          </Button>
        )}

        {status === "loading" && (
          <Button disabled size="lg" className="w-full">
            <IconLoader2 size={16} className="animate-spin" />
            Creating…
          </Button>
        )}

        {status === "done" && (
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-xl border border-cyan-300/20 bg-cyan-300/6 p-4">
              <IconCheck size={18} className="mt-0.5 shrink-0 text-cyan-300" />
              <div className="space-y-1 text-sm">
                <p className="text-white">Records created successfully.</p>
                <p className="text-white/45 font-mono text-xs">Artist ID: {artistId}</p>
                <p className="text-white/45 font-mono text-xs">Event ID: {eventId}</p>
              </div>
            </div>
            <p className="text-xs text-amber-300/70">
              You can now delete this page. Visit{" "}
              <a href="/events" className="underline hover:text-amber-200">/events</a>{" "}
              to see the data live, or go to{" "}
              <a href="/admin/events" className="underline hover:text-amber-200">Admin → Events</a>{" "}
              to upload the hero image.
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/6 p-4">
              <IconAlertTriangle size={18} className="mt-0.5 shrink-0 text-red-400" />
              <div className="text-sm">
                <p className="text-white">Something went wrong.</p>
                <p className="mt-1 text-xs text-white/45">{error}</p>
              </div>
            </div>
            <Button onClick={handleSeed} size="lg" className="w-full">
              Retry
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
