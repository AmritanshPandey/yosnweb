import type { Metadata } from "next"
import Link from "next/link"
import { IconChevronLeft } from "@tabler/icons-react"
import { ArtistForm } from "@/components/admin/artists/ArtistForm"

export const metadata: Metadata = { title: "New Artist" }

export default function NewArtistPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/artists"
          className="mb-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-white/40 transition-colors hover:text-white/70"
        >
          <IconChevronLeft size={14} />
          Back to Artists
        </Link>
        <h1 className="font-display text-5xl uppercase tracking-tight text-white">New Artist</h1>
        <p className="body-fun mt-1">Add a new artist profile to the platform.</p>
      </div>

      <ArtistForm />
    </div>
  )
}
