"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { IconUpload, IconX, IconCrop } from "@tabler/icons-react"
import { validateImage, compressImage, type AllowedRatio } from "@/lib/utils/image"
import { ImageCropper } from "./ImageCropper"
import { SafeAreaPreview } from "./SafeAreaPreview"
import { Button } from "@/components/ui/button"

type Props = {
  value?: string
  onChange: (url: string, meta: { width: number; height: number }) => void
  onFileReady: (blob: Blob) => void
  label?: string
  eventName?: string
  cities?: string[]
  aspect?: "4:5" | "16:9" | "auto"
}

const RATIO_VALUES: Record<AllowedRatio, number> = {
  "4:5": 4 / 5,
  "16:9": 16 / 9,
}

export function ImageUpload({
  value,
  onChange,
  onFileReady,
  label = "Hero Image",
  eventName,
  cities,
  aspect = "auto",
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [rawUrl, setRawUrl] = useState<string | null>(null)
  const [detectedRatio, setDetectedRatio] = useState<AllowedRatio | null>(null)
  const [cropping, setCropping] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(value ?? null)
  const [meta, setMeta] = useState<{ width: number; height: number } | null>(null)

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Reset
    if (fileRef.current) fileRef.current.value = ""

    const validation = await validateImage(file)
    if (!validation.ok) {
      toast.error(validation.message)
      return
    }

    const { width, height, ratio } = validation
    setDetectedRatio(ratio)
    setMeta({ width, height })

    const compressed = await compressImage(file)
    const url = URL.createObjectURL(compressed)
    setRawUrl(url)
    setCropping(true)
  }

  function handleCropComplete(blob: Blob, _area: { x: number; y: number; width: number; height: number }) {
    const url = URL.createObjectURL(blob)
    setPreviewUrl(url)
    setCropping(false)
    if (rawUrl) URL.revokeObjectURL(rawUrl)
    setRawUrl(null)
    onFileReady(blob)
    onChange(url, meta ?? { width: 0, height: 0 })
    toast.success("Image ready to upload.")
  }

  function handleCropCancel() {
    setCropping(false)
    if (rawUrl) URL.revokeObjectURL(rawUrl)
    setRawUrl(null)
  }

  function handleRemove() {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
    setMeta(null)
    onChange("", { width: 0, height: 0 })
    onFileReady(new Blob())
  }

  const cropAspect =
    aspect !== "auto"
      ? RATIO_VALUES[aspect]
      : detectedRatio
        ? RATIO_VALUES[detectedRatio]
        : 4 / 5

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.18em] text-white/55">{label}</p>
        <p className="text-[10px] text-white/30">
          WebP / JPEG / PNG · 4:5 or 16:9 · Min 1200×1600 · Max 2 MB
        </p>
      </div>

      {cropping && rawUrl ? (
        <div className="rounded-xl border border-white/10 bg-white/3 p-4">
          <p className="mb-3 text-sm text-white/60">
            Crop your image ({detectedRatio} detected)
          </p>
          <ImageCropper
            imageUrl={rawUrl}
            aspect={cropAspect}
            onCropComplete={handleCropComplete}
            onCancel={handleCropCancel}
          />
        </div>
      ) : previewUrl ? (
        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="relative flex-shrink-0">
            <div className="relative h-40 w-32 overflow-hidden rounded-xl border border-white/15">
              <Image src={previewUrl} alt="Uploaded image" fill className="object-cover" unoptimized />
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 shadow-lg transition-all hover:bg-red-400"
            >
              <IconX size={12} className="text-white" />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {meta && (
              <p className="text-xs text-white/40">
                {meta.width}×{meta.height}px
              </p>
            )}

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => fileRef.current?.click()}
              className="w-fit gap-2 border border-white/15"
            >
              <IconCrop size={14} />
              Replace Image
            </Button>

            {previewUrl && eventName !== undefined && (
              <SafeAreaPreview
                imageUrl={previewUrl}
                eventName={eventName}
                cities={cities}
              />
            )}
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="group flex w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/20 bg-white/3 py-10 transition-all duration-200 hover:border-cyan-300/40 hover:bg-cyan-300/4"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-all duration-200 group-hover:border-cyan-300/40 group-hover:bg-cyan-300/8">
            <IconUpload size={22} className="text-white/40 group-hover:text-cyan-200" />
          </div>
          <div className="text-center">
            <p className="text-sm text-white/55 group-hover:text-white/75">
              Click to upload image
            </p>
            <p className="mt-1 text-xs text-white/30">
              4:5 or 16:9 · WebP / JPEG / PNG · Min 1200×1600 · Max 2 MB
            </p>
          </div>
        </button>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/webp,image/jpeg,image/png"
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  )
}
