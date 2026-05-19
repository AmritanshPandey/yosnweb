"use client"

import { useState, useCallback } from "react"
import Cropper from "react-easy-crop"
import type { Point, Area } from "react-easy-crop"
import { Button } from "@/components/ui/button"
import { cropImageToBlob, type CropArea } from "@/lib/utils/image"

type Props = {
  imageUrl: string
  aspect: number
  onCropComplete: (blob: Blob, area: CropArea) => void
  onCancel: () => void
}

export function ImageCropper({ imageUrl, aspect, onCropComplete, onCancel }: Props) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedPixels, setCroppedPixels] = useState<Area | null>(null)
  const [processing, setProcessing] = useState(false)

  const handleCropComplete = useCallback((_: Area, pixels: Area) => {
    setCroppedPixels(pixels)
  }, [])

  async function handleConfirm() {
    if (!croppedPixels) return
    setProcessing(true)
    try {
      const cropArea: CropArea = {
        x: croppedPixels.x,
        y: croppedPixels.y,
        width: croppedPixels.width,
        height: croppedPixels.height,
      }
      const blob = await cropImageToBlob(imageUrl, cropArea)
      onCropComplete(blob, cropArea)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative h-80 overflow-hidden rounded-xl bg-black/60">
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
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

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onCancel}
          disabled={processing}
        >
          Cancel
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={handleConfirm}
          disabled={processing}
          className="min-w-[120px]"
        >
          {processing ? "Cropping…" : "Confirm Crop"}
        </Button>
      </div>
    </div>
  )
}
