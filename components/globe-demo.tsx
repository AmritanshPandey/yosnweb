"use client";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
  ssr: false,
});

type GlobeCity = {
  city: string;
  lat: number;
  lng: number;
};

const DEFAULT_CITIES: GlobeCity[] = [
  { city: "Mumbai", lat: 19.076, lng: 72.8777 },
  { city: "Delhi", lat: 28.6139, lng: 77.209 },
  { city: "Bangalore", lat: 12.9716, lng: 77.5946 },
  { city: "Hyderabad", lat: 17.385, lng: 78.4867 },
  { city: "Nagpur", lat: 21.1458, lng: 79.0882 },
  { city: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
  { city: "Chennai", lat: 13.0827, lng: 80.2707 },
  { city: "Chandigarh", lat: 30.7333, lng: 76.7794 },
  { city: "Pune", lat: 18.5204, lng: 73.8567 },
  { city: "Surat", lat: 21.1702, lng: 72.8311 },
  { city: "Dubai", lat: 25.2048, lng: 55.2708 },
  { city: "London", lat: 51.5074, lng: -0.1278 },
  { city: "Manchester", lat: 53.4808, lng: -2.2426 },
  { city: "Birmingham", lat: 52.4862, lng: -1.8904 },
];

type ArcDatum = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

const ARC_COLORS = ["#31d4ff", "#a78bfa", "#ff4fd8"];

const INTERNATIONAL = new Set(["London", "Manchester", "Birmingham", "Dublin", "Amsterdam", "Dubai"]);

function buildArcs(cities: GlobeCity[]): ArcDatum[] {
  if (cities.length < 2) return [];
  const hub = cities[0]; // Mumbai

  return cities.slice(1).map((city, index) => ({
    order: index + 1,
    startLat: hub.lat,
    startLng: hub.lng,
    endLat: city.lat,
    endLng: city.lng,
    arcAlt: INTERNATIONAL.has(city.city) ? 0.38 : 0.18,
    color: ARC_COLORS[index % ARC_COLORS.length],
  }));
}

export default function GlobeDemo({
  cities = DEFAULT_CITIES,
  className,
  initialPosition,
  highlightRing,
}: {
  cities?: GlobeCity[];
  className?: string;
  initialPosition?: { lat: number; lng: number };
  highlightRing?: { lat: number; lng: number };
}) {
  const globeConfig = useMemo(() => ({
    pointSize: 1,
    globeColor: "#000000",
    showAtmosphere: true,
    atmosphereColor: "#b3f0ff",
    atmosphereAltitude: 0.16,
    emissive: "#071828",
    emissiveIntensity: 0.28,
    shininess: 0.9,
    polygonColor: "rgba(173,223,255,0.55)",
    ambientLight: "#67e8f9",
    directionalLeftLight: "#f0f9ff",
    directionalTopLight: "#e0f2fe",
    pointLight: "#f5d0fe",
    arcTime: 1200,
    arcLength: 0.85,
    rings: 1,
    maxRings: 3,
    initialPosition: initialPosition ?? { lat: 20, lng: 77 },
    autoRotate: true,
    autoRotateSpeed: 0.35,
    highlightRing,
  }), [initialPosition, highlightRing]);

  const cityArcs = useMemo(() => buildArcs(cities), [cities]);

  return (
    <div className={cn("absolute inset-0 h-full w-full", className)}>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-black/35 z-20" />
      <div className="absolute inset-0 z-10">
        <World data={cityArcs} globeConfig={globeConfig} />
      </div>
    </div>
  );
}
