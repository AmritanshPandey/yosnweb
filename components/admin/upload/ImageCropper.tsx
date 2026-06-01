"use client"

import { useState, useCallback } from "react"
import Cropper from "react-easy-crop"
import type { Point, Area } from "react-easy-crop"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { cropImageToBlob, fitImageWithBackground, type CropArea, type BgStyle } from "@/lib/utils/image"
import type { AllowedRatio } from "@/lib/utils/image"

type Mode = "crop" | "fit"

type Props = {
  imageUrl: string
  aspect: number
  allowRatioToggle?: boolean
  selectedRatio?: AllowedRatio
  onRatioChange?: (ratio: AllowedRatio) => void
  onCropComplete: (blob: Blob, area: CropArea) => void
  onCancel: () => void
}

const BG_OPTIONS: { value: BgStyle; label: string; preview: string }[] = [
  { value: "blur",  label: "Blurred",   preview: "bg-transparent" },
  { value: "dark",  label: "Dark grey", preview: "bg-[#111]" },
  { value: "black", label: "Black",     preview: "bg-black" },
]

const FIT_OUTPUT: Record<AllowedRatio, { w: number; h: number }> = {
  "16:9": { w: 1600, h: 900 },
  "4:5":  { w: 800,  h: 1000 },
}

export function ImageCropper({
  imageUrl,
  aspect,
  allowRatioToggle,
  selectedRatio = "16:9",
  onRatioChange,
  onCropComplete,
  onCancel,
}: Props) {
  const [mode, setMode] = useState<Mode>("crop")
  const [bgStyle, setBgStyle] = useState<BgStyle>("blur")
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedPixels, setCroppedPixels] = useState<Area | null>(null)
  const [processing, setProcessing] = useState(false)

  const handleCropChange = useCallback((_: Area, pixels: Area) => {
    setCroppedPixels(pixels)
  }, [])

  function handleRatioChange(ratio: AllowedRatio) {
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    onRatioChange?.(ratio)
  }

  function handleModeChange(next: Mode) {
    setMode(next)
    setCrop({ x: 0, y: 0 })
    setZoom(1)
  }

  async function handleConfirm() {
    setProcessing(true)
    try {
      if (mode === "fit") {
        const blob = await fitImageWithBackground(imageUrl, selectedRatio, bgStyle)
        const { w, h } = FIT_OUTPUT[selectedRatio]
        onCropComplete(blob, { x: 0, y: 0, width: w, height: h })
      } else {
        if (!croppedPixels) return
        const cropArea: CropArea = {
          x: croppedPixels.x,
          y: croppedPixels.y,
          width: croppedPixels.width,
          height: croppedPixels.height,
        }
        const blob = await cropImageToBlob(imageUrl, cropArea)
        onCropComplete(blob, cropArea)
      }
    } catch {
      toast.error("Failed to process image. Please try again.")
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">

      {/* Mode toggle — only for events where ratio can be chosen */}
      {allowRatioToggle && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40">Mode</span>
          <div className="flex gap-1.5">
            {(["crop", "fit"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => handleModeChange(m)}
                className={`rounded-md border px-3 py-1 text-xs transition-all ${
                  mode === m
                    ? "border-cyan-300/50 bg-cyan-300/15 text-cyan-200"
                    : "border-white/15 bg-white/5 text-white/45 hover:border-white/30 hover:text-white/70"
                }`}
              >
                {m === "crop" ? "Crop" : "Fit with background"}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Ratio toggle — shown in both modes when allowed */}
      {allowRatioToggle && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40">Ratio</span>
          <div className="flex gap-1.5">
            {(["4:5", "16:9"] as AllowedRatio[]).map((ratio) => (
              <button
                key={ratio}
                type="button"
                onClick={() => handleRatioChange(ratio)}
                className={`rounded-md border px-3 py-1 text-xs transition-all ${
                  selectedRatio === ratio
                    ? "border-cyan-300/50 bg-cyan-300/15 text-cyan-200"
                    : "border-white/15 bg-white/5 text-white/45 hover:border-white/30 hover:text-white/70"
                }`}
              >
                {ratio === "4:5" ? "Portrait 4:5" : "Landscape 16:9"}
              </button>
            ))}
          </div>
        </div>
      )}

      {mode === "fit" ? (
        <>
          {/* Background style picker */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/40">Background</span>
            <div className="flex gap-1.5">
              {BG_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setBgStyle(opt.value)}
                  className={`rounded-md border px-3 py-1 text-xs transition-all ${
                    bgStyle === opt.value
                      ? "border-cyan-300/50 bg-cyan-300/15 text-cyan-200"
                      : "border-white/15 bg-white/5 text-white/45 hover:border-white/30 hover:text-white/70"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Live CSS preview — matches canvas output */}
          <div
            className="relative h-80 overflow-hidden rounded-xl"
            style={{ aspectRatio: selectedRatio === "16:9" ? "16/9" : "4/5" }}
          >
            {bgStyle === "blur" ? (
              <>
                {/* Blurred background */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ filter: "blur(18px) brightness(0.35)", transform: "scale(1.15)" }}
                />
                {/* Foreground image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="absolute inset-0 h-full w-full object-contain"
                />
              </>
            ) : (
              <>
                <div className={`absolute inset-0 ${bgStyle === "dark" ? "bg-[#111]" : "bg-black"}`} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="absolute inset-0 h-full w-full object-contain"
                />
              </>
            )}
          </div>

          <p className="text-xs text-white/35">
            Your image will be centered and the empty space filled with the selected background.
          </p>
        </>
      ) : (
        <>
          {!allowRatioToggle && (
            <p className="text-xs text-white/45">Drag to reposition · scroll or use the slider to zoom</p>
          )}

          <div className="relative h-80 overflow-hidden rounded-xl bg-black/60">
            <Cropper
              image={imageUrl}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={handleCropChange}
              style={{
                containerStyle: { borderRadius: "0.75rem" },
                mediaStyle: {},
                cropAreaStyle: {
                  border: "2px solid rgba(49, 212, 255, 0.8)",
                  boxShadow: "0 0 0 9999px rgba(0,0,0,0.65)",
                },
              }}
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-white/45">Zoom</span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-white/15 accent-cyan-300"
            />
            <span className="w-10 text-right text-xs text-white/45">{zoom.toFixed(1)}×</span>
          </div>
        </>
      )}

      <div className="flex justify-end gap-3">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel} disabled={processing}>
          Cancel
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={handleConfirm}
          disabled={processing || (mode === "crop" && !croppedPixels)}
          className="min-w-[120px]"
        >
          {processing ? "Processing…" : "Confirm"}
        </Button>
      </div>
    </div>
  )
}
