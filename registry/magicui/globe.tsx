"use client"

import { memo, useMemo } from "react"
import { Globe3D, type Globe3DConfig, type GlobeMarker as Globe3DMarker } from "@/components/ui/3d-globe"
import { cn } from "@/lib/utils"

export interface GlobeMarker {
  lat: number
  lng: number
  label?: string
}

interface GlobeProps {
  className?: string
  markers?: GlobeMarker[]
  onMarkerClick?: (marker: GlobeMarker) => void
}

const globeConfig: Globe3DConfig = {
  radius: 1.58,
  showAtmosphere: true,
  atmosphereColor: "#9adfff",
  atmosphereIntensity: 0.26,
  atmosphereBlur: 2.5,
  bumpScale: 1.7,
  autoRotateSpeed: 0.2,
  showWireframe: true,
  wireframeColor: "#9adfff",
  ambientIntensity: 0.9,
  pointLightIntensity: 0.9,
  minDistance: 4.6,
  maxDistance: 7.2,
}

export const Globe = memo(function Globe({ className, markers = [], onMarkerClick }: GlobeProps) {
  const formattedMarkers = useMemo<Globe3DMarker[]>(
    () =>
      markers.map((marker) => ({
        lat: marker.lat,
        lng: marker.lng,
        label: marker.label,
        src: "/assets/globe-marker.svg",
        size: 0.07,
      })),
    [markers],
  )

  return (
    <div className={cn("absolute inset-x-0 h-[310px] sm:h-[390px]", className)}>
      <Globe3D
        className="h-full"
        markers={formattedMarkers}
        config={globeConfig}
        onMarkerClick={(marker) => {
          onMarkerClick?.({
            lat: marker.lat,
            lng: marker.lng,
            label: marker.label,
          })
        }}
      />
    </div>
  )
})
