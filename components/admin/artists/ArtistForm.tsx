"use client"

import { useEffect, useState } from "react"
import { useForm, Controller, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { IconLoader2, IconBrandInstagram, IconBrandYoutube, IconBrandSpotify } from "@tabler/icons-react"
import Image from "next/image"

import { artistSchema, type ArtistFormValues } from "@/lib/validations/artist-schema"
import { createArtist, updateArtist, type CreateArtistInput } from "@/lib/firebase/artists"
import { uploadArtistProfile } from "@/lib/cloudinary/upload"
import { generateSlug } from "@/lib/utils/image"
import type { Artist } from "@/types"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { ImageUpload } from "@/components/admin/upload/ImageUpload"

type Props = {
  artist?: Artist
}

export function ArtistForm({ artist }: Props) {
  const router = useRouter()
  const [imageBlob, setImageBlob] = useState<Blob | null>(null)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm<ArtistFormValues>({
    resolver: zodResolver(artistSchema) as Resolver<ArtistFormValues>,
    defaultValues: artist
      ? {
          name: artist.name,
          slug: artist.slug,
          handle: artist.handle,
          profileImage: artist.profileImage,
          bio: artist.bio ?? "",
          instagram: artist.instagram ?? "",
          youtube: artist.youtube ?? "",
          spotify: artist.spotify ?? "",
          verified: artist.verified ?? false,
        }
      : {
          handle: "@",
          verified: false,
          bio: "",
          instagram: "",
          youtube: "",
          spotify: "",
        },
  })

  const watchName = watch("name")

  useEffect(() => {
    if (!artist && watchName) {
      setValue("slug", generateSlug(watchName), { shouldValidate: false })
    }
  }, [watchName, artist, setValue])

  async function onSubmit(values: ArtistFormValues) {
    setLoading(true)
    try {
      let profileImage = values.profileImage

      if (imageBlob && imageBlob.size > 0) {
        toast.loading("Uploading profile image…")
        const { url } = await uploadArtistProfile(values.slug, imageBlob)
        profileImage = url
        toast.dismiss()
      }

      const payload: CreateArtistInput = {
        name: values.name,
        slug: values.slug,
        handle: values.handle,
        profileImage,
        bio: values.bio || undefined,
        instagram: values.instagram || undefined,
        youtube: values.youtube || undefined,
        spotify: values.spotify || undefined,
        verified: values.verified,
      }

      if (artist) {
        await updateArtist(artist.id, payload)
        toast.success("Artist updated successfully.")
      } else {
        await createArtist(payload)
        toast.success("Artist created successfully.")
      }

      router.push("/admin/artists")
    } catch (err) {
      console.error(err)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

      {/* Profile */}
      <section className="fun-card rounded-2xl p-6 space-y-5">
        <h2 className="font-display text-2xl uppercase tracking-tight text-white">Profile</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="a-name">Artist Name</Label>
            <Input id="a-name" {...register("name")} placeholder="The Quick Style" />
            {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="a-slug">Slug</Label>
            <Input id="a-slug" {...register("slug")} placeholder="the-quick-style" />
            {errors.slug && <p className="text-xs text-red-400">{errors.slug.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="a-handle">Handle</Label>
            <Input id="a-handle" {...register("handle")} placeholder="@thequickstyle" />
            {errors.handle && <p className="text-xs text-red-400">{errors.handle.message}</p>}
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/3 p-4">
            <Controller
              control={control}
              name="verified"
              render={({ field }) => (
                <Switch checked={!!field.value} onCheckedChange={field.onChange} />
              )}
            />
            <div>
              <p className="text-sm text-white/80">Verified Artist</p>
              <p className="text-xs text-white/35">Shows a verified badge.</p>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="a-bio">Bio</Label>
          <Textarea
            id="a-bio"
            {...register("bio")}
            placeholder="Short artist biography…"
            rows={4}
          />
          {errors.bio && <p className="text-xs text-red-400">{errors.bio.message}</p>}
        </div>
      </section>

      {/* Social Links */}
      <section className="fun-card rounded-2xl p-6 space-y-5">
        <h2 className="font-display text-2xl uppercase tracking-tight text-white">Social Links</h2>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label className="flex items-center gap-2">
              <IconBrandInstagram size={14} /> Instagram
            </Label>
            <Input
              {...register("instagram")}
              placeholder="https://www.instagram.com/thequickstyle/"
              type="url"
            />
            {errors.instagram && <p className="text-xs text-red-400">{errors.instagram.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label className="flex items-center gap-2">
              <IconBrandYoutube size={14} /> YouTube
            </Label>
            <Input
              {...register("youtube")}
              placeholder="https://www.youtube.com/c/TheQuickStyle"
              type="url"
            />
            {errors.youtube && <p className="text-xs text-red-400">{errors.youtube.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label className="flex items-center gap-2">
              <IconBrandSpotify size={14} /> Spotify
            </Label>
            <Input
              {...register("spotify")}
              placeholder="https://open.spotify.com/artist/..."
              type="url"
            />
            {errors.spotify && <p className="text-xs text-red-400">{errors.spotify.message}</p>}
          </div>
        </div>
      </section>

      {/* Profile Image */}
      <section className="fun-card rounded-2xl p-6 space-y-5">
        <h2 className="font-display text-2xl uppercase tracking-tight text-white">Profile Image</h2>
        {artist?.profileImage && !imageBlob && (
          <div className="relative h-20 w-20 overflow-hidden rounded-full border border-white/20">
            <Image src={artist.profileImage} alt={artist.name} fill className="object-cover" />
          </div>
        )}
        <ImageUpload
          value={artist?.profileImage}
          onChange={(url) => setValue("profileImage", url, { shouldValidate: true })}
          onFileReady={(blob) => setImageBlob(blob.size > 0 ? blob : null)}
          label="Profile Image"
          aspect="4:5"
        />
        {errors.profileImage && (
          <p className="text-xs text-red-400">{errors.profileImage.message}</p>
        )}
      </section>

      {/* Submit */}
      <div className="flex justify-end gap-3 pb-8">
        <Button
          type="button"
          variant="ghost"
          size="lg"
          onClick={() => router.push("/admin/artists")}
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
          ) : artist ? (
            "Update Artist"
          ) : (
            "Create Artist"
          )}
        </Button>
      </div>
    </form>
  )
}
