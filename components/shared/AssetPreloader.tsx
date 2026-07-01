"use client"

import { useEffect } from "react"

type PreloadAsset = {
  href: string
  as: "image" | "video"
  type?: string
  fetchPriority?: "high" | "low" | "auto"
}

export function AssetPreloader({ assets }: { assets: PreloadAsset[] }) {
  useEffect(() => {
    const links = assets.map((asset) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.href = asset.href
      link.as = asset.as

      if (asset.type) {
        link.type = asset.type
      }

      if (asset.fetchPriority) {
        link.setAttribute("fetchpriority", asset.fetchPriority)
      }

      document.head.appendChild(link)
      return link
    })

    return () => {
      links.forEach((link) => link.remove())
    }
  }, [assets])

  return null
}
