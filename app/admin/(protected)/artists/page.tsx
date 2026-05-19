"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"
import { IconPlus, IconEdit, IconTrash, IconBadge, IconSearch, IconMicrophone2 } from "@tabler/icons-react"
import { getAllArtists, deleteArtist } from "@/lib/firebase/artists"
import type { Artist } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

export default function AdminArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [deleteTarget, setDeleteTarget] = useState<Artist | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    getAllArtists()
      .then(setArtists)
      .catch(() => toast.error("Failed to load artists."))
      .finally(() => setLoading(false))
  }, [])

  async function handleDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await deleteArtist(deleteTarget.id)
      setArtists((prev) => prev.filter((a) => a.id !== deleteTarget.id))
      toast.success("Artist deleted.")
      setDeleteTarget(null)
    } catch {
      toast.error("Failed to delete artist.")
    } finally {
      setDeleting(false)
    }
  }

  const filtered = artists.filter(
    (a) =>
      !search ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.handle.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow-fun">Content</p>
          <h1 className="font-display text-5xl uppercase tracking-tight text-white">Artists</h1>
        </div>
        <Link href="/admin/artists/new">
          <Button size="md" className="gap-2">
            <IconPlus size={16} />
            New Artist
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search artists…"
          className="pl-8"
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-xl bg-white/5" />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-white/15 py-16 text-center">
          <IconMicrophone2 size={32} className="mx-auto text-white/20" />
          <p className="mt-3 text-sm text-white/40">
            {search ? "No artists match your search." : "No artists yet. Add the first one."}
          </p>
          {!search && (
            <Link href="/admin/artists/new" className="mt-4 inline-block">
              <Button size="sm" className="gap-2">
                <IconPlus size={14} />
                New Artist
              </Button>
            </Link>
          )}
        </div>
      )}

      {/* Artist list */}
      {!loading && filtered.length > 0 && (
        <div className="space-y-3">
          {filtered.map((artist) => (
            <div
              key={artist.id}
              className="fun-card flex flex-wrap items-center gap-4 rounded-xl p-4"
            >
              {/* Avatar */}
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/15 bg-white/5">
                {artist.profileImage ? (
                  <Image
                    src={artist.profileImage}
                    alt={artist.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <IconMicrophone2 size={18} className="text-white/25" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium text-white">{artist.name}</p>
                  {artist.verified && (
                    <span className="flex items-center gap-1 rounded-full border border-cyan-300/25 bg-cyan-300/8 px-2 py-0.5 text-[10px] text-cyan-200">
                      <IconBadge size={9} />
                      Verified
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-white/40">{artist.handle}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Link href={`/admin/artists/${artist.id}`}>
                  <button className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-white/40 transition-colors hover:border-cyan-300/30 hover:bg-cyan-300/8 hover:text-cyan-200">
                    <IconEdit size={15} />
                  </button>
                </Link>
                <button
                  onClick={() => setDeleteTarget(artist)}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-white/40 transition-colors hover:border-red-400/30 hover:bg-red-400/8 hover:text-red-300"
                >
                  <IconTrash size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Artist</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{deleteTarget?.name}&quot;? Events linked to this artist will lose their artist reference.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteTarget(null)} disabled={deleting}>
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-500 text-white hover:bg-red-600 shadow-none"
            >
              {deleting ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
