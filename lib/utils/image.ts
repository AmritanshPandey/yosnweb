import imageCompression from "browser-image-compression"

export type ImageValidationError = "FILE_TOO_LARGE" | "INVALID_TYPE"

export type AllowedRatio = "4:5" | "16:9"

export type ImageValidationResult =
  | { ok: true; width: number; height: number }
  | { ok: false; error: ImageValidationError; message: string }

const MAX_FILE_BYTES = 10 * 1024 * 1024 // 10 MB

export async function validateImage(file: File): Promise<ImageValidationResult> {
  if (!file.type.startsWith("image/")) {
    return {
      ok: false,
      error: "INVALID_TYPE",
      message: "Please select an image file (JPEG, PNG, WebP, HEIC, etc.).",
    }
  }

  if (file.size > MAX_FILE_BYTES) {
    return {
      ok: false,
      error: "FILE_TOO_LARGE",
      message: "Image must be under 10 MB.",
    }
  }

  const { width, height } = await getImageDimensions(file)
  return { ok: true, width, height }
}

export function getImageDimensions(file: File | Blob): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight })
      URL.revokeObjectURL(url)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error("Failed to load image"))
    }
    img.src = url
  })
}

export async function compressImage(file: File): Promise<File> {
  return imageCompression(file, {
    maxSizeMB: 1.5,
    maxWidthOrHeight: 2400,
    useWebWorker: true,
    fileType: "image/webp",
  })
}

export type CropArea = {
  x: number
  y: number
  width: number
  height: number
}

export async function cropImageToBlob(
  imageUrl: string,
  cropArea: CropArea,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = cropArea.width
      canvas.height = cropArea.height
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        reject(new Error("Canvas context unavailable"))
        return
      }
      ctx.drawImage(img, cropArea.x, cropArea.y, cropArea.width, cropArea.height, 0, 0, cropArea.width, cropArea.height)
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas toBlob failed"))
            return
          }
          resolve(blob)
        },
        "image/webp",
        0.9,
      )
    }
    img.onerror = () => reject(new Error("Image load failed"))
    img.src = imageUrl
  })
}

export type BgStyle = "blur" | "dark" | "black"

const FIT_DIMENSIONS: Record<AllowedRatio, { w: number; h: number }> = {
  "16:9": { w: 1600, h: 900 },
  "4:5":  { w: 800,  h: 1000 },
}

export async function fitImageWithBackground(
  imageUrl: string,
  targetRatio: AllowedRatio,
  bgStyle: BgStyle,
): Promise<Blob> {
  const { w: targetW, h: targetH } = FIT_DIMENSIONS[targetRatio]

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = targetW
      canvas.height = targetH
      const ctx = canvas.getContext("2d")
      if (!ctx) { reject(new Error("Canvas context unavailable")); return }

      if (bgStyle === "blur") {
        // Scale image to cover the canvas, then blur + darken it as background
        const coverScale = Math.max(targetW / img.naturalWidth, targetH / img.naturalHeight)
        const bgW = img.naturalWidth * coverScale
        const bgH = img.naturalHeight * coverScale
        const bgX = (targetW - bgW) / 2
        const bgY = (targetH - bgH) / 2
        ctx.filter = "blur(22px) brightness(0.35)"
        ctx.drawImage(img, bgX - 30, bgY - 30, bgW + 60, bgH + 60) // overdraw to hide blur edges
        ctx.filter = "none"
      } else {
        ctx.fillStyle = bgStyle === "dark" ? "#111111" : "#000000"
        ctx.fillRect(0, 0, targetW, targetH)
      }

      // Scale image to contain (fit fully inside canvas), centered
      const containScale = Math.min(targetW / img.naturalWidth, targetH / img.naturalHeight)
      const fgW = img.naturalWidth * containScale
      const fgH = img.naturalHeight * containScale
      const fgX = (targetW - fgW) / 2
      const fgY = (targetH - fgH) / 2
      ctx.drawImage(img, fgX, fgY, fgW, fgH)

      canvas.toBlob(
        (blob) => {
          if (!blob) { reject(new Error("Canvas toBlob failed")); return }
          resolve(blob)
        },
        "image/webp",
        0.9,
      )
    }
    img.onerror = () => reject(new Error("Image load failed"))
    img.src = imageUrl
  })
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}
