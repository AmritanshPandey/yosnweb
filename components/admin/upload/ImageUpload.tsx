"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { IconUpload, IconX, IconCrop, IconPhoto } from "@tabler/icons-react"
import { validateImage, compressImage } from "@/lib/utils/image"
import type { AllowedRatio } from "@/lib/utils/image"
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
  const [cropping, setCropping] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(value ?? null)
  const [meta, setMeta] = useState<{ width: number; height: number } | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [compressing, setCompressing] = useState(false)
  // For "auto" aspect (events), default to 16:9 landscape to match the event page layout
  const [selectedRatio, setSelectedRatio] = useState<AllowedRatio>(
    aspect === "4:5" ? "4:5" : "16:9"
  )

  async function processFile(file: File) {
    const validation = await validateImage(file)
    if (!validation.ok) {
      toast.error(validation.message)
      return
    }

    setMeta({ width: validation.width, height: validation.height })
    setCompressing(true)
    try {
      const compressed = await compressImage(file)
      const url = URL.createObjectURL(compressed)
      setRawUrl(url)
      setCropping(true)
    } catch {
      toast.error("Failed to process image. Please try another file.")
    } finally {
      setCompressing(false)
    }
  }

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (fileRef.current) fileRef.current.value = ""
    await processFile(file)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) processFile(file)
  }

  function handleCropComplete(blob: Blob, area: { x: number; y: number; width: number; height: number }) {
    const url = URL.createObjectURL(blob)
    // Revoke old preview blob URL to avoid memory leak
    if (previewUrl && previewUrl.startsWith("blob:")) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(url)
    setCropping(false)
    if (rawUrl) URL.revokeObjectURL(rawUrl)
    setRawUrl(null)
    onFileReady(blob)
    // Use the actual crop output dimensions, not the original image dimensions
    onChange(url, { width: Math.round(area.width), height: Math.round(area.height) })
    toast.success("Image ready.")
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

  const cropAspect = aspect !== "auto" ? RATIO_VALUES[aspect] : RATIO_VALUES[selectedRatio]
  const allowRatioToggle = aspect === "auto"

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.18em] text-white/55">{label}</p>
        <p className="text-[10px] text-white/30">JPEG · PNG · WebP · up to 10 MB</p>
      </div>

      {compressing && (
        <div className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/3 py-8">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/10 border-t-cyan-300" />
          <p className="text-sm text-white/50">Compressing image…</p>
        </div>
      )}

      {!compressing && cropping && rawUrl ? (
        <div className="rounded-xl border border-white/10 bg-white/3 p-4">
          <ImageCropper
            imageUrl={rawUrl}
            aspect={cropAspect}
            allowRatioToggle={allowRatioToggle}
            selectedRatio={selectedRatio}
            onRatioChange={setSelectedRatio}
            onCropComplete={handleCropComplete}
            onCancel={handleCropCancel}
          />
        </div>
      ) : !compressing && previewUrl ? (
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
              <SafeAreaPreview imageUrl={previewUrl} eventName={eventName} cities={cities} />
            )}
          </div>
        </div>
      ) : !compressing ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragOver(false) }}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className={`group flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-12 transition-all duration-200 ${
            dragOver
              ? "border-cyan-300/60 bg-cyan-300/8"
              : "border-white/20 bg-white/3 hover:border-cyan-300/40 hover:bg-cyan-300/4"
          }`}
        >
          <div className={`flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-200 ${
            dragOver
              ? "border-cyan-300/50 bg-cyan-300/15"
              : "border-white/15 bg-white/5 group-hover:border-cyan-300/40 group-hover:bg-cyan-300/8"
          }`}>
            {dragOver ? (
              <IconPhoto size={24} className="text-cyan-200" />
            ) : (
              <IconUpload size={22} className="text-white/40 group-hover:text-cyan-200" />
            )}
          </div>
          <div className="text-center">
            <p className={`text-sm transition-colors ${dragOver ? "text-cyan-200" : "text-white/55 group-hover:text-white/75"}`}>
              {dragOver ? "Drop to upload" : "Click to upload or drag & drop"}
            </p>
            <p className="mt-1 text-xs text-white/30">
              Any photo from your phone or computer · we'll help you crop it
            </p>
          </div>
        </div>
      ) : null}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  )
}
