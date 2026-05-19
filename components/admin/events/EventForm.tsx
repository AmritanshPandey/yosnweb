"use client"

import { useEffect, useState, useRef } from "react"
import { useForm, FormProvider, Controller, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { IconLoader2, IconStar } from "@tabler/icons-react"

import { eventSchema, type EventFormValues } from "@/lib/validations/event-schema"
import { createEvent, updateEvent, type CreateEventInput } from "@/lib/firebase/events"
import { getAllArtists } from "@/lib/firebase/artists"
import { uploadEventHero } from "@/lib/cloudinary/upload"
import { generateSlug } from "@/lib/utils/image"
import { EVENT_CATEGORIES, EVENT_STATUSES, CATEGORY_LABELS, STATUS_LABELS } from "@/types"
import type { Event, Artist } from "@/types"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ImageUpload } from "@/components/admin/upload/ImageUpload"
import { CityFieldArray } from "./CityFieldArray"

type Props = {
  event?: Event
}

export function EventForm({ event }: Props) {
  const router = useRouter()
  const [artists, setArtists] = useState<Artist[]>([])
  const [imageBlob, setImageBlob] = useState<Blob | null>(null)
  const [loading, setLoading] = useState(false)
  const genreInputRef = useRef<HTMLInputElement>(null)

  const methods = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema) as Resolver<EventFormValues>,
    defaultValues: event
      ? {
          name: event.name,
          slug: event.slug,
          featured: event.featured,
          category: event.category,
          status: event.status,
          duration: event.duration,
          genres: event.genres,
          ticketsFrom: event.ticketsFrom,
          artistId: event.artistId,
          heroImage: event.heroImage,
          imageMeta: event.imageMeta,
          cities: event.cities,
        }
      : {
          featured: false,
          genres: [],
          cities: [],
          imageMeta: { width: 0, height: 0 },
        },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
  } = methods

  const watchName = watch("name")
  const watchGenres = watch("genres") ?? []
  const watchCities = watch("cities") ?? []

  useEffect(() => {
    getAllArtists().then(setArtists).catch(() => toast.error("Failed to load artists"))
  }, [])

  // Auto-generate slug from name when creating new events
  useEffect(() => {
    if (!event && watchName) {
      setValue("slug", generateSlug(watchName), { shouldValidate: false })
    }
  }, [watchName, event, setValue])

  function addGenre(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return
    e.preventDefault()
    const val = genreInputRef.current?.value.trim()
    if (!val) return
    setValue("genres", [...watchGenres, val], { shouldDirty: true })
    if (genreInputRef.current) genreInputRef.current.value = ""
  }

  function removeGenre(index: number) {
    setValue(
      "genres",
      watchGenres.filter((_, i) => i !== index),
      { shouldDirty: true },
    )
  }

  async function onSubmit(values: EventFormValues) {
    setLoading(true)
    try {
      let heroImage = values.heroImage

      if (imageBlob && imageBlob.size > 0) {
        toast.loading("Uploading image…")
        const { url } = await uploadEventHero(values.slug, imageBlob)
        heroImage = url
        toast.dismiss()
      }

      const payload: CreateEventInput = {
        featured: values.featured,
        category: values.category,
        name: values.name,
        slug: values.slug,
        status: values.status,
        heroImage,
        imageMeta: values.imageMeta,
        duration: values.duration,
        genres: values.genres,
        ticketsFrom: values.ticketsFrom,
        cities: values.cities,
        artistId: values.artistId,
      }

      if (event) {
        await updateEvent(event.id, payload)
        toast.success("Event updated successfully.")
      } else {
        await createEvent(payload)
        toast.success("Event created successfully.")
      }

      router.push("/admin/events")
    } catch (err) {
      console.error(err)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const cityNames = watchCities.map((c) => c.name).filter(Boolean)

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        {/* Basic Info */}
        <section className="fun-card rounded-2xl p-6 space-y-5">
          <h2 className="font-display text-2xl uppercase tracking-tight text-white">Basic Info</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Event Name</Label>
              <Input id="name" {...register("name")} placeholder="Quick Style India Tour" />
              {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" {...register("slug")} placeholder="quick-style-india-tour" />
              {errors.slug && <p className="text-xs text-red-400">{errors.slug.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="duration">Duration</Label>
              <Input id="duration" {...register("duration")} placeholder="1 hour 30 minutes" />
              {errors.duration && <p className="text-xs text-red-400">{errors.duration.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="ticketsFrom">Tickets From</Label>
              <Input id="ticketsFrom" {...register("ticketsFrom")} placeholder="INR 999" />
              {errors.ticketsFrom && <p className="text-xs text-red-400">{errors.ticketsFrom.message}</p>}
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/3 p-4">
            <Controller
              control={control}
              name="featured"
              render={({ field }) => (
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
            <div>
              <p className="flex items-center gap-2 text-sm text-white/80">
                <IconStar size={14} className="text-amber-300" />
                Featured Event
              </p>
              <p className="text-xs text-white/35">Shows in the featured section on the frontend.</p>
            </div>
          </div>
        </section>

        {/* Category & Status */}
        <section className="fun-card rounded-2xl p-6 space-y-5">
          <h2 className="font-display text-2xl uppercase tracking-tight text-white">Category & Status</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {EVENT_CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {CATEGORY_LABELS[cat]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && <p className="text-xs text-red-400">{errors.category.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label>Status</Label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {EVENT_STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {STATUS_LABELS[s]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && <p className="text-xs text-red-400">{errors.status.message}</p>}
            </div>
          </div>
        </section>

        {/* Artist */}
        <section className="fun-card rounded-2xl p-6 space-y-5">
          <h2 className="font-display text-2xl uppercase tracking-tight text-white">Artist</h2>
          <div className="space-y-1.5">
            <Label>Select Artist</Label>
            <Controller
              control={control}
              name="artistId"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an artist" />
                  </SelectTrigger>
                  <SelectContent>
                    {artists.length === 0 ? (
                      <div className="py-4 text-center text-xs text-white/40">
                        No artists yet. Create one first.
                      </div>
                    ) : (
                      artists.map((a) => (
                        <SelectItem key={a.id} value={a.id}>
                          {a.name} {a.handle}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.artistId && <p className="text-xs text-red-400">{errors.artistId.message}</p>}
          </div>
        </section>

        {/* Genres */}
        <section className="fun-card rounded-2xl p-6 space-y-5">
          <h2 className="font-display text-2xl uppercase tracking-tight text-white">Genres</h2>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Add Genre (press Enter)</Label>
              <Input
                ref={genreInputRef}
                placeholder="Bollywood, Hip Hop…"
                onKeyDown={addGenre}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {watchGenres.map((genre, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-3 py-1 text-xs text-white/70"
                >
                  {genre}
                  <button
                    type="button"
                    onClick={() => removeGenre(i)}
                    className="text-white/35 transition-colors hover:text-red-300"
                    aria-label={`Remove ${genre}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            {errors.genres?.message && (
              <p className="text-xs text-red-400">{errors.genres.message as string}</p>
            )}
          </div>
        </section>

        {/* Tour Cities */}
        <section className="fun-card rounded-2xl p-6">
          <CityFieldArray />
        </section>

        {/* Hero Image */}
        <section className="fun-card rounded-2xl p-6 space-y-5">
          <h2 className="font-display text-2xl uppercase tracking-tight text-white">Hero Image</h2>
          <ImageUpload
            value={event?.heroImage}
            onChange={(url, meta) => {
              setValue("heroImage", url, { shouldValidate: true })
              setValue("imageMeta", meta, { shouldValidate: true })
            }}
            onFileReady={(blob) => setImageBlob(blob.size > 0 ? blob : null)}
            eventName={watch("name")}
            cities={cityNames}
          />
          {errors.heroImage && <p className="text-xs text-red-400">{errors.heroImage.message}</p>}
        </section>

        {/* Submit */}
        <div className="flex justify-end gap-3 pb-8">
          <Button
            type="button"
            variant="ghost"
            size="lg"
            onClick={() => router.push("/admin/events")}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" size="lg" disabled={loading}>
            {loading ? (
              <>
                <IconLoader2 size={16} className="animate-spin" />
                Saving…
              </>
            ) : event ? (
              "Update Event"
            ) : (
              "Create Event"
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
